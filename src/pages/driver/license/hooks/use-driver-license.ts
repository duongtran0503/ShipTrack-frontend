import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

// ==================== ZOD SCHEMA ====================
export const driverLicenseSchema = z.object({
    licenseNumber: z
        .string()
        .min(8, "Số bằng lái phải có ít nhất 8 ký tự")
        .max(20, "Số bằng lái không vượt quá 20 ký tự"),
    issueDate: z.string().min(1, "Vui lòng chọn ngày cấp"),
    expiryDate: z.string().min(1, "Vui lòng chọn ngày hết hạn"),
}).refine((data) => {
    if (!data.issueDate || !data.expiryDate) return true
    return new Date(data.expiryDate) > new Date(data.issueDate)
}, {
    message: "Ngày hết hạn phải sau ngày cấp bằng",
    path: ["expiryDate"],
})

export type DriverLicenseSchemaType = z.infer<typeof driverLicenseSchema>

export interface DriverLicenseInfo {
    licenseNumber: string;
    issueDate: string;
    expiryDate: string;
    licenseImageUrl: string;
    approvalStatus: "APPROVED" | "PENDING" | "REJECTED"; // Trạng thái phê duyệt từ hệ thống/admin
    rejectionReason?: string;
}

// ==================== MOCK API / LOCALSTORAGE ====================
const LICENSE_STORAGE_KEY = "shiptrack_driver_license_mock"

const getMockLicense = (): DriverLicenseInfo => {
    const saved = localStorage.getItem(LICENSE_STORAGE_KEY)
    if (saved) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        try { return JSON.parse(saved) } catch (e) { /* ignore */ }
    }
    const defaultData: DriverLicenseInfo = {
        licenseNumber: "790123456789",
        issueDate: "2023-05-10",
        expiryDate: "2028-05-10",
        licenseImageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=60",
        approvalStatus: "APPROVED",
    }
    localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(defaultData))
    return defaultData
}

const saveMockLicense = (data: DriverLicenseInfo) => {
    localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(data))
}

export function useDriverLicense() {
    const queryClient = useQueryClient()
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    // 1. Query lấy thông tin bằng lái
    const { data: license, isLoading } = useQuery({
        queryKey: ["driver_license"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300))
            return getMockLicense()
        },
    })

    // 2. Form setup
    const form = useForm<DriverLicenseSchemaType>({
        resolver: zodResolver(driverLicenseSchema),
        values: {
            licenseNumber: license?.licenseNumber || "",
            issueDate: license?.issueDate || "",
            expiryDate: license?.expiryDate || "",
        },
    })

    // 3. Mutation cập nhật bằng lái
    const updateLicenseMutation = useMutation({
        mutationFn: async (data: DriverLicenseSchemaType) => {
            await new Promise((r) => setTimeout(r, 600))
            const current = getMockLicense()
            const updated: DriverLicenseInfo = {
                ...current,
                ...data,
                licenseImageUrl: imagePreview || current.licenseImageUrl,
                approvalStatus: "PENDING", // Cập nhật thông tin mới sẽ chuyển sang chờ duyệt lại
            }
            saveMockLicense(updated)
            return updated
        },
        onSuccess: (updated) => {
            toast.success("Đã gửi cập nhật bằng lái! Hệ thống đang chờ quản trị viên phê duyệt.")
            setImagePreview(null)
            queryClient.setQueryData(["driver_license"], updated)
        },
        onError: () => {
            toast.error("Không thể cập nhật bằng lái. Vui lòng thử lại!")
        },
    })

    // 4. Handler upload ảnh bằng lái
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Kích thước ảnh không vượt quá 5MB!")
            return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result as string)
            toast.info("Đã chọn ảnh bằng lái mới! Nhấn 'Gửi phê duyệt' để lưu.")
        }
        reader.readAsDataURL(file)
    }

    const onSubmit = form.handleSubmit((data) => {
        updateLicenseMutation.mutate(data)
    })

    // Kiểm tra thời hạn bằng lái (Cảnh báo nếu còn dưới 30 ngày hoặc đã hết hạn)
    const checkExpiryStatus = (expiryStr: string) => {
        if (!expiryStr) return { isExpired: false, isNearExpiry: false, daysLeft: 0 }
        const expiryDate = new Date(expiryStr)
        const today = new Date()
        const diffTime = expiryDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        return {
            isExpired: diffDays < 0,
            isNearExpiry: diffDays >= 0 && diffDays <= 30,
            daysLeft: diffDays,
        }
    }

    return {
        license,
        isLoading,
        form,
        onSubmit,
        imagePreview,
        handleImageChange,
        isSaving: updateLicenseMutation.isPending,
        checkExpiryStatus,
    }
}