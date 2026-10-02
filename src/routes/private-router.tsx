import Dashboard from "@/pages/dashboard";
import type { RouteObject } from "react-router-dom";

export const privateRoutes: RouteObject[] = [
    {
        path: "/dashboard",
        element: (
            <Dashboard />
        ),
    },
    {
        path: "/orders",
        element: (
            <div className="p-8 text-slate-100 bg-slate-950 min-h-screen">
                <h1 className="text-3xl font-bold">Quản lý Đơn hàng (Private)</h1>
            </div>
        ),
    },
    {
        path: "/profile",
        element: (
            <div className="p-8 text-slate-100 bg-slate-950 min-h-screen">
                <h1 className="text-3xl font-bold">Thông tin cá nhân (Private)</h1>
            </div>
        ),
    },
];