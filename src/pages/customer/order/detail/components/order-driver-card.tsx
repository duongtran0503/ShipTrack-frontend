import { Bike, Clock, PhoneCall, Star } from "lucide-react"

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import DriverRatingDialog from "@/pages/customer/order/detail/components/driver-rating-dialog"
import { toast } from "sonner"

interface Props {
    order: any
}

export function OrderDriverCard({ order }: Props) {
    // Xác định xem đã có tài xế hoặc đơn đã qua giai đoạn tìm kiếm chưa
    const hasAssignedDriver =
        Boolean(order?.driverName) ||
        order?.status === "DRIVER_ASSIGNED" ||
        order?.status === "PICKED_UP" ||
        order?.status === "DELIVERING" ||
        order?.status === "COMPLETED"

    return (
        <Card className="rounded-3xl border-border/60 shadow-md">
            <CardHeader className="pb-3 border-b border-border/60">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Bike className="size-5 text-primary" />
                    <span>Tài xế phụ trách</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-5 space-y-4">
                {hasAssignedDriver ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="size-12 border-2 border-primary/20">
                                <AvatarFallback className="bg-primary text-white font-bold">
                                    {order.driverName ? order.driverName.charAt(0) : "T"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-0.5">
                                <h3 className="text-sm font-bold text-foreground">
                                    {order.driverName || "Tài xế hệ thống"}
                                </h3>
                                <p className="text-xs text-muted-foreground font-medium">
                                    SĐT: {order.driverPhone || "Đang cập nhật..."}
                                </p>
                                <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold pt-0.5">
                                    <Star className="size-3.5 fill-amber-500" />
                                    <span>4.9 / 5.0 (120 đơn)</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-muted/40 text-xs space-y-2 border border-border/50">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Phương tiện:</span>
                                <span className="font-bold">{order.vehicleType || "Xe máy giao hàng"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Biển số xe:</span>
                                <span className="font-bold text-primary font-mono">
                                    {order.driverLicensePlate || "59-X1 888.88"}
                                </span>
                            </div>
                        </div>

                        {order.status === "COMPLETED" && (
                            <DriverRatingDialog
                                order={order}
                                triggerBtn={
                                    <Button variant="outline" className="w-full rounded-2xl font-bold text-xs border-amber-500/40 text-amber-600 hover:bg-amber-500/10 h-10">
                                        <Star className="size-3.5 mr-1.5 fill-amber-500" />
                                        Đánh giá tài xế
                                    </Button>
                                }
                            />
                        )}

                        <Button
                            onClick={() => {
                                if (order.driverPhone) {
                                    window.location.href = `tel:${order.driverPhone}`
                                } else {
                                    toast.error("Số điện thoại tài xế đang cập nhật")
                                }
                            }}
                            className="w-full rounded-2xl gap-2 font-bold text-xs h-10 border-primary/30 text-primary bg-primary/10 hover:bg-primary/20 cursor-pointer"
                        >
                            <PhoneCall className="size-3.5" />
                            <span>Gọi điện cho tài xế</span>
                        </Button>
                    </div>
                ) : (
                    <div className="py-6 text-center space-y-2">
                        <Clock className="size-8 text-amber-500 mx-auto animate-pulse" />
                        <p className="text-xs font-semibold text-foreground">
                            {order?.status === "PENDING" ? "Đang chờ xác nhận đơn hàng..." : "Đang tự động kết nối tài xế..."}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                            Hệ thống đang tìm kiếm tài xế ở khu vực gần nhất cho đơn hàng này.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}