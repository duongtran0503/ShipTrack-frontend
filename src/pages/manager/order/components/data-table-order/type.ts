import type { OrderItem } from "@/services/order/type";

// Kế thừa OrderItem để có đầy đủ các trường và thêm các trường riêng cho Admin nếu cần
export interface AdminOrderType extends OrderItem {
    driverName?: string;
    driverPhone?: string;
}