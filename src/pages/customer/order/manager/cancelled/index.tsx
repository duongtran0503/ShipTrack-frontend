import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton"
import TableOrders from "@/pages/customer/order/manager/components/data-table-orders"
import { useTableOrders } from "@/pages/customer/order/manager/hooks/use-table-orders"
export default function CancelledOrderPage() {
    const { orders, totalPages, isLoadingTable } = useTableOrders({ orderStatus: "CANCELLED" })

    if (isLoadingTable && orders.length === 0) {
        return (
            <DataTableSkeleton />
        )
    }

    return <TableOrders data={orders} pageCount={totalPages} />
}