import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
    changePasswordSchema,
    type ChangePasswordSchemaType,
} from "@/lib/schemas/user/profile"
import { userApi } from "@/services/user/user-api"

export const useChangePassword = () => {
    // ==================== PASSWORD FORM ====================
    const passwordForm = useForm<ChangePasswordSchemaType>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    const changePasswordMutation = useMutation({
        mutationFn: (data: ChangePasswordSchemaType) => userApi.changePassword(data),
        onSuccess: (res) => {
            toast.success(res?.message || "Đổi mật khẩu thành công!")
            passwordForm.reset()
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || "Đổi mật khẩu thất bại!"
            toast.error(errorMessage)
        },
    })

    // ==================== HANDLERS ====================
    const onChangePassword = passwordForm.handleSubmit((data) => {
        changePasswordMutation.mutate(data)
    })

    // ==================== RETURN ====================
    return {
        // Password form
        passwordForm,
        onChangePassword,
        isChangingPassword: changePasswordMutation.isPending,
    }
}