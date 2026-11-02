import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

// ==================== ZOD SCHEMA ====================
export const driverProfileSchema = z.object({
    fullName: z
        .string()
        .min(2, "Họ và tên phải có ít nhất 2 ký tự")
        .max(120, "Họ tên không vượt quá 120 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    phone: z
        .string()
        .regex(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không đúng định dạng Việt Nam"),
})

export type DriverProfileSchemaType = z.infer<typeof driverProfileSchema>

export interface DriverAccountInfo {
    id: string | number;
    fullName: string;
    email: string;
    phone: string;
    avatarUrl: string;
    joinedDate: string;
    status: string; // "ACTIVE" | "PENDING" | "SUSPENDED"
    averageRating: number;
    totalTrips: number;
}

// ==================== MOCK API / LOCALSTORAGE ====================
const PROFILE_STORAGE_KEY = "shiptrack_driver_profile_mock"

const getMockProfile = (): DriverAccountInfo => {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY)
    if (saved) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        try { return JSON.parse(saved) } catch (e) { /* ignore */ }
    }
    const defaultData: DriverAccountInfo = {
        id: "DRV-8892",
        fullName: "Nguyễn Văn Tài",
        email: "taixe.nguyen@shiptrack.vn",
        phone: "0909123456",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ShipTrackDriver",
        joinedDate: "15/03/2025",
        status: "ACTIVE",
        averageRating: 4.9,
        totalTrips: 342,
    }
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(defaultData))
    return defaultData
}

const saveMockProfile = (data: DriverAccountInfo) => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data))
}

export function useDriverProfile() {
    const queryClient = useQueryClient()
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

    // 1. Query lấy dữ liệu profile
    const { data: profile, isLoading } = useQuery({
        queryKey: ["driver_profile"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300)) // Giả lập độ trễ mạng
            return getMockProfile()
        },
    })

    // 2. Form setup với react-hook-form
    const form = useForm<DriverProfileSchemaType>({
        resolver: zodResolver(driverProfileSchema),
        values: {
            fullName: profile?.fullName || "",
            email: profile?.email || "",
            phone: profile?.phone || "",
        },
    })

    // 3. Mutation cập nhật thông tin cá nhân
    const updateProfileMutation = useMutation({
        mutationFn: async (data: DriverProfileSchemaType) => {
            await new Promise((r) => setTimeout(r, 500))
            const current = getMockProfile()
            const updated: DriverAccountInfo = {
                ...current,
                ...data,
                avatarUrl: avatarPreview || current.avatarUrl,
            }
            saveMockProfile(updated)
            return updated
        },
        onSuccess: (updated) => {
            toast.success("Cập nhật thông tin cá nhân thành công!")
            setAvatarPreview(null)
            queryClient.setQueryData(["driver_profile"], updated)
        },
        onError: () => {
            toast.error("Cập nhật thất bại. Vui lòng thử lại!")
        },
    })

    // 4. Handler upload ảnh avatar (Giả lập FileReader)
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Kích thước ảnh không vượt quá 5MB!")
            return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
            setAvatarPreview(reader.result as string)
            toast.info("Đã chọn ảnh mới! Nhấn 'Lưu thay đổi' để hoàn tất.")
        }
        reader.readAsDataURL(file)
    }

    const onSubmit = form.handleSubmit((data) => {
        updateProfileMutation.mutate(data)
    })

    return {
        profile,
        isLoading,
        form,
        onSubmit,
        avatarPreview,
        handleAvatarChange,
        isSaving: updateProfileMutation.isPending,
    }
}