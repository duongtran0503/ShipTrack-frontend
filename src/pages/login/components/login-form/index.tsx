import LogoBrand from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLoginForm } from "@/pages/login/components/login-form/use-login-form";
import { Eye, EyeOff, MapPin, ShieldCheck, Truck } from "lucide-react";
import { Controller } from "react-hook-form";

export function LoginForm() {
    const {
        setShowPassword,
        showPassword,
        control,
        handleSubmit,
        onSubmit,
        errors,
        isPending,
    } = useLoginForm();

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4 md:p-8 text-foreground">
            {/* Container chính */}
            <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-card p-3 shadow-2xl border border-border/60 md:p-5 lg:p-6">

                {/* Bên trái: Form Đăng Nhập */}
                <div className="flex w-full flex-col justify-between px-4 py-4 md:w-1/2 lg:px-8">
                    {/* Logo Brand ShipTrack */}
                    <LogoBrand />

                    <div className="my-auto space-y-6 py-4">
                        {/* Header Form */}
                        <div className="space-y-2 text-center md:text-left">
                            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                                Chào mừng trở lại!
                            </h1>
                            <p className="text-sm font-medium text-muted-foreground">
                                Đăng nhập hệ thống quản lý & theo dõi đơn hàng ShipTrack.
                            </p>
                        </div>

                        {/* Form Fields */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Tên đăng nhập / Email */}
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Field data-invalid={!!errors.email}>
                                        <FieldLabel className="sr-only">Tên đăng nhập</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="Tên đăng nhập hoặc Email"
                                            className="h-12 rounded-full border-border bg-muted/50 px-5 text-sm transition-all focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                                        />
                                        {errors.email && (
                                            <FieldError className="px-3 text-xs text-destructive h-4 min-h-4">
                                                {errors.email.message}
                                            </FieldError>
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Mật khẩu */}
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <Field data-invalid={!!errors.password}>
                                        <FieldLabel className="sr-only">Mật khẩu</FieldLabel>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Mật khẩu"
                                                className="h-12 rounded-full border-border bg-muted/50 pl-5 pr-12 text-sm transition-all focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <FieldError className="px-3 text-xs text-destructive h-4 min-h-4">
                                                {errors.password.message}
                                            </FieldError>
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Quên mật khẩu */}
                            <div className="text-right">
                                <a
                                    href="#forgot"
                                    className="text-xs font-semibold text-foreground hover:text-primary hover:underline transition-colors"
                                >
                                    Quên mật khẩu?
                                </a>
                            </div>

                            {/* Nút Đăng nhập chính với animation brand */}
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="h-12 w-full rounded-full text-sm font-bold text-white transition-all animate-btn-gradient btn-shine shadow-lg shadow-primary/20 cursor-pointer border-none"
                            >
                                {isPending ? "Đang xử lý..." : "Đăng nhập"}
                            </Button>
                        </form>

                        {/* Dải phân cách "hoặc đăng nhập với" */}
                        <div className="relative flex items-center justify-center my-6">
                            <div className="w-full border-t border-border" />
                            <span className="absolute bg-card px-3 text-xs font-medium text-muted-foreground">
                                hoặc đăng nhập với
                            </span>
                        </div>

                        {/* Các nút Đăng nhập Mạng xã hội */}
                        <div className="space-y-3">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-12 w-full rounded-full border-border font-medium text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                            >
                                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                    />
                                </svg>
                                Đăng nhập bằng Google
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                className="h-12 w-full rounded-full border-border font-medium text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                            >
                                <svg
                                    className="mr-2 h-5 w-5 fill-[#1877F2]"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Đăng nhập bằng Facebook
                            </Button>
                        </div>
                    </div>

                    {/* Footer đăng ký */}
                    <div className="pt-2 text-center text-xs text-muted-foreground">
                        Bạn chưa có tài khoản?{" "}
                        <a
                            href="/register"
                            className="font-bold text-foreground hover:text-primary hover:underline transition-colors"
                        >
                            Đăng ký ngay
                        </a>
                    </div>
                </div>

                {/* Bên phải: Khối Hero Banner Thuần HTML/CSS (Đồng bộ Shiptrack Brand) */}
                <div className="hidden w-1/2 md:block">
                    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-(image:--background-image-shiptrack-gradient) p-8 flex flex-col justify-between text-white shadow-inner">

                        {/* Các hình khối hiệu ứng phía sau */}
                        <div className="absolute -top-16 -right-16 size-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 size-80 rounded-full bg-black/20 blur-3xl pointer-events-none" />

                        {/* Phần nội dung phía trên */}
                        <div className="relative z-10 space-y-3">
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold backdrop-blur-md border border-white/20">
                                <Truck className="size-3.5" />
                                <span>Hệ thống giao hàng Real-time</span>
                            </div>
                            <h2 className="text-2xl lg:text-3xl font-black leading-tight tracking-tight">
                                Quản lý lộ trình & Đơn hàng thông minh
                            </h2>
                            <p className="text-xs lg:text-sm text-white/80 leading-relaxed max-w-sm">
                                Theo dõi vị trí tài xế, quản lý trạng thái đơn hàng thời gian thực và tự động hóa quy trình vận chuyển cùng ShipTrack.
                            </p>
                        </div>

                        {/* Card Widget giả lập giao diện Tracking ở giữa */}
                        <div className="relative z-10 my-auto rounded-2xl bg-white/10 backdrop-blur-md p-4 border border-white/20 shadow-xl space-y-3">
                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-white/20">
                                        <Truck className="size-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold">Mã đơn: #ST-88291</p>
                                        <p className="text-[10px] text-white/70">Đang giao hàng</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/30">
                                    Đúng tiến độ
                                </span>
                            </div>

                            {/* Tiến trình lộ trình */}
                            <div className="flex items-center justify-between text-[11px] font-medium pt-1">
                                <div className="flex items-center gap-1.5 text-white/90">
                                    <MapPin className="size-3.5 text-white/80" />
                                    <span>Kho Tổng Q.1</span>
                                </div>
                                <div className="flex-1 mx-3 h-1 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full w-2/3 bg-white rounded-full animate-pulse" />
                                </div>
                                <div className="flex items-center gap-1.5 text-white/90">
                                    <MapPin className="size-3.5 text-white/80" />
                                    <span>Q. Bình Thạnh</span>
                                </div>
                            </div>
                        </div>

                        {/* Tính năng nổi bật dạng Badges ở dưới cùng */}
                        <div className="relative z-10 grid grid-cols-2 gap-3 pt-2">
                            <div className="flex items-center gap-2.5 rounded-xl bg-black/15 p-2.5 backdrop-blur-sm border border-white/10">
                                <ShieldCheck className="size-5 text-white/90 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold">Bảo mật chuẩn</p>
                                    <p className="text-[10px] text-white/70">Phân quyền RBAC</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5 rounded-xl bg-black/15 p-2.5 backdrop-blur-sm border border-white/10">
                                <Truck className="size-5 text-white/90 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold">SignalR Real-time</p>
                                    <p className="text-[10px] text-white/70">Cập nhật tức thì</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}