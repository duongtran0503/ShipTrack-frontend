import { z } from "zod";

export const profileSchema = z.object({
    fullName: z.string().min(2, "Họ và tên phải có ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    phone: z
        .string()
        .regex(/^(84|0[35789])([0-9]{8})$/, "Số điện thoại không hợp lệ"),
    licenseNumber: z.string().optional(),
    vehicleType: z.string().optional(),
    licensePlate: z.string().optional(),
});

export const changePasswordSchema = z
    .object({
        oldPassword: z.string().min(6, "Mật khẩu cũ phải có ít nhất 6 ký tự"),
        newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirmPassword"],
    });

export type ProfileSchemaType = z.infer<typeof profileSchema>;
export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;