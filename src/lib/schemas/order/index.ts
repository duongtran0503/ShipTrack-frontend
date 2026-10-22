import { z } from "zod";

export const createOrderSchema = z.object({
    // Địa chỉ lấy hàng
    senderAddress: z.string().min(5, "Địa chỉ lấy hàng không được để trống"),
    senderName: z.string().min(2, "Tên người gửi không được để trống"),
    senderPhone: z
        .string()
        .regex(/^(84|0[35789])([0-9]{8})$/, "Số điện thoại người gửi không hợp lệ"),

    // Địa chỉ giao hàng
    receiverAddress: z.string().min(5, "Địa chỉ giao hàng không được để trống"),
    receiverName: z.string().min(2, "Tên người nhận không được để trống"),
    receiverPhone: z
        .string()
        .regex(/^(84|0[35789])([0-9]{8})$/, "Số điện thoại người nhận không hợp lệ"),

    // Thông tin hàng hóa
    packageName: z.string().min(2, "Tên hàng hóa không được để trống"),
    weightKg: z.number().min(0.1, "Khối lượng phải lớn hơn 0kg"),
    vehicleType: z.enum(["MOTORBIKE", "VAN", "TRUCK"]),
    note: z.string().optional(),
    codAmount: z.number().min(0),
});

export type CreateOrderSchemaType = z.infer<typeof createOrderSchema>;