import { mockAuthService } from "@/demo_data_services/mockAuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

// 1. Định nghĩa Schema xác thực bằng Zod
export const resetPasswordSchema = z
    .object({
        password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirmPassword"],
    });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

// 2. Custom Hook quản lý trạng thái và logic
export function useResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Lấy token bảo mật từ URL query params hoặc dự phòng từ localStorage
    const token = searchParams.get("token") || localStorage.getItem("shiptrack_reset_token") || "";

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { password: "", confirmPassword: "" },
    });

    const resetMutation = useMutation({
        mutationFn: (data: ResetPasswordSchemaType) =>
            mockAuthService.resetPassword(data.password, token),
        onSuccess: (res) => {
            toast.success(res.message);
            navigate("/login");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Đặt lại mật khẩu thất bại!");
        },
    });

    const onSubmit = (data: ResetPasswordSchemaType) => {
        if (!token) {
            toast.error("Thiếu mã xác nhận! Vui lòng thực hiện lại từ trang Quên mật khẩu.");
            return;
        }
        resetMutation.mutate(data);
    };

    return {
        control,
        errors,
        showPassword,
        showConfirmPassword,
        isPending: resetMutation.isPending,
        toggleShowPassword: () => setShowPassword((prev) => !prev),
        toggleShowConfirmPassword: () => setShowConfirmPassword((prev) => !prev),
        onSubmit: handleSubmit(onSubmit),
    };
}
