import { z } from "zod";

export const addressSchema = z.object({
    label: z.string().min(1, "Vui lòng nhập hoặc chọn nhãn địa chỉ"),
    contactName: z.string().min(2, "Tên người liên hệ phải có ít nhất 2 ký tự"),
    contactPhone: z.string().regex(/^(84|0[35789])([0-9]{8})$/, "Số điện thoại không hợp lệ"),
    fullAddress: z.string().min(5, "Địa chỉ chi tiết không được để trống"),
    isDefault: z.boolean(),
    lat: z.number().min(-90, "địa chỉ không hợp lệ"),
    lng: z.number().min(-90, "địa chỉ không hợp lệ"),
});

export type AddressSchemaType = z.infer<typeof addressSchema>;