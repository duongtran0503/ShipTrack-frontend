import { CustomerInfoCard } from "@/pages/driver/order/available/components/customer-info-card";
import { OrderDetailHeader } from "@/pages/driver/order/available/components/order-detail-header";
import { OrderErrorState } from "@/pages/driver/order/available/components/order-error-state";
import { OrderItemsCard } from "@/pages/driver/order/available/components/order-items-card";
import { RouteMapCard } from "@/pages/driver/order/available/components/route-map-card";
import { RouteTimeline } from "@/pages/driver/order/available/components/route-timeline";
import { useAvailableOrderDetail } from "@/pages/driver/order/available/hooks/use-available-order-detail";
import { Loader2 } from "lucide-react";

export default function AvailableOrderDetailPage() {
    const {
        order,
        isLoading,
        error,
        acceptOrder,
        isAccepting,
        handleReject,
        goBack,
    } = useAvailableOrderDetail();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải chi tiết đơn hàng...
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

    return (
        <div className="space-y-6 pb-12">
            {/* Header + Banner phí */}
            <OrderDetailHeader
                trackingCode={order.trackingCode}
                shippingFee={order.shippingFee}
                isAccepting={isAccepting}
                onAccept={() => acceptOrder(order.id)}
                onReject={handleReject}
                onGoBack={goBack}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cột trái (2 span): Lộ trình & Bản đồ */}
                <div className="md:col-span-2 space-y-6">
                    <RouteTimeline
                        pickupAddress={order.pickupAddress}
                        dropoffAddress={order.dropoffAddress}
                        pickupTime={order.pickupTime}
                        distanceKm={order.distanceKm}
                        estimatedMinutes={order.estimatedMinutes}
                    />
                    <RouteMapCard

                    />
                </div>

                {/* Cột phải (1 span): Hàng hóa & Khách hàng */}
                <div className="md:col-span-1 space-y-6">
                    <OrderItemsCard
                        itemDescription={order.itemDescription}
                        itemWeight={order.itemWeight}
                        noteForDriver={order.noteForDriver}
                    />
                    <CustomerInfoCard
                        customerName={order.customerName}
                        customerPhone={order.customerPhone}
                    />
                </div>
            </div>
        </div>
    );
}