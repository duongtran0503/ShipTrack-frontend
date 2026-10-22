import TableOrders from "@/pages/customer/dashboard/components/data-table/table-order"
import { useTableOrders } from "@/pages/customer/order/manager/hooks/use-table-orders"

export default function OrdersPage() {
    const { orders, totalPages } = useTableOrders()


    return <TableOrders data={orders} pageCount={totalPages} />
}