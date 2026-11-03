
import { LiveMapCard } from "@/pages/driver/order/active/components/live-map-card";
import { RouteCustomerCard } from "@/pages/driver/order/active/components/route-customer-card";
import { RouteDirectionsCard } from "@/pages/driver/order/active/components/route-directions-card";
import { RouteErrorState } from "@/pages/driver/order/active/components/route-error-state";
import { RouteHeaderBanner } from "@/pages/driver/order/active/components/route-header-banner";
import { useOrderRoute } from "@/pages/driver/order/active/hooks/use-order-route";
import { Loader2 } from "lucide-react";


export default function OrderRoutePage() {
    const {
        order,
        isLoading,
        error,
        goBack,
        openGoogleMapsDirections,
    } = useOrderRoute();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải dữ liệu bản đồ lộ trình OSRM...
            </div>
        );
    }

    if (error || !order) {
        return (
            <RouteErrorState
                message={error instanceof Error ? error.message : undefined}
                onGoBack={goBack}
            />
        );
    }

    return (
        <div className="w-full space-y-6 pb-16 px-2 sm:px-4">
            {/* Header & Banner khoảng cách */}
            <RouteHeaderBanner
                trackingCode={order.trackingCode}
                remainingDistanceKm={order.remainingDistanceKm}
                remainingMinutes={order.remainingMinutes}
                dropoffLat={order.dropoffLat}
                dropoffLng={order.dropoffLng}
                receiverAddress={order.receiverAddress}
                onGoBack={goBack}
                onOpenGoogleMaps={openGoogleMapsDirections}
            />

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cột trái (2 span): Bản đồ */}
                <div className="lg:col-span-2 space-y-6">
                    <LiveMapCard
                        senderAddress={order.senderAddress}
                        receiverAddress={order.receiverAddress}
                        driverCurrentLat={order.driverCurrentLat}
                        driverCurrentLng={order.driverCurrentLng}
                    />
                </div>

                {/* Cột phải (1 span): Chỉ đường & Khách hàng */}
                <div className="lg:col-span-1 space-y-6">
                    <RouteDirectionsCard
                        distanceKm={order.distanceKm}
                        dropoffLat={order.dropoffLat}
                        dropoffLng={order.dropoffLng}
                        receiverAddress={order.receiverAddress}
                        onOpenGoogleMaps={openGoogleMapsDirections}
                    />
                    <RouteCustomerCard
                        receiverName={order.receiverName}
                        receiverPhone={order.receiverPhone}
                    />
                </div>
            </div>
        </div>
    );
}