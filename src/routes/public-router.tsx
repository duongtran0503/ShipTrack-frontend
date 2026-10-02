import LoginPage from "@/pages/login";
import type { RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
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