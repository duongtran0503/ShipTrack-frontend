import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import * as z from "zod"
import { useDriverVehicle, type UpsertVehicleRequest } from "./use-driver-vehicle"

export const vehicleEditSchema = z.object({
    vehicleType: z.enum(["MOTORBIKE", "CAR", "TRUCK"]),
    licensePlate: z.string().min(1, "Vui lòng nhập biển số xe"),
    brand: z.string().optional(),
    model: z.string().min(1, "Vui lòng nhập model dòng xe"),
    color: z.string().optional(),
    maxWeightKg: z.number().min(1, "Tải trọng phải lớn hơn 0"),
})

export type VehicleEditFormValues = z.infer<typeof vehicleEditSchema>

export function useVehicleEdit() {
    const navigate = useNavigate()
    const { vehicle, registerVehicle, isSubmitting } = useDriverVehicle()

    const form = useForm<VehicleEditFormValues>({
        resolver: zodResolver(vehicleEditSchema),
        defaultValues: {
            vehicleType: "MOTORBIKE",
            licensePlate: "",
            brand: "",
            model: "",
            color: "",
            maxWeightKg: 50,
        },
    })

    useEffect(() => {
        if (vehicle) {
            form.reset({
                vehicleType: vehicle.vehicleType || "MOTORBIKE",
                licensePlate: vehicle.licensePlate,
                brand: vehicle.brand || "",
                color: vehicle.color || "",
                maxWeightKg: vehicle.maxWeightKg || 50,
            })
        }
    }, [vehicle, form])

    const onSubmit = async (data: VehicleEditFormValues) => {
        // Ánh xạ enum sang số nếu backend yêu cầu (giữ nguyên logic trước đó)
        const vehicleTypeMapping: Record<string, number> = {
            MOTORBIKE: 0,
            CAR: 1,
            TRUCK: 2,
        };

        const payload = {
            vehicleType: vehicleTypeMapping[data.vehicleType] ?? 0,
            // 🔒 Khóa không cho sửa: ép buộc dùng lại giá trị gốc từ vehicle hiện tại
            licensePlate: vehicle?.licensePlate || data.licensePlate,
            brand: vehicle?.brand || data.brand || undefined,
            color: data.color || undefined,
            maxWeightKg: data.maxWeightKg,
        }

        await registerVehicle(payload as unknown as UpsertVehicleRequest)
    }

    return {
        vehicle,
        form,
        isSubmitting,
        onSubmit: form.handleSubmit(onSubmit),
        navigateBack: () => navigate("/driver/vehicles"),
    }
}