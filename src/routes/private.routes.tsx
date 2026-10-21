import SuperAdminlayout from "@/components/layout/admin-layout";
import CustomerLayout from "@/components/layout/customer-layout";
import DriverLayout from "@/components/layout/driver-layout";
import ProfilePage from "@/pages/profile";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import type { RouteObject } from "react-router";
import { adminRoutes } from "./admin.routes";
import { customerRoutes } from "./customer.routes";
import { driverRoutes } from "./driver.routes";

export const privateRoutes: RouteObject[] = [
    {
        // Cấp 1: Yêu cầu phải đăng nhập
        element: <ProtectedRoute />,
        children: [
            // 1. Nhóm Route dành riêng cho Super Admin
            {
                element: <SuperAdminlayout>
                    <ProtectedRoute allowedRoles={["SUPER_ADMIN"]} />
                </SuperAdminlayout>,
                children: adminRoutes,
            },

            // 2. Nhóm Route dành riêng cho Driver
            {
                element: <DriverLayout>
                    <ProtectedRoute allowedRoles={["DRIVER"]} />
                </DriverLayout>,
                children: driverRoutes,
            },

            // 3. Nhóm Route dành cho Customer (hoặc cả Admin/Driver cũng có thể truy cập)
            {
                element: <CustomerLayout>
                    <ProtectedRoute allowedRoles={["CUSTOMER", "SUPER_ADMIN"]} />
                </CustomerLayout>,
                children: customerRoutes,
            },

            {
                element: <ProtectedRoute allowedRoles={["SUPER_ADMIN", "DRIVER", "CUSTOMER"]} />,
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