import { ActiveOrderHeader } from "@/pages/driver/order/active/components/active-order-header";
import { ConfirmStatusModal } from "@/pages/driver/order/active/components/confirm-status-modal";
import { CustomerContactCard } from "@/pages/driver/order/active/components/customer-contact-card";
import { FailureReasonModal } from "@/pages/driver/order/active/components/failure-reason-modal";
import { OrderErrorState } from "@/pages/driver/order/active/components/order-error-state";
import { OrderProgressCard } from "@/pages/driver/order/active/components/order-progress-card";
import { PackageInfoCard } from "@/pages/driver/order/active/components/package-info-card";
import { PaymentInfoCard } from "@/pages/driver/order/active/components/payment-info-card";
import { RouteInfoCard } from "@/pages/driver/order/active/components/route-info-card";
import { useActiveOrderDetail } from "@/pages/driver/order/active/hooks/use-active-order-detail";
import type { ActiveOrderStatus } from "@/pages/driver/order/active/hooks/use-active-orders";
import { Loader2 } from "lucide-react";
import { useState } from "react";


export default function ActiveOrderDetailPage() {
    const {
        order,
        isLoading,
        error,
        updateStatus,
        isUpdating,
        goBack,
        openRouteMap,
    } = useActiveOrderDetail();

    // State quản lý Modal xác nhận thông thường
    const [pendingAction, setPendingAction] = useState<{
        status: ActiveOrderStatus;
        label: string;
        title: string;
        desc: string;
    } | null>(null);

    // State quản lý Modal chọn lý do giao thất bại
    const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải chi tiết đơn hàng đang thực hiện...
            </div>
        );
    }

    if (error || !order) {
        return (
            <OrderErrorState
                message={error instanceof Error ? error.message : undefined}
                onGoBack={goBack}
            />
        );
    }

    const currentStatus = order.status || "DRIVER_ASSIGNED";

    const handleConfirmUpdate = async () => {
        if (!pendingAction) return;
        await updateStatus(order.id, pendingAction.status, pendingAction.label);
        setPendingAction(null);
    };

    const handleConfirmFailure = async (reason: string) => {
        await updateStatus(order.id, "FAILED" as ActiveOrderStatus, `Giao thất bại (${reason})`, reason);
        setIsFailureModalOpen(false);
    };

    return (
        <div className="w-full space-y-6 pb-16 px-2 sm:px-4">
            {/* Header & Banner trạng thái */}
            <ActiveOrderHeader
                trackingCode={order.trackingCode}
                currentStatus={currentStatus}
                driverStatusLabel={order.driverStatusLabel}
                onGoBack={goBack}
                onOpenRouteMap={() => openRouteMap(order.id)}
            />

            {/* Layout lưới */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cột trái (2 span): Tiến độ & Lộ trình */}
                <div className="lg:col-span-2 space-y-6">
                    <OrderProgressCard
                        order={order}
                        currentStatus={currentStatus}
                        onPickup={() =>
                            setPendingAction({
                                status: "PICKED_UP",
                                label: "Đã lấy hàng",
                                title: "Xác nhận đã lấy hàng?",
                                desc: "Xác nhận bạn đã tiếp nhận bưu phẩm thành công từ người gửi tại điểm lấy.",
                            })
                        }
                        onDeliver={() =>
                            setPendingAction({
                                status: "DELIVERING",
                                label: "Đang giao hàng",
                                title: "Bắt đầu di chuyển giao hàng?",
                                desc: "Xác nhận lên đường giao bưu phẩm đến địa chỉ người nhận.",
                            })
                        }
                        onComplete={() =>
                            setPendingAction({
                                status: "COMPLETED",
                                label: "Hoàn thành",
                                title: "Xác nhận giao thành công?",
                                desc: "Xác nhận đã bàn giao bưu phẩm và thu đủ tiền COD từ người nhận.",
                            })
                        }
                        onFail={() => setIsFailureModalOpen(true)}
                    />
                    <RouteInfoCard order={order} />
                </div>

                {/* Cột phải (1 span): Chi tiết hàng hóa, Khách hàng, Thanh toán */}
                <div className="lg:col-span-1 space-y-6">
                    <PackageInfoCard order={order} />
                    <CustomerContactCard order={order} />
                    <PaymentInfoCard order={order} />
                </div>
            </div>

            {/* Modals */}
            <ConfirmStatusModal
                isOpen={!!pendingAction}
                onClose={() => setPendingAction(null)}
                onConfirm={handleConfirmUpdate}
                isLoading={isUpdating}
                title={pendingAction?.title || "Xác nhận cập nhật"}
                description={pendingAction?.desc || "Bạn có chắc chắn muốn thực hiện hành động này?"}
            />

            <FailureReasonModal
                isOpen={isFailureModalOpen}
                onClose={() => setIsFailureModalOpen(false)}
                onConfirm={handleConfirmFailure}
                isLoading={isUpdating}
            />
        </div>
    );
}