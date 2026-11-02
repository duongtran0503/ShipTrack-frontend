import { z } from "zod";

export const createOrderSchema = z.object({
    // Địa chỉ & Tọa độ lấy hàng
    senderAddress: z.string().min(5, "Địa chỉ lấy hàng không được để trống"),
    // nhưng khi submit thì kiểm tra khác 0
    pickupLat: z.number().refine((val) => val !== 0, "Vui lòng chọn điểm lấy hàng trên bản đồ"),
    pickupLng: z.number().refine((val) => val !== 0, "Vui lòng chọn điểm lấy hàng trên bản đồ"),
    senderName: z.string().min(2, "Tên người gửi không được để trống"),
    senderPhone: z
        .string()
        .regex(/^(84|0[35789])([0-9]{8})$/, "Số điện thoại người gửi không hợp lệ"),

    // Địa chỉ & Tọa độ giao hàng
    dropoffAddress: z.string().min(5, "Địa chỉ giao hàng không được để trống"),
    dropoffLat: z.number().refine((val) => val !== 0, "Vui lòng chọn điểm giao hàng trên bản đồ"),
    dropoffLng: z.number().refine((val) => val !== 0, "Vui lòng chọn điểm giao hàng trên bản đồ"),
    receiverName: z.string().min(2, "Tên người nhận không được để trống"),
    receiverPhone: z
        .string()
        .regex(/^(84|0[35789])([0-9]{8})$/, "Số điện thoại người nhận không hợp lệ"),

    // Thông tin dịch vụ & gói hàng
    serviceType: z.string().min(1, "Vui lòng chọn loại dịch vụ"),
    packageDetails: z.string().min(2, "Chi tiết hàng hóa không được để trống"),
    weightKg: z.number({ message: "Vui lòng nhập khối lượng" }).min(0.1, "Khối lượng phải lớn hơn 0kg"),
    vehicleType: z.enum(["MOTORBIKE", "VAN", "TRUCK"]),

    // Tùy chọn thanh toán & giao hàng
    paymentMethod: z.string().min(1, "Vui lòng chọn phương thức thanh toán"),
    isBulky: z.boolean(),
    isDoorDelivery: z.boolean(),
    promotionCode: z.string().optional(),

    // Các trường bổ trợ tính toán
    note: z.string().optional(),
    codAmount: z.number({ message: "Vui lòng nhập tiền COD" }).min(0, "Số tiền COD phải lớn hơn hoặc bằng 0"),
    distanceKm: z.number().optional(),
    shippingFee: z.number().optional(),
});

export type CreateOrderSchemaType = z.infer<typeof createOrderSchema>;

export interface CreateOrderPayload {
    senderAddress: string;
    dropoffAddress: string;
    pickupLat: number;
    pickupLng: number;
    dropoffLat: number;
    dropoffLng: number;
    serviceType: string;
    senderName: string;
    senderPhone: string;
    receiverName: string;
    receiverPhone: string;
    packageDetails: string;
    weightKg: number;
    vehicleType: "MOTORBIKE" | "VAN" | "TRUCK";
    paymentMethod: string;
    isBulky: boolean;
    isDoorDelivery: boolean;
    promotionCode?: string;
    note?: string;
    codAmount: number;
    distanceKm?: number;
    shippingFee?: number;
}