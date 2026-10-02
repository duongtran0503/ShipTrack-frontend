import LayoutDashboard from "@/routes/layout";
import NotFound from "@/routes/page-not-found";
import { privateRoutes } from "@/routes/private-router";
import { PrivateRouteWrapper } from "@/routes/PrivateRouteWrapper";
import { publicRoutes } from "@/routes/public-router";
import { PublicRouteWrapper } from "@/routes/public-router-wrapper";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    // 1. Các Route Public không cần đăng nhập
    {
        element: <PublicRouteWrapper />,
        children: publicRoutes
    },

    // 2. Các Route Private được bọc bởi PrivateRouteWrapper
    {
        element: <LayoutDashboard>
            <PrivateRouteWrapper />
        </LayoutDashboard>,
        children: privateRoutes,
    },

    // 3. Catch-all Route (Trang 404)
    {
        path: "*",
        element: <NotFound />
    },
]);

export function AppRouter() {
    return <RouterProvider router={router} />;
}