import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
    mockAuthService,
    type MockUser,
} from "@/demo_data_services/mockAuthService"
import {
    changePasswordSchema,
    profileSchema,
    type ChangePasswordSchemaType,
    type ProfileSchemaType,
} from "@/lib/schemas/user/profile"

export type ProfileTab = "info" | "password"

export function useProfile() {
    // ==================== STATE ====================
    const [currentUser, setCurrentUser] = useState<MockUser | null>(
        mockAuthService.getCurrentUser()
    )
    const [activeTab, setActiveTab] = useState<ProfileTab>("info")

    // ==================== INFO FORM ====================
    const infoForm = useForm<ProfileSchemaType>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: currentUser?.fullName || "",
            email: currentUser?.email || "",
            phone: currentUser?.phone || "",
            licenseNumber: currentUser?.licenseNumber || "",
            vehicleType: currentUser?.vehicleType || "MOTORBIKE",
            licensePlate: currentUser?.licensePlate || "",
        },
    })

    // ==================== PASSWORD FORM ====================
    const passwordForm = useForm<ChangePasswordSchemaType>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    // ==================== MUTATIONS ====================
    const updateProfileMutation = useMutation({
        mutationFn: (data: ProfileSchemaType) => mockAuthService.updateProfile(data),
        onSuccess: (res) => {
            toast.success(res.message)
            setCurrentUser(res.user)
        },
        onError: (error: Error) => {
            toast.error(error.message || "Cập nhật thông tin thất bại!")
        },
    })

    const changePasswordMutation = useMutation({
        mutationFn: (data: ChangePasswordSchemaType) =>
            mockAuthService.changePassword(data.oldPassword, data.newPassword),
        onSuccess: (res) => {
            toast.success(res.message)
            passwordForm.reset()
        },
        onError: (error: Error) => {
            toast.error(error.message || "Đổi mật khẩu thất bại!")
        },
    })

    // ==================== HANDLERS ====================
    const onUpdateInfo = infoForm.handleSubmit((data) => {
        updateProfileMutation.mutate(data)
    })

    const onChangePassword = passwordForm.handleSubmit((data) => {
        changePasswordMutation.mutate(data)
    })

    // ==================== RETURN ====================
    return {
        // State
        currentUser,
        activeTab,
        setActiveTab,

        // Info form
        infoForm,
        onUpdateInfo,
        isUpdatingProfile: updateProfileMutation.isPending,

        // Password form
        passwordForm,
        onChangePassword,
        isChangingPassword: changePasswordMutation.isPending,

        // Helpers
        isDriver: currentUser?.role === "DRIVER",
        avatarInitial: currentUser?.fullName?.charAt(0).toUpperCase() || "U",
        displayName: currentUser?.fullName || "Người dùng ShipTrack",
    }
}