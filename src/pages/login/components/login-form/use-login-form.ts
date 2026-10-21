import { mockAuthService } from "@/demo_data_services/mockAuthService"; // Hoặc import từ apiFetch nếu ghép backend sau này
import { loginSchema, type LoginShemaType } from "@/lib/schemas/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginShemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginShemaType) => {
            // Tạm thời gọi từ Mock Service (khi có Backend thật chỉ cần đổi lại dùng apiFetch)
            return await mockAuthService.login(credentials.email);
        },
        onSuccess: (data) => {
            toast.success(`Xin chào ${data.username}! Đăng nhập thành công.`);

            // Lưu Tokens & Role vào localStorage
            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("refresh-token", data.refreshToken);
            localStorage.setItem("role", data.role);

            // Phân quyền điều hướng theo Role
            switch (data.role) {
                case "SUPER_ADMIN":
                    navigate("/manager/dashboard");
                    break;
                case "DRIVER":
                    navigate("/driver/dashboard");
                    break;
                case "CUSTOMER":
                    navigate("/customer/dashboard");
                    break;
                default:
                    navigate("/");
                    break;
            }
        },
        onError: (error: unknown) => {
            const erroRes = error as { message?: string };
            toast.error(erroRes.message || "Xảy ra lỗi khi đăng nhập");
        },
    });

    const onSubmit = (data: LoginShemaType) => {
        loginMutation.mutate(data);
    };

    return {
        control,
        handleSubmit,
        errors,
        isPending: loginMutation.isPending,
        onSubmit,
        showPassword,
        setShowPassword,
    };
};