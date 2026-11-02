import { orderApi } from "@/services/order/order-api"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import type { CustomerOrderType } from "../components/data-table-orders/type"
interface Props {
    orderStatus?: string
}
export const useTableOrders = (props?: Props) => {
    const [searchParams] = useSearchParams()
    const orderStatus = props?.orderStatus;
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("per_page")) || 10
    const keyword = searchParams.get("search") || searchParams.get("trackingCode") || ""
    const statusParam = searchParams.get("status") || orderStatus || ""

    // Gọi API thật qua TanStack Query
    const { data: responseData, isLoading: isLoadingTable } = useQuery({
        queryKey: ["customer_orders", page, limit, keyword, statusParam],
        queryFn: () =>
            orderApi.getOrders({
                page,
                itemPerpage: limit,
                search: keyword,
                status: statusParam,
            }),
        staleTime: 1000 * 60 * 2,
    })
    console.log("data:", responseData?.data.data)
    // Map dữ liệu từ response của API sang kiểu dữ liệu của bảng
    const orders: CustomerOrderType[] = responseData?.data?.data.map((item: any) => ({
        id: String(item.id),
        trackingCode: item.trackingCode,
        packageName: item.packageName || item.packageDetails,
        senderAddress: item.pickupAddress,
        receiverAddress: item.dropoffAddress,
        receiverName: item.receiverName,
        receiverPhone: item.receiverPhone,
        shippingFee: item.shippingFee || item.totalPrice || 0,
        status: item.status,
        createdAt: item.createdAtUtc ? item.createdAtUtc.replace("T", " ").substring(0, 16) : "",
        driverName: item.driver || undefined,
    })) || []

    const totalItems = responseData?.data?.total_items || 0
    const totalPages = responseData?.data?.total_pages || 1

    return {
        orders,
        totalPages,
        totalItems,
        isLoadingTable,
    }
}