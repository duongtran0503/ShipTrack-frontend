import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Controller } from "react-hook-form";

import LogoBrand from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useResetPassword } from "@/pages/reset-password/hooks/use-reset-password";

export default function ResetPasswordForm() {

    const {
        control,
        errors,
        showPassword,
        showConfirmPassword,
        isPending,
        toggleShowPassword,
        toggleShowConfirmPassword,
        onSubmit,
    } = useResetPassword();

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4 md:p-8 text-foreground">
            <div className="flex w-full max-w-4xl overflow-hidden rounded-3xl bg-card p-3 shadow-2xl border border-border/60 md:p-5 lg:p-6">

                {/* Bên trái: Form Reset Password */}
                <div className="flex w-full flex-col justify-between px-4 py-4 md:w-1/2 lg:px-6">
                    <LogoBrand />

                    <div className="my-auto space-y-6 py-6">
                        <div className="space-y-2 text-center md:text-left">
                            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                                Đặt lại mật khẩu
                            </h1>
                            <p className="text-sm font-medium text-muted-foreground">
                                Tạo mật khẩu mới cho tài khoản của bạn.
                            </p>
                        </div>

                        <form onSubmit={onSubmit} className="space-y-4">
                            {/* Mật khẩu mới */}
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <Field data-invalid={!!errors.password}>
                                        <FieldLabel className="sr-only">Mật khẩu mới</FieldLabel>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Mật khẩu mới"
                                                className="h-12 rounded-full border-border bg-muted/50 pl-5 pr-12 text-sm transition-all focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                                            />
                                            <button
                                                type="button"
                                                onClick={toggleShowPassword}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                                            >
                                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <FieldError className="px-3 text-xs text-destructive min-h-4">
                                                {errors.password.message}
                                            </FieldError>
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Nhập lại mật khẩu mới */}
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field }) => (
                                    <Field data-invalid={!!errors.confirmPassword}>
                                        <FieldLabel className="sr-only">Xác nhận mật khẩu</FieldLabel>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Nhập lại mật khẩu mới"
                                                className="h-12 rounded-full border-border bg-muted/50 pl-5 pr-12 text-sm transition-all focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                                            />
                                            <button
                                                type="button"
                                                onClick={toggleShowConfirmPassword}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                                            >
                                                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && (
                                            <FieldError className="px-3 text-xs text-destructive min-h-4">
                                                {errors.confirmPassword.message}
                                            </FieldError>
                                        )}
                                    </Field>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={isPending}
                                className="h-12 w-full rounded-full text-sm font-bold text-white transition-all animate-btn-gradient btn-shine shadow-lg shadow-primary/20 cursor-pointer border-none"
                            >
                                {isPending ? "Đang xử lý..." : "Cập nhật mật khẩu"}
                            </Button>
                        </form>
                    </div>

                    {/* Footer nhỏ chân trang */}
                    <div className="pt-2 text-center text-xs text-muted-foreground">
                        Hệ thống quản lý hành trình dữ liệu ShipTrack.
                    </div>
                </div>

                {/* Bên phải: Khối trang trí đồ họa đồng bộ */}
                <div className="hidden w-1/2 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 md:flex">
                    <div className="max-w-sm space-y-4 text-center">
                        <div className="inline-flex p-4 rounded-3xl bg-background shadow-xl text-primary">
                            <ShieldCheck className="size-10" />
                        </div>
                        <h3 className="font-bold text-lg text-foreground">Cập nhật an toàn</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Vui lòng thiết lập mật khẩu có độ dài tiêu chuẩn nhằm đảm bảo quyền riêng tư dữ liệu cá nhân của bạn không bị xâm phạm.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
