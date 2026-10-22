import TableOrders from "@/pages/customer/order/manager/components/data-table-orders"
import { useTableOrders } from "./hooks/use-table-orders"

export default function CustomerOrdersPage() {
    const { orders, totalPages } = useTableOrders()

    return (
        <div className=" bg-muted/30  text-foreground">
            <div className="">
                <TableOrders data={orders} pageCount={totalPages} />
            </div>
        </div>
    )
}