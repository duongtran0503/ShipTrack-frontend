import { z } from "zod";

export const registerSchema = z
    .object({
        fullName: z.string().min(2, "Họ và tên phải có ít nhất 2 ký tự"),
        email: z.string().email("Email không hợp lệ"),
        phone: z
            .string()
            // Đã sửa Regex: Bỏ dấu | dư thừa trong []
            .regex(/^(84|0[35789])([0-9]{8})$/, "Số điện thoại không hợp lệ"),
        password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
        confirmPassword: z.string(),
        role: z.enum(["CUSTOMER", "DRIVER"]),


        licenseNumber: z.string(),
        vehicleType: z.string(),
        licensePlate: z.string(),


        acceptTerms: z.literal(true, {
            message: "Bạn phải đồng ý với Điều khoản & Dịch vụ",
        }),

    })
    .superRefine((data, ctx) => {
        // 1. Validate khớp mật khẩu
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Mật khẩu xác nhận không khớp",
                path: ["confirmPassword"],
            });
        }

        // 2. Validate bắt buộc nhập thông tin Driver khi role = "DRIVER"
        if (data.role === "DRIVER") {
            // Đã thêm Check an toàn (?.) trước khi dùng .trim() phòng hờ dữ liệu undefined
            if (!data.licenseNumber.trim() || data.licenseNumber.trim().length < 5) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Số bằng lái xe không được để trống và phải có ít nhất 5 ký tự",
                    path: ["licenseNumber"],
                });
            }
            if (!data.vehicleType?.trim()) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Vui lòng chọn loại phương tiện",
                    path: ["vehicleType"],
                });
            }
            if (!data.licensePlate?.trim() || data.licensePlate.trim().length < 4) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Biển số xe không hợp lệ",
                    path: ["licensePlate"],
                });
            }
        }
    });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
