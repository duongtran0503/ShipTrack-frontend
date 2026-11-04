import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import * as z from "zod"
import { useDriverVehicle, type UpsertVehicleRequest } from "./use-driver-vehicle"

// Định nghĩa schema validation với Zod cho việc đăng ký xe mới thay thế
export const vehicleReplaceSchema = z.object({
    vehicleType: z.enum(["MOTORBIKE", "CAR", "TRUCK"]),
    licensePlate: z.string().min(1, "Vui lòng nhập biển số xe mới"),
    brand: z.string().optional(),
    color: z.string().optional(),
    maxWeightKg: z.number().min(1, "Tải trọng phải lớn hơn 0"),
    reason: z.string().min(5, "Lý do thay xe phải có ít nhất 5 ký tự"),
})

export type VehicleReplaceFormValues = z.infer<typeof vehicleReplaceSchema>

export function useVehicleReplace() {
    const navigate = useNavigate()
    const { vehicle, registerVehicle, isSubmitting } = useDriverVehicle()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pendingData, setPendingData] = useState<VehicleReplaceFormValues | null>(null)

    const form = useForm<VehicleReplaceFormValues>({
        resolver: zodResolver(vehicleReplaceSchema),
        defaultValues: {
            vehicleType: vehicle?.vehicleType || "MOTORBIKE",
            licensePlate: "",
            brand: "",
            color: "",
            maxWeightKg: 50,
            reason: "",
        },
    })

    // Bước 1: Khi bấm nút submit, mở modal xác nhận và lưu tạm dữ liệu form
    const onSubmitClick = (data: VehicleReplaceFormValues) => {
        setPendingData(data)
        setIsModalOpen(true)
    }

    // Bước 2: Xác nhận cuối cùng trong Modal -> Gọi API POST tạo xe mới
    const handleConfirmReplace = async () => {
        if (!pendingData) return

        const payload: UpsertVehicleRequest = {
            vehicleType: pendingData.vehicleType,
            licensePlate: pendingData.licensePlate,
            brand: pendingData.brand || undefined,
            color: pendingData.color || undefined,
            maxWeightKg: pendingData.maxWeightKg,
        }

        await registerVehicle(payload)
        setIsModalOpen(false)
    }

    return {
        vehicle,
        form,
        isSubmitting,
        isModalOpen,
        setIsModalOpen,
        onSubmitClick: form.handleSubmit(onSubmitClick),
        handleConfirmReplace,
        navigateBack: () => navigate("/driver/vehicles"),
    }
}