import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

// ==================== ZOD SCHEMA ====================
export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
    newPassword: z
        .string()
        .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
        .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ cái in hoa")
        .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 chữ số"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu mới"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
})

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>

// ==================== HÀM TÍNH ĐỘ MẠNH MẬT KHẨU ====================
export function calculatePasswordStrength(password: string) {
    if (!password) return { score: 0, label: "Trống", color: "bg-muted" }
    let score = 0
    if (password.length >= 6) score += 1
    if (password.length >= 10) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    if (score <= 2) return { score: 1, label: "Yếu", color: "bg-destructive" }
    if (score <= 3) return { score: 2, label: "Trung bình", color: "bg-amber-500" }
    if (score <= 4) return { score: 3, label: "Khá mạnh", color: "bg-blue-500" }
    return { score: 4, label: "Rất mạnh", color: "bg-emerald-500" }
}

export function useDriverChangePassword() {
    const form = useForm<ChangePasswordSchemaType>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    const { watch, reset } = form
    const newPasswordValue = watch("newPassword")
    const strength = calculatePasswordStrength(newPasswordValue)

    // Mutation đổi mật khẩu (Mock API)
    const changePasswordMutation = useMutation({
        mutationFn: async (data: ChangePasswordSchemaType) => {
            await new Promise((r) => setTimeout(r, 600)) // Giả lập độ trễ mạng
            // Kiểm tra mật khẩu hiện tại giả lập trong localStorage hoặc mặc định "Password@123"
            if (data.currentPassword === "wrong") {
                throw new Error("Mật khẩu hiện tại không chính xác!")
            }
            return true
        },
        onSuccess: () => {
            toast.success("Đổi mật khẩu thành công! Vui lòng sử dụng mật khẩu mới cho lần đăng nhập sau.")
            reset()
        },
        onError: (err: any) => {
            toast.error(err?.message || "Không thể đổi mật khẩu. Vui lòng thử lại!")
        },
    })

    const onSubmit = form.handleSubmit((data) => {
        changePasswordMutation.mutate(data)
    })

    return {
        form,
        onSubmit,
        strength,
        isChanging: changePasswordMutation.isPending,
    }
}