import { mockAuthService } from "@/demo_data_services/mockAuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

// 1. Định nghĩa Schema xác thực bằng Zod
export const forgotPasswordSchema = z.object({
    email: z.string().email("Địa chỉ email không hợp lệ"),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

// 2. Custom Hook chứa toàn bộ logic nghiệp vụ
export function useForgotPassword() {
    const navigate = useNavigate();
    const [isSent, setIsSent] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState("");

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordSchemaType>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const forgotMutation = useMutation({
        mutationFn: (data: ForgotPasswordSchemaType) =>
            mockAuthService.forgotPassword(data.email),
        onSuccess: (res, variables) => {
            toast.success(res.message);
            setSubmittedEmail(variables.email);
            setIsSent(true);
        },
        onError: (error: Error) => {
            toast.error(error.message || "Không thể gửi yêu cầu khôi phục!");
        },
    });

    const onSubmit = (data: ForgotPasswordSchemaType) => {
        forgotMutation.mutate(data);
    };

    const handleNavigateToReset = () => {
        const token = localStorage.getItem("shiptrack_reset_token") || "";
        navigate(`/reset-password?token=${token}`);
    };

    const handleBackToLogin = () => {
        navigate("/login");
    };

    return {
        control,
        errors,
        isSent,
        submittedEmail,
        isPending: forgotMutation.isPending,
        onSubmit: handleSubmit(onSubmit),
        handleNavigateToReset,
        handleBackToLogin,
    };
}
