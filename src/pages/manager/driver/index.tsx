import { DriverTable } from "@/pages/manager/driver/components/data-table-driver";
import { Loader2 } from "lucide-react";
import { BanDriverDialog } from "./components/ban-driver-dialog";
import { useAdminDrivers } from "./hooks/use-admin-drivers";

export default function AdminDriversPage() {
    const {
        drivers,
        isLoading,
        goToDriverDetail,
        isBanModalOpen,
        setIsBanModalOpen,
        selectedDriver,
        banReason,
        setBanReason,
        handleOpenBanModal,
        handleToggleDriverStatus,
        isPending,
    } = useAdminDrivers();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải danh sách tài xế...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            <DriverTable
                drivers={drivers}
                onView={(driver) => goToDriverDetail(driver.Id)}
                onBanToggle={(driver) => handleOpenBanModal(driver)}
            />

            <BanDriverDialog
                isOpen={isBanModalOpen}
                onOpenChange={setIsBanModalOpen}
                driver={selectedDriver}
                reason={banReason}
                setReason={setBanReason}
                onConfirm={handleToggleDriverStatus}
                isPending={isPending}
            />
        </div>
    );
}