import { apiFetch } from "@/lib/config/axios";
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
            const response = await apiFetch.post("/auth/login", credentials);
            return response.data;
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success("Đăng nhập thành công!");


            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("refresh-token", data.refreshToken);


            navigate("/dashboard");
        },
        onError: (error: unknown) => {

            const erroRes = error as { message?: string }
            toast.error(erroRes.message || "Xảy ra lõi khi đăng nhập")
        },
    });

    const onSubmit = (data: LoginShemaType) => {
        console.log("data:", data)
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