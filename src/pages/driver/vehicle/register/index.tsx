
import { Button } from "@/components/ui/button";
import { RegisterForm } from "@/pages/driver/vehicle/components/register-form";
import { RegisterWarning } from "@/pages/driver/vehicle/components/register-warning";
import { useVehicleRegister } from "@/pages/driver/vehicle/hooks/use-vehicle-register";
import { ArrowLeft } from "lucide-react";

export default function VehicleRegisterPage() {
    const { form, onSubmit, isSubmitting, navigateBack } = useVehicleRegister();

    return (
        <div className="w-full  space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={navigateBack}
                    className="text-xs font-bold gap-2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                    <ArrowLeft className="size-4" /> Quay lại
                </Button>
                <h1 className="text-base font-bold text-foreground">Đăng ký phương tiện lần đầu</h1>
            </div>

            {/* Cảnh báo quan trọng */}
            <RegisterWarning />

            {/* Form đăng ký */}
            <RegisterForm
                form={form}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
                onCancel={navigateBack}
            />
        </div>
    );
}