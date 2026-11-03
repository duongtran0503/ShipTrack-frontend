import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import * as z from "zod"
import { useDriverVehicle } from "./use-driver-vehicle"

// Định nghĩa Zod schema cho form cập nhật xe
export const vehicleEditSchema = z.object({
    licensePlate: z.string().min(1, "Vui lòng nhập biển số xe"),
    brand: z.string().min(1, "Vui lòng nhập hãng xe"),
    model: z.string().min(1, "Vui lòng nhập model dòng xe"),
    color: z.string().min(1, "Vui lòng nhập màu sắc xe"),
    weightCapacityKg: z.number().min(1, "Tải trọng phải lớn hơn 0"),
})

export type VehicleEditFormValues = z.infer<typeof vehicleEditSchema>

export function useVehicleEdit() {
    const navigate = useNavigate()
    const { vehicle, updateVehicle, isSubmitting } = useDriverVehicle()

    const form = useForm<VehicleEditFormValues>({
        resolver: zodResolver(vehicleEditSchema),
        defaultValues: {
            licensePlate: "",
            brand: "",
            model: "",
            color: "",
            weightCapacityKg: 50,
        },
    })

    // Đồng bộ dữ liệu hiện tại của xe vào form khi query tải xong
    useEffect(() => {
        if (vehicle) {
            form.reset({
                licensePlate: vehicle.licensePlate,
                brand: vehicle.brand,
                model: vehicle.model,
                color: vehicle.color,
                weightCapacityKg: vehicle.weightCapacityKg || 50,
            })
        }
    }, [vehicle, form])

    const onSubmit = async (data: VehicleEditFormValues) => {
        await updateVehicle({
            licensePlate: data.licensePlate,
            brand: data.brand,
            model: data.model,
            color: data.color,
            weightCapacityKg: data.weightCapacityKg,
        })
    }

    return {
        vehicle,
        form,
        isSubmitting,
        onSubmit: form.handleSubmit(onSubmit),
        navigateBack: () => navigate("/driver/vehicles"),
    }
}