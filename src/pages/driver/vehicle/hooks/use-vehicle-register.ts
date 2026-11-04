import { useDriverVehicle, type UpsertVehicleRequest } from "@/pages/driver/vehicle/hooks/use-driver-vehicle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as z from "zod";

export const vehicleRegisterSchema = z.object({
    vehicleType: z.enum(["MOTORBIKE", "CAR", "TRUCK"]),
    licensePlate: z.string().min(1, "Vui lòng nhập biển số xe"),
    brand: z.string().optional(),
    color: z.string().optional(),
    maxWeightKg: z.number().min(1, "Tải trọng phải lớn hơn 0"),
});

export type VehicleRegisterFormValues = z.infer<typeof vehicleRegisterSchema>;

export function useVehicleRegister() {
    const navigate = useNavigate();
    const { registerVehicle, isSubmitting } = useDriverVehicle();

    const form = useForm<VehicleRegisterFormValues>({
        resolver: zodResolver(vehicleRegisterSchema),
        defaultValues: {
            vehicleType: "MOTORBIKE", // Đặt giá trị mặc định hợp lệ khớp với z.enum
            licensePlate: "",
            brand: "",
            color: "",
            maxWeightKg: 50,
        },
    });

    const onSubmit = async (data: VehicleRegisterFormValues) => {
        // Ánh xạ từ string sang số (number) khớp với C# Enum VehicleType ở Backend
        const vehicleTypeMapping: Record<string, number> = {
            MOTORBIKE: 0,
            CAR: 1,
            TRUCK: 2,
        };

        const payload = {
            vehicleType: vehicleTypeMapping[data.vehicleType] ?? 0,
            licensePlate: data.licensePlate,
            brand: data.brand || null,
            color: data.color || null,
            maxWeightKg: data.maxWeightKg,
        };

        // Ép kiểu sang UpsertVehicleRequest nếu interface bên hook yêu cầu number
        await registerVehicle(payload as unknown as UpsertVehicleRequest);
    };

    return {
        form,
        onSubmit: form.handleSubmit(onSubmit),
        isSubmitting,
        navigateBack: () => navigate("/driver/vehicles"),
    };
}