import { ProfilePasswordForm } from "@/pages/customer/profile/change-password/components/profile-password-form";
import { useChangePassword } from "@/pages/customer/profile/change-password/hooks/use-form-change-password";

export default function ChangePasswordPage() {
    const { passwordForm, onChangePassword, isChangingPassword } = useChangePassword()
    return <div className="flex justify-center ">
        <div className="w-fit flex justify-center items-center ">
            <ProfilePasswordForm
                form={passwordForm}
                onSubmit={onChangePassword}
                isPending={isChangingPassword}
            />
        </div>
    </div>
}