import { ApprovalDetailDialog } from "@/pages/manager/vehicles/components/approval-detail-dialog";
import { ApprovalsTable } from "@/pages/manager/vehicles/components/data-vehicle-table-approval";
import { RejectVehicleDialog } from "@/pages/manager/vehicles/components/reject-vehicle-dialog";
import { useVehicleApprovals } from "@/pages/manager/vehicles/hooks/use-vehicle-approvals";
import { Loader2 } from "lucide-react";

export default function AdminVehicleApprovalsPage() {
    const {
        pendingVehicles,
        isLoading,
        selectedVehicle,
        isDetailModalOpen,
        setIsDetailModalOpen,
        isRejectModalOpen,
        setIsRejectModalOpen,
        rejectReason,
        setRejectReason,
        handleOpenDetail,
        handleOpenReject,
        handleConfirmApprove,
        handleConfirmReject,
        isApproving,
        isRejecting,
    } = useVehicleApprovals();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải danh sách phương tiện chờ duyệt...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            <ApprovalsTable
                vehicles={pendingVehicles}
                onViewDetail={handleOpenDetail}
                onApprove={handleConfirmApprove}
                onReject={handleOpenReject}
                isApproving={isApproving}
            />

            <ApprovalDetailDialog
                isOpen={isDetailModalOpen}
                onOpenChange={setIsDetailModalOpen}
                vehicle={selectedVehicle}
                onApprove={handleConfirmApprove}
                onReject={handleOpenReject}
                isApproving={isApproving}
            />

            <RejectVehicleDialog
                isOpen={isRejectModalOpen}
                onOpenChange={setIsRejectModalOpen}
                vehicle={selectedVehicle}
                reason={rejectReason}
                setReason={setRejectReason}
                onConfirm={handleConfirmReject}
                isRejecting={isRejecting}
            />
        </div>
    );
}