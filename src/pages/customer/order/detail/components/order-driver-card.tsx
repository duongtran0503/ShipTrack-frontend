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
import type { OrderItem } from "@/demo_data_services/mockOrderService"
import DriverRatingDialog from "@/pages/customer/order/detail/components/driver-rating-dialog"

interface Props {
    order: OrderItem
}

export function OrderDriverCard({ order }: Props) {
    return (
        <Card className="rounded-3xl border-border/60 shadow-md">
            <CardHeader className="pb-3 border-b border-border/60">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Bike className="size-5 text-primary" />
                    <span>Tài xế phụ trách</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-5 space-y-4">
                {order.driverName ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="size-12 border-2 border-primary/20">
                                <AvatarFallback className="bg-primary text-white font-bold">
                                    {order.driverName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-0.5">
                                <h3 className="text-sm font-bold text-foreground">
                                    {order.driverName}
                                </h3>
                                <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                                    <Star className="size-3.5 fill-amber-500" />
                                    <span>4.9 / 5.0 (120 đơn)</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 rounded-2xl bg-muted/40 text-xs space-y-1.5 border border-border/50">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Phương tiện:</span>
                                <span className="font-bold">Xe Máy Honda Wave</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Biển số xe:</span>
                                <span className="font-bold text-primary font-mono">
                                    59-X1 888.88
                                </span>
                            </div>
                        </div>
                        {order.status === "COMPLETED" && (
                            <DriverRatingDialog
                                order={order}
                                triggerBtn={
                                    <Button variant="outline" className="rounded-2xl font-bold text-xs border-amber-500/40 text-amber-600 hover:bg-amber-500/10">
                                        <Star className="size-3.5 mr-1.5 fill-amber-500" />
                                        Đánh giá tài xế
                                    </Button>
                                }
                            />
                        )}

                        <Button
                            variant="outline"
                            className="w-full rounded-2xl gap-2 font-bold text-xs h-10 border-primary/30 text-primary"
                        >
                            <PhoneCall className="size-3.5" />
                            <span>Gọi điện cho tài xế</span>
                        </Button>
                    </div>
                ) : (
                    <div className="py-6 text-center space-y-2">
                        <Clock className="size-8 text-amber-500 mx-auto animate-pulse" />
                        <p className="text-xs font-semibold text-foreground">
                            Đang tự động kết nối tài xế...
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                            Hệ thống đang tìm kiếm tài xế ở khu vực gần nhất.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}