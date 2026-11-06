import SuperAdminlayout from "@/components/layout/admin-layout";
import CustomerLayout from "@/components/layout/customer-layout";
import DriverLayout from "@/components/layout/driver-layout";
import ProfilePage from "@/pages/profile";
import { PrivateRouteWrapper } from "@/routes/PrivateRouteWrapper";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import type { RouteObject } from "react-router";
import { adminRoutes } from "./admin.routes";
import { customerRoutes } from "./customer.routes";
import { driverRoutes } from "./driver.routes";

export const privateRoutes: RouteObject[] = [
    {
        // Cấp 1: Yêu cầu phải đăng nhập
        element: <PrivateRouteWrapper />,
        children: [
            // 1. Nhóm Route dành riêng cho Super Admin / Admin
            {
                element: (
                    <SuperAdminlayout>
                        <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN"]} />
                    </SuperAdminlayout>
                ),
                children: adminRoutes,
            },

            // 2. Nhóm Route dành cho Driver (Đã bổ sung đầy đủ các loại tài xế)
            {
                element: (
                    <DriverLayout>
                        <ProtectedRoute allowedRoles={["DRIVER", "DRIVER_EXPRESS", "DRIVER_TRUCK", "DRIVER_CONTAINER"]} />
                    </DriverLayout>
                ),
                children: driverRoutes,
            },

            // 3. Nhóm Route dành cho Customer
            {
                element: (
                    <CustomerLayout>
                        <ProtectedRoute allowedRoles={["CUSTOMER", "SUPER_ADMIN", "ADMIN"]} />
                    </CustomerLayout>
                ),
                children: customerRoutes,
            },

            // 4. Nhóm Route chung (Profile) với đầy đủ toàn bộ các role
            {
                element: (
                    <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN", "DRIVER", "DRIVER_EXPRESS", "DRIVER_TRUCK", "DRIVER_CONTAINER", "CUSTOMER"]} />
                ),
                children: [
                    {
                        path: "/profile",
                        element: <ProfilePage />,
                    },
                ],
            },
        ],
    },
];