import { z } from "zod";

export const addressSchema = z.object({
    label: z.string().min(2, "Nhãn địa chỉ phải có ít nhất 2 ký tự (Ví dụ: Nhà riêng)"),
    contactName: z.string().min(2, "Họ tên người liên hệ không được để trống"),
    contactPhone: z
        .string()
        .regex(/^(84|0[35789])([0-9]{8})$/, "Số điện thoại không hợp lệ"),
    fullAddress: z.string().min(8, "Vui lòng nhập địa chỉ chi tiết (số nhà, đường, quận/huyện)"),
    isDefault: z.boolean(),
});

export type AddressSchemaType = z.infer<typeof addressSchema>;