import { VehicleTable } from "@/pages/manager/vehicles/components/data-vehicle-table";
import { Loader2 } from "lucide-react";
import { useAdminVehicles } from "./hooks/use-admin-vehicles";

export default function AdminVehiclesPage() {
    const { vehicles, isLoading, goToVehicleDetail } = useAdminVehicles();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải danh sách phương tiện...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            <VehicleTable vehicles={vehicles} onViewDetail={goToVehicleDetail} />
        </div>
    );
}