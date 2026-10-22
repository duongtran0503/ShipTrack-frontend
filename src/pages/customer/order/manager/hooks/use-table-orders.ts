import { useMemo } from "react"
import { useSearchParams } from "react-router"
import {
    MOCK_CUSTOMER_ORDERS,
    type CustomerOrderType,
} from "../components/data-table-orders/type"

export const useTableOrders = () => {
    const [searchParams] = useSearchParams()
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("per_page")) || 10
    const keyword = searchParams.get("trackingCode")?.toLowerCase() ?? ""
    const statusParam = searchParams.get("status")

    const ordersData = useMemo(() => {
        const stored = localStorage.getItem("shiptrack_customer_orders")
        return stored ? (JSON.parse(stored) as CustomerOrderType[]) : MOCK_CUSTOMER_ORDERS
    }, [])

    const filtered = useMemo(() => {
        let result = [...ordersData]

        // Lọc theo keyword (Mã đơn hoặc Tên hàng)
        if (keyword) {
            result = result.filter(
                (o) =>
                    o.trackingCode.toLowerCase().includes(keyword) ||
                    o.packageName.toLowerCase().includes(keyword)
            )
        }

        // Lọc theo trạng thái
        if (statusParam) {
            const statusValues = statusParam.split(".")
            result = result.filter((o) => statusValues.includes(o.status))
        }

        return result
    }, [ordersData, keyword, statusParam])

    const totalItems = filtered.length
    const totalPages = Math.max(1, Math.ceil(totalItems / limit))
    const start = (page - 1) * limit
    const paginated = filtered.slice(start, start + limit)

    return {
        orders: paginated,
        totalPages,
        totalItems,
        isLoadingTable: false,
    }
}