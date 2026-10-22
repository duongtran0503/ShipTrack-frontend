import { useOrderTracking } from "@/pages/customer/order/order-tracking/hooks/use-order-tracking"
import { TrackingAddressCard } from "./components/tracking-address-card"
import { TrackingDriverCard } from "./components/tracking-driver-card"
import { TrackingHeader } from "./components/tracking-header"
import { TrackingMapCard } from "./components/tracking-map-card"

export default function OrderTrackingPage() {
    const {
        order,
        driverLoc,
        isConnected,
        goBackToDetail,
        goToDashboard,
    } = useOrderTracking()

    return (
        <div className=" bg-muted/30 text-foreground space-y-6">
            <div className="space-y-4">
                {/* Header */}
                <TrackingHeader
                    trackingCode={order?.trackingCode}
                    isConnected={isConnected}
                    onBack={goBackToDetail}
                    onGoDashboard={goToDashboard}
                />

                {/* Main grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Cột trái: bản đồ */}
                    <div className="lg:col-span-2 space-y-4">
                        <TrackingMapCard
                            etaMinutes={driverLoc.etaMinutes}
                            distanceKmLeft={driverLoc.distanceKmLeft}
                        />
                    </div>

                    {/* Cột phải: tài xế + địa chỉ */}
                    <div className="space-y-6">
                        <TrackingDriverCard
                            driverName={order?.driverName}
                            onCall={() => console.log("Call driver")}
                        />

                        <TrackingAddressCard
                            receiverAddress={order?.receiverAddress}
                            receiverName={order?.receiverName}
                            receiverPhone={order?.receiverPhone}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}