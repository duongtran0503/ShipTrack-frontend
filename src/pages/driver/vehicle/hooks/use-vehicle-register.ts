import { useDriverVehicle } from "@/pages/driver/vehicle/hooks/use-driver-vehicle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as z from "zod";

export const vehicleRegisterSchema = z.object({
    vehicleType: z.enum(["MOTORBIKE", "CAR", "TRUCK"]),
    licensePlate: z.string().min(1, "Vui lòng nhập biển số xe"),
    brand: z.string().min(1, "Vui lòng nhập hãng xe"),
    model: z.string().min(1, "Vui lòng nhập model dòng xe"),
    color: z.string().min(1, "Vui lòng nhập màu sắc xe"),
    weightCapacityKg: z.number().min(1, "Tải trọng phải lớn hơn 0"),
});

export type VehicleRegisterFormValues = z.infer<typeof vehicleRegisterSchema>;

export function useVehicleRegister() {
    const navigate = useNavigate();
    const { registerVehicle, isSubmitting } = useDriverVehicle();

    const form = useForm<VehicleRegisterFormValues>({
        resolver: zodResolver(vehicleRegisterSchema),
        defaultValues: {
            vehicleType: "MOTORBIKE",
            licensePlate: "",
            brand: "",
            model: "",
            color: "",
            weightCapacityKg: 50,
        },
    });

    const onSubmit = async (data: VehicleRegisterFormValues) => {
        const typeLabels = {
            MOTORBIKE: "Xe máy",
            CAR: "Ô tô",
            TRUCK: "Xe tải",
        };

        await registerVehicle({
            ...data,
            vehicleTypeLabel: typeLabels[data.vehicleType],
            vehicleImageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600",
            licensePlateImageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300",
        });
    };

    return {
        form,
        onSubmit: form.handleSubmit(onSubmit),
        isSubmitting,
        navigateBack: () => navigate("/driver/vehicles"),
    };
}