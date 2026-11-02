import { ChangePasswordForm } from "./components/change-password-form";
import { useDriverChangePassword } from "./hooks/use-driver-change-password";

export default function DriverChangePasswordPage() {
    const { form, onSubmit, strength, isChanging } = useDriverChangePassword();

    return (
        <div className="w-full space-y-6 pb-10">

            <div className="flex justify-center w-full">
                <ChangePasswordForm
                    form={form}
                    onSubmit={onSubmit}
                    strength={strength}
                    isChanging={isChanging}
                />
            </div>
        </div>
    );
}