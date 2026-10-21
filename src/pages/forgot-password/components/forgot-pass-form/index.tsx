import { ArrowLeft, CheckCircle2, KeyRound, Mail } from "lucide-react";
import { Controller } from "react-hook-form";

import LogoBrand from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/pages/forgot-password/hooks/use-forgot-password";

export default function ForgotPasswordForm() {

    const {
        control,
        errors,
        isSent,
        submittedEmail,
        isPending,
        onSubmit,
        handleNavigateToReset,
        handleBackToLogin,
    } = useForgotPassword();

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4 md:p-8 text-foreground">
            <div className="flex w-full max-w-4xl overflow-hidden rounded-3xl bg-card p-3 shadow-2xl border border-border/60 md:p-5 lg:p-6">

                {/* Bên trái: Form Quên mật khẩu */}
                <div className="flex w-full flex-col justify-between px-4 py-4 md:w-1/2 lg:px-6">
                    <LogoBrand />

                    <div className="my-auto space-y-6 py-6">
                        {!isSent ? (
                            <>
                                <div className="space-y-2 text-center md:text-left">
                                    <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                                        Quên mật khẩu?
                                    </h1>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Nhập email đã đăng ký tài khoản ShipTrack để nhận hướng dẫn đặt lại mật khẩu.
                                    </p>
                                </div>

                                <form onSubmit={onSubmit} className="space-y-4">
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => (
                                            <Field data-invalid={!!errors.email}>
                                                <FieldLabel className="sr-only">Email</FieldLabel>
                                                <div className="relative">
                                                    <Input
                                                        {...field}
                                                        placeholder="Nhập địa chỉ Email của bạn"
                                                        className="h-12 rounded-full border-border bg-muted/50 pl-11 pr-5 text-sm transition-all focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                                                    />
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                                </div>
                                                {errors.email && (
                                                    <FieldError className="px-3 text-xs text-destructive min-h-4">
                                                        {errors.email.message}
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
                                        {isPending ? "Đang gửi yêu cầu..." : "Gửi liên kết khôi phục"}
                                    </Button>
                                </form>
                            </>
                        ) : (
                            /* Trạng thái đã gửi thành công */
                            <div className="space-y-5 text-center md:text-left animate-in fade-in-50">
                                <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                                    <CheckCircle2 className="size-8" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-foreground">Đã gửi email khôi phục!</h2>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Hệ thống đã gửi liên kết đặt lại mật khẩu đến <strong className="text-foreground">{submittedEmail}</strong>. Vui lòng kiểm tra hộp thư đến hoặc thư rác.
                                    </p>
                                </div>

                                {/* Giả lập đường dẫn test Mock */}
                                <div className="p-3.5 rounded-2xl bg-accent/50 border border-primary/20 text-xs text-muted-foreground space-y-2">
                                    <p className="font-bold text-primary">💡 LƯU Ý MOCK DATA TEST:</p>
                                    <p>Vì chưa có API email thật, bấm nút dưới đây để chuyển thẳng đến trang Đặt Lại Mật Khẩu:</p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="w-full rounded-xl border-primary/30 text-primary font-bold hover:bg-primary hover:text-white"
                                        onClick={handleNavigateToReset}
                                    >
                                        Đến trang Đặt Lại Mật Khẩu
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-2 text-center text-xs text-muted-foreground">
                        <button
                            type="button"
                            onClick={handleBackToLogin}
                            className="inline-flex items-center gap-1.5 font-bold text-foreground hover:text-primary hover:underline transition-colors cursor-pointer"
                        >
                            <ArrowLeft className="size-3.5" />
                            Quay lại đăng nhập
                        </button>
                    </div>
                </div>

                {/* Bên phải: Phần Banner hình ảnh/đồ họa trang trí (Nếu có) */}
                <div className="hidden w-1/2 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 md:flex">
                    <div className="max-w-sm space-y-4 text-center">
                        <div className="inline-flex p-4 rounded-3xl bg-background shadow-xl text-primary">
                            <KeyRound className="size-10" />
                        </div>
                        <h3 className="font-bold text-lg text-foreground">Bảo mật tài khoản</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            ShipTrack áp dụng các giải pháp mã hóa đầu cuối nhằm bảo mật tối đa thông tin định danh và hành trình của bạn.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
