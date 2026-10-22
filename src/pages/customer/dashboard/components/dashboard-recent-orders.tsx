import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { OrderItem } from "@/demo_data_services/mockOrderService"
import TableOrders from "@/pages/customer/dashboard/components/data-table"

interface Props {
    orders: OrderItem[] | undefined
    isLoading: boolean
    onViewAll: () => void
    onViewDetail: (orderId: string) => void
    onCreateOrder: () => void
}

export function DashboardRecentOrders({
    onViewAll,
}: Props) {

    return (
        <div className=" rounded-3xl bg-transparent space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border/40 pb-1 mt-1">
                <div>
                    <h2 className="text-lg font-bold text-foreground">
                        Đơn hàng gần đây
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        Theo dõi và quản lý các đơn mới nhất của bạn
                    </p>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={onViewAll}
                    className="gap-1.5 rounded-xl border-border/50 hover:bg-accent font-semibold text-xs"
                >
                    <span>Xem tất cả đơn hàng</span>
                    <ArrowRight className="size-3.5" />
                </Button>
            </div>

            {/* Table */}
            <TableOrders />
        </div>
    )
}