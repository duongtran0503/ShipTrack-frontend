import NotFound from "@/routes/page-not-found";
import { privateRoutes } from "@/routes/private.routes";
import { PrivateRouteWrapper } from "@/routes/PrivateRouteWrapper";
import { PublicRouteWrapper } from "@/routes/public-router-wrapper";
import { publicRoutes } from "@/routes/public.routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    // 1. Các Route Public không cần đăng nhập
    {
        element: <PublicRouteWrapper />,
        children: publicRoutes
    },

    // 2. Các Route Private được bọc bởi PrivateRouteWrapper
    {
        element: <PrivateRouteWrapper />,
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