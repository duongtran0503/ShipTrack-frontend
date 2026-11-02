import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export interface DriverAvailabilityState {
    isOnline: boolean;
    statusText: "Rảnh" | "Đang giao" | "Offline";
    activeOrdersCount: number;
    availableOrdersNearby: number;
    defaultVehicle: {
        id: string;
        plateNumber: string;
        vehicleType: string;
        model: string;
    } | null;
    licenseStatus: "APPROVED" | "PENDING" | "EXPIRED" | "NONE";
    expiryDaysLeft: number;
}

// ==================== MOCK API / LOCALSTORAGE ====================
const AVAILABILITY_STORAGE_KEY = "shiptrack_driver_availability_mock"

const getMockAvailability = (): DriverAvailabilityState => {
    const saved = localStorage.getItem(AVAILABILITY_STORAGE_KEY)
    if (saved) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        try { return JSON.parse(saved) } catch (e) { /* ignore */ }
    }
    const defaultData: DriverAvailabilityState = {
        isOnline: false,
        statusText: "Offline",
        activeOrdersCount: 1, // Giả lập đang có đơn chưa hoàn thành
        availableOrdersNearby: 8,
        defaultVehicle: {
            id: "veh_01",
            plateNumber: "59-C1 123.45",
            vehicleType: "Xe máy",
            model: "Honda Vision 2023",
        },
        licenseStatus: "APPROVED",
        expiryDaysLeft: 450,
    }
    localStorage.setItem(AVAILABILITY_STORAGE_KEY, JSON.stringify(defaultData))
    return defaultData
}

const saveMockAvailability = (data: DriverAvailabilityState) => {
    localStorage.setItem(AVAILABILITY_STORAGE_KEY, JSON.stringify(data))
}

export function useDriverAvailability() {
    const queryClient = useQueryClient()
    const [showWarningModal, setShowWarningModal] = useState(false)
    const [pendingToggleValue, setPendingToggleValue] = useState<boolean | null>(null)

    // 1. Query lấy trạng thái hoạt động
    const { data: availability, isLoading } = useQuery({
        queryKey: ["driver_availability"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300))
            return getMockAvailability()
        },
    })

    // 2. Mutation bật/tắt trạng thái
    const toggleMutation = useMutation({
        mutationFn: async (nextStatus: boolean) => {
            await new Promise((r) => setTimeout(r, 400))
            const current = getMockAvailability()

            // Kiểm tra điều kiện khi muốn bật (ON)
            if (nextStatus) {
                if (!current.defaultVehicle) {
                    throw new Error("Bạn chưa thiết lập phương tiện mặc định. Vui lòng thêm xe trước khi bật nhận đơn.")
                }
                if (current.licenseStatus !== "APPROVED") {
                    throw new Error("Bằng lái xe của bạn chưa được phê duyệt hoặc đã hết hạn. Không thể bật nhận đơn.")
                }
            }

            const updated: DriverAvailabilityState = {
                ...current,
                isOnline: nextStatus,
                statusText: nextStatus ? "Rảnh" : "Offline",
            }
            saveMockAvailability(updated)
            return updated
        },
        onSuccess: (updated) => {
            toast.success(updated.isOnline ? "Đã bật trạng thái sẵn sàng nhận đơn!" : "Đã chuyển sang ngoại tuyến.")
            queryClient.setQueryData(["driver_availability"], updated)
        },
        onError: (err: any) => {
            toast.error(err?.message || "Không thể thay đổi trạng thái hoạt động!")
        },
    })

    // Xử lý logic khi tài xế thao tác toggle
    const handleAttemptToggle = (nextStatus: boolean) => {
        const current = availability
        if (!current) return

        // Nếu đang tắt (OFF) mà muốn bật (ON), kiểm tra điều kiện ngay
        if (nextStatus) {
            if (!current.defaultVehicle || current.licenseStatus !== "APPROVED") {
                toast.error("Không thể bật nhận đơn: Thiếu phương tiện hoặc bằng lái chưa hợp lệ!")
                return
            }
        }

        // Nếu đang bật (ON) mà muốn tắt (OFF) nhưng đang có đơn chưa hoàn thành -> Cảnh báo
        if (!nextStatus && current.activeOrdersCount > 0) {
            setPendingToggleValue(false)
            setShowWarningModal(true)
            return
        }

        toggleMutation.mutate(nextStatus)
    }

    const confirmForceOffline = () => {
        if (pendingToggleValue !== null) {
            toggleMutation.mutate(pendingToggleValue)
        }
        setShowWarningModal(false)
        setPendingToggleValue(null)
    }

    return {
        availability,
        isLoading,
        isToggling: toggleMutation.isPending,
        handleAttemptToggle,
        showWarningModal,
        setShowWarningModal,
        confirmForceOffline,
    }
}