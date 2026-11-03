import { VehicleForm } from "@/pages/driver/vehicle/components/vehicle-form";
import { VehicleHeader } from "@/pages/driver/vehicle/components/vehicle-header";
import { VehicleReadonlyInfo } from "@/pages/driver/vehicle/components/vehicle-readonly-info";
import { useVehicleEdit } from "@/pages/driver/vehicle/hooks/use-vehicle-edit";


export default function VehicleEditPage() {
    const { vehicle, form, isSubmitting, onSubmit, navigateBack } = useVehicleEdit();

    if (!vehicle) {
        navigateBack();
        return null;
    }

    return (
        <div className="w-full space-y-6 pb-16">
            {/* Header quay lại */}
            <VehicleHeader onGoBack={navigateBack} />

            {/* Khối thông tin loại xe cố định */}
            <VehicleReadonlyInfo vehicleTypeLabel={vehicle.vehicleTypeLabel} />

            {/* Form cập nhật */}
            <VehicleForm
                form={form}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
                onCancel={navigateBack}
            />
        </div>
    );
}