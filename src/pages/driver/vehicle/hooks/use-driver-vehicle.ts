import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export interface DriverVehicleItem {
    id: string;
    vehicleType: "MOTORBIKE" | "CAR" | "TRUCK";
    vehicleTypeLabel: string;
    licensePlate: string;
    brand: string;
    model: string;
    color: string;
    weightCapacityKg?: number;
    vehicleImageUrl: string;
    licensePlateImageUrl: string;
    approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
    updatedAt: string;
}

const DRIVER_VEHICLE_STORAGE_KEY = "shiptrack_driver_single_vehicle_mock"

const getMockVehicle = (): DriverVehicleItem | null => {
    const saved = localStorage.getItem(DRIVER_VEHICLE_STORAGE_KEY)
    if (saved) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        try { return JSON.parse(saved) } catch (e) { /* ignore */ }
    }
    // Mặc định ban đầu tài xế đã có 1 xe máy được duyệt
    const defaultVehicle: DriverVehicleItem = {
        id: "veh_01",
        vehicleType: "MOTORBIKE",
        vehicleTypeLabel: "Xe máy",
        licensePlate: "59-X1 123.45",
        brand: "Honda",
        model: "Wave Alpha",
        color: "Đen",
        weightCapacityKg: 50,
        vehicleImageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
        licensePlateImageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&auto=format&fit=crop&q=80",
        approvalStatus: "APPROVED",
        createdAt: "20/10/2024",
        updatedAt: "25/10/2024",
    }
    localStorage.setItem(DRIVER_VEHICLE_STORAGE_KEY, JSON.stringify(defaultVehicle))
    return defaultVehicle
}

export function useDriverVehicle() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    // 1. Lấy thông tin xe hiện tại
    const { data: vehicle, isLoading } = useQuery({
        queryKey: ["driver_single_vehicle"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 250))
            return getMockVehicle()
        },
    })

    // 2. Mutation Đăng ký xe mới (Lần đầu)
    const registerMutation = useMutation({
        mutationFn: async (newVehicle: Omit<DriverVehicleItem, "id" | "approvalStatus" | "createdAt" | "updatedAt">) => {
            await new Promise((r) => setTimeout(r, 400))
            const created: DriverVehicleItem = {
                ...newVehicle,
                id: `veh_${Date.now()}`,
                approvalStatus: "PENDING",
                createdAt: new Date().toLocaleDateString("vi-VN"),
                updatedAt: new Date().toLocaleDateString("vi-VN"),
            }
            localStorage.setItem(DRIVER_VEHICLE_STORAGE_KEY, JSON.stringify(created))
            return created
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["driver_single_vehicle"] })
            navigate("/driver/vehicles")
        },
    })

    // 3. Mutation Cập nhật thông tin xe (Giữ nguyên loại xe)
    const updateMutation = useMutation({
        mutationFn: async (updatedData: Partial<DriverVehicleItem>) => {
            await new Promise((r) => setTimeout(r, 400))
            const current = getMockVehicle()
            if (!current) throw new Error("Không tìm thấy phương tiện.")

            const updated: DriverVehicleItem = {
                ...current,
                ...updatedData,
                vehicleType: current.vehicleType, // Khóa cứng loại xe
                vehicleTypeLabel: current.vehicleTypeLabel,
                approvalStatus: "PENDING", // Cập nhật cần chờ duyệt lại
                updatedAt: new Date().toLocaleDateString("vi-VN"),
            }
            localStorage.setItem(DRIVER_VEHICLE_STORAGE_KEY, JSON.stringify(updated))
            return updated
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["driver_single_vehicle"] })
            navigate("/driver/vehicles")
        },
    })

    // 4. Mutation Thay xe mới (Bắt buộc cùng loại)
    const replaceMutation = useMutation({
        mutationFn: async (newVehicleData: Omit<DriverVehicleItem, "id" | "vehicleType" | "vehicleTypeLabel" | "approvalStatus" | "createdAt" | "updatedAt">) => {
            await new Promise((r) => setTimeout(r, 400))
            const current = getMockVehicle()
            if (!current) throw new Error("Không tìm thấy phương tiện cũ.")

            const replaced: DriverVehicleItem = {
                ...newVehicleData,
                id: `veh_${Date.now()}`,
                vehicleType: current.vehicleType, // Giữ nguyên loại xe cũ
                vehicleTypeLabel: current.vehicleTypeLabel,
                approvalStatus: "PENDING",
                createdAt: new Date().toLocaleDateString("vi-VN"),
                updatedAt: new Date().toLocaleDateString("vi-VN"),
            }
            localStorage.setItem(DRIVER_VEHICLE_STORAGE_KEY, JSON.stringify(replaced))
            return replaced
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["driver_single_vehicle"] })
            navigate("/driver/vehicles")
        },
    })

    return {
        vehicle,
        isLoading,
        registerVehicle: registerMutation.mutateAsync,
        updateVehicle: updateMutation.mutateAsync,
        replaceVehicle: replaceMutation.mutateAsync,
        isSubmitting: registerMutation.isPending || updateMutation.isPending || replaceMutation.isPending,
    }
}