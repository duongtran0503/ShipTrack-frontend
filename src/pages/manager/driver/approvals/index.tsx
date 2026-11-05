import { ApprovalDetailDialog } from "@/pages/manager/driver/components/approval-detail-dialog";
import { ApprovalsTable } from "@/pages/manager/driver/components/data-table-driver-approval";
import { RejectDriverDialog } from "@/pages/manager/driver/components/reject-driver-dialog";
import { useDriverApprovals } from "@/pages/manager/driver/hooks/use-driver-approvals";
import { Loader2 } from "lucide-react";

export default function AdminDriverApprovalsPage() {
    const {
        pendingDrivers,
        isLoading,
        selectedDriver,
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
    } = useDriverApprovals();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải danh sách hồ sơ chờ duyệt...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            <ApprovalsTable
                drivers={pendingDrivers}
                onViewDetail={handleOpenDetail}
                onApprove={handleConfirmApprove}
                onReject={handleOpenReject}
                isApproving={isApproving}
            />

            <ApprovalDetailDialog
                isOpen={isDetailModalOpen}
                onOpenChange={setIsDetailModalOpen}
                driver={selectedDriver}
                onApprove={handleConfirmApprove}
                onReject={handleOpenReject}
                isApproving={isApproving}
            />

            <RejectDriverDialog
                isOpen={isRejectModalOpen}
                onOpenChange={setIsRejectModalOpen}
                driver={selectedDriver}
                reason={rejectReason}
                setReason={setRejectReason}
                onConfirm={handleConfirmReject}
                isRejecting={isRejecting}
            />
        </div>
    );
}