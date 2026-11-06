import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { loginSchema, type LoginShemaType } from "@/lib/schemas/auth/login";
import { authApi } from "@/services/auth/auth-api";
import type { LoginResponse } from "@/services/auth/type";

const ACTIVE_USER_EMAIL_KEY = "shiptrack_active_email";

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
        mutationFn: (credentials: LoginShemaType) => authApi.login(credentials),
        onSuccess: (data: LoginResponse, credentials) => {
            const emailKey = (data.email || credentials.email).toLowerCase().trim();

            // 1. Đặt tài khoản này làm active hiện tại riêng cho Tab này (dùng sessionStorage)
            sessionStorage.setItem(ACTIVE_USER_EMAIL_KEY, emailKey);

            // 2. Lưu độc lập theo namespaced key vào sessionStorage của Tab hiện tại
            sessionStorage.setItem(`accessToken_${emailKey}`, data.access_token);
            sessionStorage.setItem(`refreshToken_${emailKey}`, data.refresh_token);
            sessionStorage.setItem(`role_${emailKey}`, data.role);
            sessionStorage.setItem(
                `shiptrack_current_user_${emailKey}`,
                JSON.stringify({
                    id: String(data.user_id),
                    fullName: data.name,
                    email: data.email,
                    phone: data.phone,
                    role: data.role.toUpperCase(),
                    licensePlate: data.license_plate,
                })
            );

            toast.success(`Đăng nhập thành công! Chào mừng ${data.name}`);
            const checkRole = data.role.toUpperCase();

            // 3. Điều hướng dựa theo role
            if (checkRole === "ADMIN") {
                navigate("/manager/dashboard");
            } else if (["DRIVER_EXPRESS", "DRIVER_TRUCK", "DRIVER_CONTAINER"].includes(checkRole)) {
                navigate("/driver/dashboard");
            } else {
                navigate("/customer/dashboard");
            }
        },
        onError: (error: any) => {
            console.log("Login error:", error);
            const errorMessage = error?.response?.data?.message || error?.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại!";
            toast.error(errorMessage);
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