import AboutPage from "@/pages/about";
import ForgotPasswordPage from "@/pages/forgot-password";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import ResetPasswordForm from "@/pages/reset-password/components/reset-password-form";
import type { RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <AboutPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
    },
    {
        path: "/reset-password",
        element: <ResetPasswordForm />,
    },
    {
        path: "/unauthorized",
        element: (
            <div className="flex h-screen items-center justify-center bg-slate-950 text-slate-100">
                <h1 className="text-2xl font-bold">403 - Bạn không có quyền truy cập</h1>
            </div>
        ),
    },
];