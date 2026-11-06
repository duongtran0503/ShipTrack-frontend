import { orderApi } from "@/services/order/order-api"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import type { CustomerOrderType } from "../components/data-table-orders/type"

interface Props {
    orderStatus?: string
}

export const useTableOrders = (props?: Props) => {
    const [searchParams] = useSearchParams()
    const orderStatus = props?.orderStatus
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
        staleTime: 0,
    })

    // Map dữ liệu từ response của API sang đúng kiểu OrderItem / CustomerOrderType đầy đủ
    const orders: CustomerOrderType[] = responseData?.data?.data?.map((item: any) => {
        // Trích xuất an toàn thông tin tài xế từ object hoặc string
        const driverObj = item.driver
        const driverName = typeof driverObj === "object" && driverObj !== null
            ? driverObj.name
            : (driverObj || item.driverName || undefined)
        const driverPhone = typeof driverObj === "object" && driverObj !== null
            ? driverObj.phone
            : (item.driverPhone || undefined)

        return {
            id: String(item.id),
            trackingCode: item.trackingCode,
            packageName: item.packageName || item.packageDetails || "",
            senderAddress: item.pickupAddress || "",
            pickupLat: item.pickupLat || 0,
            pickupLng: item.pickupLng || 0,
            senderName: item.senderName,
            senderPhone: item.senderPhone,
            receiverAddress: item.dropoffAddress || "",
            dropoffLat: item.dropoffLat || 0,
            dropoffLng: item.dropoffLng || 0,
            receiverName: item.receiverName || "",
            receiverPhone: item.receiverPhone || "",
            weightKg: item.weightKg || 0,
            shippingFee: item.shippingFee || item.totalPrice || 0,
            vehicleType: item.vehicleType || "MOTORBIKE",
            serviceType: item.serviceType || "STANDARD",
            paymentMethod: item.paymentMethod || "CASH",
            isBulky: Boolean(item.isBulky),
            isDoorDelivery: Boolean(item.isDoorDelivery),
            promotionCode: item.promotionCode,
            note: item.note,
            codAmount: item.codAmount || 0,
            distanceKm: item.distanceKm || 0,
            status: item.status,
            createdAt: item.createdAtUtc ? item.createdAtUtc.replace("T", " ").substring(0, 16) : "",
            driverName,
            driverPhone,
        }
    }) || []

    const totalItems = responseData?.data?.total_items || 0
    const totalPages = responseData?.data?.total_pages || 1

    return {
        orders,
        totalPages,
        totalItems,
        isLoadingTable,
    }
}