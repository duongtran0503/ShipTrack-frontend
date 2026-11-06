import { useOrderTracking } from "@/pages/customer/order/order-tracking/hooks/use-order-tracking"
import { Loader2 } from "lucide-react"
import { TrackingAddressCard } from "./components/tracking-address-card"
import { TrackingDriverCard } from "./components/tracking-driver-card"
import { TrackingHeader } from "./components/tracking-header"
import { TrackingMapCard } from "./components/tracking-map-card"

export default function OrderTrackingPage() {
    const {
        order,
        isLoading,
        isConnected,
        goBackToDetail,
        goToDashboard,
    } = useOrderTracking()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải thông tin đơn hàng từ hệ thống...
            </div>
        )
    }

    return (
        <div className="bg-muted/30 text-foreground space-y-6">
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
                    {/* Cột trái: Sơ đồ lộ trình tuyến đường (UI tĩnh không cần giả lập map) */}
                    <div className="lg:col-span-2 space-y-4">
                        <TrackingMapCard
                            senderAddress={order?.senderAddress}
                            receiverAddress={order?.receiverAddress}
                            distanceKm={order?.distanceKm}
                            status={order?.status}
                        />
                    </div>

                    {/* Cột phải: tài xế + địa chỉ nhận hàng */}
                    <div className="space-y-6">
                        <TrackingDriverCard
                            driverName={order?.driverName}
                            driverPhone={order?.driverPhone}
                            driverLicensePlate={order?.driverLicensePlate}
                            onCall={() => {
                                if (order?.driverPhone) {
                                    window.location.href = `tel:${order.driverPhone}`
                                }
                            }}
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