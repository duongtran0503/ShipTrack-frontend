import { OrderDetailHeader } from "@/pages/customer/order/detail/components/order-detail-header"
import { OrderDriverCard } from "@/pages/customer/order/detail/components/order-driver-card"
import { OrderFeeCard } from "@/pages/customer/order/detail/components/order-fee-card"
import { OrderRouteCard } from "@/pages/customer/order/detail/components/order-route-card"
import { OrderTimeline } from "@/pages/customer/order/detail/components/order-timeline"
import { useOrderDetail } from "@/pages/customer/order/detail/hooks/use-order-detail"


export default function OrderDetailPage() {
    const {
        order,
        isLoading,
        timelineSteps,
        canCancel,
        isDelivering,
        isCancelDialogOpen,
        setIsCancelDialogOpen,
        cancelReason,
        setCancelReason,
        cancelNote,
        setCancelNote,
        isCancelling,
        handleCancel,
        goBack,
        goToTracking,
    } = useOrderDetail()

    if (isLoading || !order) {
        return (
            <div className="p-8 text-center text-sm text-muted-foreground">
                Đang tải chi tiết đơn hàng...
            </div>
        )
    }

    return (
        <div className=" bg-muted/30 text-foreground space-y-2">
            <div className=" space-y-4">
                {/* Header */}
                <OrderDetailHeader
                    order={order}
                    canCancel={canCancel}
                    isDelivering={isDelivering}
                    onBack={goBack}
                    onTrack={goToTracking}
                    isCancelDialogOpen={isCancelDialogOpen}
                    setIsCancelDialogOpen={setIsCancelDialogOpen}
                    cancelReason={cancelReason}
                    setCancelReason={setCancelReason}
                    cancelNote={cancelNote}
                    setCancelNote={setCancelNote}
                    isCancelling={isCancelling}
                    onConfirmCancel={handleCancel}
                />

                {/* Main grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Cột trái: timeline + route */}
                    <div className="lg:col-span-2 space-y-6">
                        <OrderTimeline steps={timelineSteps} />
                        <OrderRouteCard order={order} />
                    </div>

                    {/* Cột phải: driver + fee */}
                    <div className="space-y-6">
                        <OrderDriverCard order={order} />
                        <OrderFeeCard order={order} />
                    </div>
                </div>
            </div>
        </div>
    )
}