import type { OrderItem } from "@/services/order/type"

// Sử dụng trực tiếp OrderItem làm chuẩn cho CustomerOrderType
export type CustomerOrderType = OrderItem

export const MOCK_CUSTOMER_ORDERS: CustomerOrderType[] = [

]