import { ArrowLeft, Calendar, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { OrderItem } from "@/demo_data_services/mockOrderService"
import { CancelOrderDialog } from "./cancel-order-dialog"
import { OrderDetailStatusBadge } from "./order-status-badge"

interface Props {
    order: OrderItem
    canCancel: boolean
    isDelivering: boolean
    onBack: () => void
    onTrack: () => void
    // Cancel dialog props
    isCancelDialogOpen: boolean
    setIsCancelDialogOpen: (open: boolean) => void
    cancelReason: string
    setCancelReason: (v: string | null) => void
    cancelNote: string
    setCancelNote: (v: string) => void
    isCancelling: boolean
    onConfirmCancel: () => void
}

export function OrderDetailHeader({
    order,
    canCancel,
    isDelivering,
    onBack,
    onTrack,
    isCancelDialogOpen,
    setIsCancelDialogOpen,
    cancelReason,
    setCancelReason,
    cancelNote,
    setCancelNote,
    isCancelling,
    onConfirmCancel,
}: Props) {
    return (
        <Card className="rounded-3xl border-border/60 shadow-lg">
            <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBack}
                        className="gap-1.5 text-xs text-muted-foreground hover:text-primary p-0 h-auto cursor-pointer"
                    >
                        <ArrowLeft className="size-3.5" /> Danh sách đơn hàng
                    </Button>

                    <div className="flex items-center gap-3 pt-1">
                        <h1 className="text-2xl font-black text-foreground font-mono">
                            {order.trackingCode}
                        </h1>
                        <OrderDetailStatusBadge status={order.status} />
                    </div>

                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="size-3.5" /> Ngày tạo: {order.createdAt}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {isDelivering && (
                        <Button
                            onClick={onTrack}
                            className="animate-btn-gradient btn-shine text-white font-bold rounded-2xl shadow-md border-none cursor-pointer"
                        >
                            <MapPin className="size-4 mr-2" />
                            Theo dõi Real-time
                        </Button>
                    )}

                    {canCancel && (
                        <CancelOrderDialog
                            trackingCode={order.trackingCode}
                            open={isCancelDialogOpen}
                            onOpenChange={setIsCancelDialogOpen}
                            reason={cancelReason}
                            onReasonChange={setCancelReason}
                            note={cancelNote}
                            onNoteChange={setCancelNote}
                            isPending={isCancelling}
                            onConfirm={onConfirmCancel}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    )
}