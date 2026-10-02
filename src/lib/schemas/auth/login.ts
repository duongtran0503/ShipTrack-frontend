import z from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Vui lòng nhập tên đăng nhập hoặc email."),
    password: z
        .string()
        .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự."),
});

export type LoginShemaType = z.infer<typeof loginSchema>;