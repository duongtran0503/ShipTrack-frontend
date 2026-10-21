import LogoBrand from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRegisterForm } from "@/pages/register/hooks/use-register-form";
import {
    Bike,
    CheckCircle2,
    Clock,
    Eye,
    EyeOff,
    ShieldCheck,
    Truck,
    User,
} from "lucide-react";
import { Controller } from "react-hook-form";

export default function RegisterForm() {
    const {
        control,
        handleSubmit,
        onSubmit,
        errors,
        isPending,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        selectedRole,
        setValue,
    } = useRegisterForm();

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4 md:p-8 text-foreground">
            {/* Container chính */}
            <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-card p-3 shadow-2xl border border-border/60 md:p-5 lg:p-6">

                {/* Bên trái: Form Đăng Ký */}
                <div className="flex w-full flex-col justify-between px-4 py-4 md:w-1/2 lg:px-6">
                    <LogoBrand />

                    <div className="my-auto space-y-5 py-4">
                        {/* Header Form */}
                        <div className="space-y-1.5 text-center md:text-left">
                            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                                Tạo tài khoản mới
                            </h1>
                            <p className="text-sm font-medium text-muted-foreground">
                                Tham gia mạng lưới giao hàng thông minh ShipTrack ngay hôm nay.
                            </p>
                        </div>

                        {/* Selector chuyển đổi Role (Customer / Driver) */}
                        <div className="grid grid-cols-2 gap-2 p-1 bg-muted/60 rounded-2xl border border-border/50">
                            <button
                                type="button"
                                onClick={() => setValue("role", "CUSTOMER")}
                                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedRole === "CUSTOMER"
                                    ? "bg-card text-primary shadow-md border border-border/50"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <User className="size-4" />
                                <span>Khách hàng</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setValue("role", "DRIVER")}
                                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedRole === "DRIVER"
                                    ? "bg-card text-primary shadow-md border border-border/50"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <Bike className="size-4" />
                                <span>Tài xế giao hàng</span>
                            </button>
                        </div>

                        {/* Form Inputs */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                            {/* Họ và tên */}
                            <Controller
                                name="fullName"
                                control={control}
                                render={({ field }) => (
                                    <Field data-invalid={!!errors.fullName}>
                                        <FieldLabel className="sr-only">Họ và tên</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="Họ và tên đầy đủ"
                                            className="h-11 rounded-full border-border bg-muted/50 px-5 text-sm transition-all focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                                        />
                                        {errors.fullName && (
                                            <FieldError className="px-3 text-xs text-destructive min-h-4">
                                                {errors.fullName.message}
                                            </FieldError>
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Grid Email + Số điện thoại */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <Field data-invalid={!!errors.email}>
                                            <FieldLabel className="sr-only">Email</FieldLabel>
                                            <Input
                                                {...field}
                                                placeholder="Địa chỉ Email"
                                                className="h-11 rounded-full border-border bg-muted/50 px-5 text-sm transition-all focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                                            />
                                            {errors.email && (
                                                <FieldError className="px-3 text-xs text-destructive min-h-4">
                                                    {errors.email.message}
                                                </FieldError>
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field }) => (
                                        <Field data-invalid={!!errors.phone}>
                                            <FieldLabel className="sr-only">Số điện thoại</FieldLabel>
                                            <Input
                                                {...field}
                                                placeholder="Số điện thoại"
                                                className="h-11 rounded-full border-border bg-muted/50 px-5 text-sm transition-all focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                                            />
                                            {errors.phone && (
                                                <FieldError className="px-3 text-xs text-destructive min-h-4">
                                                    {errors.phone.message}
                                                </FieldError>
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>

                            {/* CÁC TRƯỜNG DÀNH RIÊNG CHO DRIVER */}
                            {selectedRole === "DRIVER" && (
                                <div className="space-y-3 p-3.5 rounded-2xl bg-accent/40 border border-primary/20 transition-all animate-in fade-in-50">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                                        <Truck className="size-4" />
                                        <span>Thông tin phương tiện & Bằng lái</span>
                                    </div>

                                    <Controller
                                        name="licenseNumber"
                                        control={control}
                                        render={({ field }) => (
                                            <Field data-invalid={!!errors.licenseNumber}>
                                                <Input
                                                    {...field}
                                                    placeholder="Số GPLX / Bằng lái xe"
                                                    className="h-10 rounded-xl border-border bg-background px-4 text-sm"
                                                />
                                                {errors.licenseNumber && (
                                                    <FieldError className="px-2 text-xs text-destructive">
                                                        {errors.licenseNumber.message}
                                                    </FieldError>
                                                )}
                                            </Field>
                                        )}
                                    />

                                    <div className="grid grid-cols-2 gap-2">
                                        <Controller
                                            name="vehicleType"
                                            control={control}
                                            render={({ field }) => (
                                                <select
                                                    {...field}
                                                    className="h-10 rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:ring-2 focus:ring-primary/20 outline-none"
                                                >
                                                    <option value="MOTORBIKE">Xe máy</option>
                                                    <option value="VAN">Xe Tải Nhỏ / Van</option>
                                                    <option value="TRUCK">Xe Tải Lớn</option>
                                                </select>
                                            )}
                                        />

                                        <Controller
                                            name="licensePlate"
                                            control={control}
                                            render={({ field }) => (
                                                <Field data-invalid={!!errors.licensePlate}>
                                                    <Input
                                                        {...field}
                                                        placeholder="Biển số xe (ví dụ: 59-X1 123.45)"
                                                        className="h-10 rounded-xl border-border bg-background px-3 text-sm"
                                                    />
                                                    {errors.licensePlate && (
                                                        <FieldError className="px-2 text-xs text-destructive">
                                                            {errors.licensePlate.message}
                                                        </FieldError>
                                                    )}
                                                </Field>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Grid Mật khẩu + Xác nhận mật khẩu */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                                                    className="h-11 rounded-full border-border bg-muted/50 pl-4 pr-10 text-sm transition-all focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
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

                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    render={({ field }) => (
                                        <Field data-invalid={!!errors.confirmPassword}>
                                            <FieldLabel className="sr-only">Nhập lại mật khẩu</FieldLabel>
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Xác nhận mật khẩu"
                                                    className="h-11 rounded-full border-border bg-muted/50 pl-4 pr-10 text-sm transition-all focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowConfirmPassword(!showConfirmPassword)
                                                    }
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
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
                            </div>

                            {/* Checkbox Đồng ý điều khoản */}
                            <Controller
                                name="acceptTerms"
                                control={control}
                                render={({ field }) => (
                                    <Field data-invalid={!!errors.acceptTerms}>
                                        <div className="flex items-center gap-2 pt-1">
                                            <input
                                                type="checkbox"
                                                id="acceptTerms"
                                                checked={!!field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                className="size-4 rounded border-border text-primary focus:ring-primary/20 accent-[#710105] cursor-pointer"
                                            />
                                            <label htmlFor="acceptTerms" className="text-xs text-muted-foreground cursor-pointer select-none">
                                                Tôi đồng ý với{" "}
                                                <a href="#terms" className="font-semibold text-foreground hover:underline">
                                                    Điều khoản & Dịch vụ
                                                </a>{" "}
                                                của ShipTrack
                                            </label>
                                        </div>
                                        {errors.acceptTerms && (
                                            <FieldError className="px-1 text-xs text-destructive min-h-4">
                                                {errors.acceptTerms.message}
                                            </FieldError>
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Nút Submit chính */}
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="h-11 w-full rounded-full text-sm font-bold text-white transition-all animate-btn-gradient btn-shine shadow-lg shadow-primary/20 cursor-pointer border-none mt-2"
                            >
                                {isPending
                                    ? "Đang tạo tài khoản..."
                                    : selectedRole === "DRIVER"
                                        ? "Đăng ký Làm Tài Xế"
                                        : "Tạo Tài Khoản Khách Hàng"}
                            </Button>
                        </form>
                    </div>

                    {/* Footer chuyển sang Đăng nhập */}
                    <div className="pt-2 text-center text-xs text-muted-foreground">
                        Đã có tài khoản?{" "}
                        <a
                            href="/login"
                            className="font-bold text-foreground hover:text-primary hover:underline transition-colors"
                        >
                            Đăng nhập ngay
                        </a>
                    </div>
                </div>

                {/* Bên phải: Khối Hero Banner Thuần HTML/CSS */}
                <div className="hidden w-1/2 md:block">
                    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-(image:--background-image-shiptrack-gradient) p-8 flex flex-col justify-between text-white shadow-inner">
                        <div className="absolute -top-16 -right-16 size-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 size-80 rounded-full bg-black/20 blur-3xl pointer-events-none" />

                        {/* Nội dung Banner theo Role được chọn */}
                        <div className="relative z-10 space-y-3">
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold backdrop-blur-md border border-white/20">
                                {selectedRole === "DRIVER" ? (
                                    <Bike className="size-3.5" />
                                ) : (
                                    <Truck className="size-3.5" />
                                )}
                                <span>
                                    {selectedRole === "DRIVER"
                                        ? "Dành cho Đối tác Tài xế"
                                        : "Dành cho Khách hàng"}
                                </span>
                            </div>
                            <h2 className="text-2xl lg:text-3xl font-black leading-tight tracking-tight">
                                {selectedRole === "DRIVER"
                                    ? "Gia tăng thu nhập cùng ShipTrack"
                                    : "Trải nghiệm giao hàng Siêu Tốc & An Toàn"}
                            </h2>
                            <p className="text-xs lg:text-sm text-white/80 leading-relaxed max-w-sm">
                                {selectedRole === "DRIVER"
                                    ? "Nhận đơn hàng gần nhất, quản lý lịch trình linh hoạt và nhận thanh toán minh bạch từ hệ thống."
                                    : "Tạo đơn nhanh chóng, theo dõi hành trình Real-time trên bản đồ và nhận thông báo tức thời."}
                            </p>
                        </div>

                        {/* List Quyền lợi nổi bật */}
                        <div className="relative z-10 my-auto rounded-2xl bg-white/10 backdrop-blur-md p-4 border border-white/20 shadow-xl space-y-2.5">
                            <div className="flex items-center gap-3 text-xs">
                                <CheckCircle2 className="size-4 text-emerald-300 shrink-0" />
                                <span>
                                    {selectedRole === "DRIVER"
                                        ? "Chiết khấu ưu đãi dành cho Tài xế mới"
                                        : "Tính phí vận chuyển tự động chính xác (OSRM)"}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs">
                                <CheckCircle2 className="size-4 text-emerald-300 shrink-0" />
                                <span>
                                    {selectedRole === "DRIVER"
                                        ? "Định vị vị trí GPS Real-time qua SignalR"
                                        : "Cập nhật trạng thái đơn từng phút"}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs">
                                <CheckCircle2 className="size-4 text-emerald-300 shrink-0" />
                                <span>Bảo mật thông tin tài khoản tuyệt đối</span>
                            </div>
                        </div>

                        {/* Badges footer */}
                        <div className="relative z-10 grid grid-cols-2 gap-3 pt-2">
                            <div className="flex items-center gap-2.5 rounded-xl bg-black/15 p-2.5 backdrop-blur-sm border border-white/10">
                                <ShieldCheck className="size-5 text-white/90 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold">An toàn & Uy tín</p>
                                    <p className="text-[10px] text-white/70">Xác thực OTP/Email</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5 rounded-xl bg-black/15 p-2.5 backdrop-blur-sm border border-white/10">
                                <Clock className="size-5 text-white/90 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold">Hỗ trợ 24/7</p>
                                    <p className="text-[10px] text-white/70">Giải đáp tức thì</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}