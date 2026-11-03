import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConfirmReplaceDialog } from "@/pages/driver/vehicle/components/confirm-replace-dialog";
import { ReplaceForm } from "@/pages/driver/vehicle/components/replace-form";
import { ReplaceReadonlyInfo } from "@/pages/driver/vehicle/components/replace-readonly-info";
import { ReplaceWarning } from "@/pages/driver/vehicle/components/replace-warning";
import { useVehicleReplace } from "@/pages/driver/vehicle/hooks/use-vehicle-replace";
import { ArrowLeft } from "lucide-react";


export default function VehicleReplacePage() {
    const {
        vehicle,
        form,
        isSubmitting,
        isModalOpen,
        setIsModalOpen,
        onSubmitClick,
        handleConfirmReplace,
        navigateBack,
    } = useVehicleReplace();

    if (!vehicle) {
        navigateBack();
        return null;
    }

    return (
        <div className="w-full space-y-4 pb-16">
            {/* Header quay lại */}
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={navigateBack}
                    className="text-xs font-bold gap-2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                    <ArrowLeft className="size-4" /> Quay lại
                </Button>
                <h1 className="text-base font-bold text-foreground">Thay xe mới (Cùng loại)</h1>
            </div>

            {/* Cảnh báo thay xe */}
            <ReplaceWarning
                vehicleTypeLabel={vehicle.vehicleTypeLabel}
                oldLicensePlate={vehicle.licensePlate}
            />

            <Card className="rounded-[28px] border-border/60 shadow-sm bg-card">
                <CardContent className="p-6 sm:p-8 space-y-6">
                    {/* Khối thông tin loại xe cố định */}
                    <ReplaceReadonlyInfo vehicleTypeLabel={vehicle.vehicleTypeLabel} />

                    {/* Form nhập liệu */}
                    <ReplaceForm
                        form={form}
                        onSubmit={onSubmitClick}
                        onCancel={navigateBack}
                    />
                </CardContent>
            </Card>

            {/* Modal xác nhận bằng shadcn Dialog */}
            <ConfirmReplaceDialog
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                oldLicensePlate={vehicle.licensePlate}
                isSubmitting={isSubmitting}
                onConfirm={handleConfirmReplace}
            />
        </div>
    );
}