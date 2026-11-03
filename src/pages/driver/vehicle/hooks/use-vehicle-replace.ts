import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import * as z from "zod"
import { useDriverVehicle } from "./use-driver-vehicle"

// Định nghĩa schema validation với Zod
export const vehicleReplaceSchema = z.object({
    licensePlate: z.string().min(1, "Vui lòng nhập biển số xe mới"),
    brand: z.string().min(1, "Vui lòng nhập hãng xe"),
    model: z.string().min(1, "Vui lòng nhập model xe"),
    color: z.string().min(1, "Vui lòng nhập màu sắc xe"),
    reason: z.string().min(5, "Lý do thay xe phải có ít nhất 5 ký tự"),
})

export type VehicleReplaceFormValues = z.infer<typeof vehicleReplaceSchema>

export function useVehicleReplace() {
    const navigate = useNavigate()
    const { vehicle, replaceVehicle, isSubmitting } = useDriverVehicle()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pendingData, setPendingData] = useState<VehicleReplaceFormValues | null>(null)

    const form = useForm<VehicleReplaceFormValues>({
        resolver: zodResolver(vehicleReplaceSchema),
        defaultValues: {
            licensePlate: "",
            brand: "",
            model: "",
            color: "",
            reason: "",
        },
    })

    // Bước 1: Khi bấm nút submit, mở modal xác nhận và lưu tạm dữ liệu form
    const onSubmitClick = (data: VehicleReplaceFormValues) => {
        setPendingData(data)
        setIsModalOpen(true)
    }

    // Bước 2: Xác nhận cuối cùng trong Modal
    const handleConfirmReplace = async () => {
        if (!pendingData) return

        await replaceVehicle({
            licensePlate: pendingData.licensePlate,
            brand: pendingData.brand,
            model: pendingData.model,
            color: pendingData.color,
            weightCapacityKg: 50,
            vehicleImageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600",
            licensePlateImageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300",
        })
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