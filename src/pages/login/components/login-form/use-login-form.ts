import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { loginSchema, type LoginShemaType } from "@/lib/schemas/auth/login";
import { authApi } from "@/services/auth/auth-api";
import type { LoginResponse } from "@/services/auth/type";

const TOKEN_STORAGE_KEY = "accessToken";
const REFRESH_TOKEN_STORAGE_KEY = "refreshToken";
const USER_ROLE_STORAGE_KEY = "role";
const CURRENT_USER_STORAGE_KEY = "shiptrack_current_user";

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

    // Thay thế mockApi bằng authApi.login thật
    const loginMutation = useMutation({
        mutationFn: (credentials: LoginShemaType) => authApi.login(credentials),
        onSuccess: (data: LoginResponse) => {
            // 1. Lưu token và thông tin người dùng vào localStorage từ response của API thực tế
            localStorage.setItem(TOKEN_STORAGE_KEY, data.access_token);
            localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, data.refresh_token);
            localStorage.setItem(USER_ROLE_STORAGE_KEY, data.role);
            localStorage.setItem(
                CURRENT_USER_STORAGE_KEY,
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

            // 2. Điều hướng dựa theo role trả về từ backend thực tế
            if (data.role === "admin") {
                navigate("/manager/dashboard");
            } else if (data.role === "driver") {
                navigate("/driver/dashboard");
            } else {
                navigate("/customer/dashboard");
            }
        },
        onError: (error: any) => {
            console.log("ldskjflwsadkfj", error)
            const errorMessage =
                "Đăng nhập thất bại. Vui lòng kiểm tra lại!";
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