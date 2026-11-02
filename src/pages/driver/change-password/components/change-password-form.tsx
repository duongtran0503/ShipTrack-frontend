import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PasswordInput } from "@/pages/driver/change-password/components/password-input";
import { KeyRound, Loader2, Save, ShieldAlert } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { ChangePasswordSchemaType, calculatePasswordStrength } from "../hooks/use-driver-change-password";
import { PasswordStrength as StrengthBar } from "./password-strength";

interface Props {
    form: UseFormReturn<ChangePasswordSchemaType>;
    onSubmit: (e: React.BaseSyntheticEvent) => void;
    strength: ReturnType<typeof calculatePasswordStrength>;
    isChanging: boolean;
}

export function ChangePasswordForm({ form, onSubmit, strength, isChanging }: Props) {
    const { register, formState: { errors } } = form;

    return (
        <Card className="rounded-[24px] border-border/50 shadow-sm bg-card">
            <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <KeyRound className="size-5 text-primary" />
                    <span>Bảo mật tài khoản</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
                <form onSubmit={onSubmit} className="space-y-5">
                    <PasswordInput
                        label="Mật khẩu hiện tại"
                        placeholder="Nhập mật khẩu hiện tại"
                        registration={register("currentPassword")}
                        error={errors.currentPassword}
                    />

                    <div className="space-y-2">
                        <PasswordInput
                            label="Mật khẩu mới"
                            placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự, có chữ hoa và số)"
                            registration={register("newPassword")}
                            error={errors.newPassword}
                        />
                        <StrengthBar strength={strength} />
                    </div>

                    <PasswordInput
                        label="Xác nhận mật khẩu mới"
                        placeholder="Nhập lại mật khẩu mới"
                        registration={register("confirmPassword")}
                        error={errors.confirmPassword}
                    />

                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                        <ShieldAlert className="size-5 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                            Sau khi đổi mật khẩu thành công, các phiên đăng nhập trên thiết bị khác có thể cần được xác thực lại để đảm bảo an toàn.
                        </p>
                    </div>

                    <div className="pt-2 flex justify-end">
                        <Button
                            type="submit"
                            disabled={isChanging}
                            className="h-11 px-8 rounded-full bg-[#710105] hover:bg-[#580104] text-white font-bold text-sm shadow-md animate-btn-gradient btn-shine cursor-pointer flex items-center gap-2"
                        >
                            {isChanging ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    <span>Đang xử lý...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="size-4" />
                                    <span>Đổi mật khẩu</span>
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}