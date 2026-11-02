import { Loader2 } from "lucide-react";
import { AvailabilityToggle } from "./components/availability-toggle";
import { AvailabilityWarning } from "./components/availability-warning";
import { DefaultVehicleCard } from "./components/default-vehicle-card";
import { LocationStatsCard } from "./components/location-stats-card";
import { OfflineWarningDialog } from "./components/offline-warning-dialog";
import { useDriverAvailability } from "./hooks/use-driver-availability";

export default function DriverAvailabilityPage() {
    const {
        availability,
        isLoading,
        isToggling,
        handleAttemptToggle,
        showWarningModal,
        setShowWarningModal,
        confirmForceOffline,
    } = useDriverAvailability();

    if (isLoading || !availability) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải trạng thái hoạt động...
            </div>
        );
    }

    const canBeOnline = Boolean(availability.defaultVehicle && availability.licenseStatus === "APPROVED");

    return (
        <div className="w-full space-y-6 pb-10">
            {/* 1. Cảnh báo điều kiện */}
            <AvailabilityWarning availability={availability} canBeOnline={canBeOnline} />

            {/* 2. Toggle lớn chính giữa */}
            <AvailabilityToggle
                availability={availability}
                isToggling={isToggling}
                canBeOnline={canBeOnline}
                onToggle={handleAttemptToggle}
            />

            {/* 3. Lưới thông tin chi tiết */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DefaultVehicleCard vehicle={availability.defaultVehicle} />
                <LocationStatsCard
                    availableOrdersNearby={availability.availableOrdersNearby}
                    activeOrdersCount={availability.activeOrdersCount}
                />
            </div>

            {/* 4. Modal cảnh báo */}
            <OfflineWarningDialog
                isOpen={showWarningModal}
                onOpenChange={setShowWarningModal}
                activeOrdersCount={availability.activeOrdersCount}
                onConfirm={confirmForceOffline}
            />
        </div>
    );
}