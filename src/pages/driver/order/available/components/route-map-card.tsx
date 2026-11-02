import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderMapView } from "./order-map-view"; // Import từ file gốc của bạn



export function RouteMapCard() {
    return (
        <Card className="rounded-[24px] border-border/50 shadow-sm bg-card overflow-hidden">
            <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40">
                <CardTitle className="text-base font-bold text-foreground">
                    Bản đồ lộ trình & Địa chỉ người nhận
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <OrderMapView
                    driverCoords={[10.762622, 106.660172]} // Toạ độ tài xế (Lấy từ SignalR realtime)
                    pickupCoords={[10.7769, 106.7009]}     // Toạ độ lấy hàng (Từ Order)
                    dropoffCoords={[10.7829, 106.6852]}    // Toạ độ giao hàng (Từ Order)
                    pickupAddress="Kho Tổng Q.1"
                    dropoffAddress="123 Nguyễn Thị Minh Khai, Q.3"
                />
            </CardContent>
        </Card>
    );
}