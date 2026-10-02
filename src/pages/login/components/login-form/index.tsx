import loginImage from "@/assets/images-login-shiptrack.jpg";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLoginForm } from "@/pages/login/components/login-form/use-login-form";
import { Eye, EyeOff } from "lucide-react";
import { Controller } from "react-hook-form";



export function LoginForm() {

    const { setShowPassword, showPassword, control, handleSubmit, onSubmit, errors, isPending } = useLoginForm()
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 md:p-8">
            {/* Container chính bọc góc tròn lớn */}
            <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white p-4 shadow-xl md:p-6 lg:p-8">

                {/* Bên trái: Form Đăng Nhập */}
                <div className="flex w-full flex-col justify-between px-4 py-6 md:w-1/2 lg:px-8">

                    {/* Logo Brand ShipTrack */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl  text-white">
                            <img
                                src={logo}
                                className="w-8 h-8 "
                            />
                        </div>



                        <span
                            className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent animate-gradient-x"
                            style={{
                                backgroundImage: "linear-gradient(90deg, #990000, #FF3300, #990000)",
                                backgroundSize: "200% 100%",
                            }}
                        >
                            ShipTrack
                        </span>

                    </div>

                    <div className="my-auto space-y-6">
                        {/* Header Form */}
                        <div className="space-y-2 text-center md:text-left">
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                                Chào mừng trở lại!
                            </h1>
                            <p className="text-sm font-medium text-slate-500">
                                Đăng nhập bằng Tên đăng nhập và Mật khẩu của bạn.
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
                                            className="h-12 rounded-full border-slate-200 bg-slate-50 px-5 text-sm transition-all focus:border-slate-900 focus:bg-white focus:ring-0"
                                        />
                                        {errors.email && (
                                            <FieldError className="px-3 text-xs text-rose-500 h-4 min-h-4">
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
                                                className="h-12 rounded-full border-slate-200 bg-slate-50 pl-5 pr-12 text-sm transition-all focus:border-slate-900 focus:bg-white focus:ring-0"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <FieldError className="px-3 text-xs text-rose-500 h-4 min-h-4">
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
                                    className="text-xs font-semibold text-slate-900 hover:underline"
                                >
                                    Quên mật khẩu?
                                </a>
                            </div>

                            {/* Nút Đăng nhập chính */}
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="h-12 w-full rounded-full bg-shiptrack-primary-2 text-sm font-bold text-white transition-all hover:bg-slate-800"
                            >
                                {isPending ? "Đang xử lý..." : "Đăng nhập"}
                            </Button>
                        </form>

                        {/* Dải phân cách "hoặc đăng nhập với" */}
                        <div className="relative flex items-center justify-center my-6">
                            <div className="w-full border-t border-slate-200" />
                            <span className="absolute bg-white px-3 text-xs font-medium text-slate-400">
                                hoặc đăng nhập với
                            </span>
                        </div>

                        {/* Các nút Đăng nhập Mạng xã hội */}
                        <div className="space-y-3">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-12 w-full rounded-full border-slate-200 font-medium text-slate-700 hover:bg-slate-50"
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
                                className="h-12 w-full rounded-full border-slate-200 font-medium text-slate-700 hover:bg-slate-50"
                            >
                                <svg className="mr-2 h-5 w-5 fill-[#1877F2]" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Đăng nhập bằng Facebook
                            </Button>
                        </div>
                    </div>

                    {/* Footer đăng ký */}
                    <div className="pt-6 text-center text-xs text-slate-500">
                        Bạn chưa có tài khoản?{" "}
                        <a href="#" className="font-bold text-slate-900 hover:underline">
                            Đăng ký ngay
                        </a>
                    </div>
                </div>

                {/* Bên phải: Hình ảnh Banner */}
                <div className="hidden w-1/2 md:block">
                    <div className="relative h-full w-full overflow-hidden rounded-2xl">
                        <img
                            src={loginImage}
                            alt="ShipTrack Login Banner"
                            className="h-full w-full object-cover"
                        />
                        {/* Lớp overlay phủ nhẹ nếu muốn chữ chìm */}
                        <div className="absolute inset-0 bg-black/10" />

                        {/* Dots chuyển slide giả lập như mẫu */}
                        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5">
                            <span className="h-2 w-6 rounded-full bg-white" />
                            <span className="h-2 w-2 rounded-full bg-white/50" />
                            <span className="h-2 w-2 rounded-full bg-white/50" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}