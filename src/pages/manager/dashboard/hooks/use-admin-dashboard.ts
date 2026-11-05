import { useState } from "react";
import { useNavigate } from "react-router";

export interface AdminDashboardKpi {
    newOrdersToday: number;
    onlineDrivers: number;
    activeDeliveries: number;
    todayRevenue: number;
    pendingDriversCount: number;
    pendingVehiclesCount: number;
    stuckOrdersCount: number;
}

export interface SystemActivityLog {
    id: string | number;
    action: string;
    description: string;
    time: string;
    type: "ORDER" | "DRIVER" | "SYSTEM" | "PAYMENT";
}

export interface PendingDriver {
    id: string | number;
    fullName: string;
    email: string;
    phone: string;
    createdAt: string;
}

export function useAdminDashboard() {
    const navigate = useNavigate();
    const [isLoading] = useState<boolean>(false);

    // Mock dữ liệu trực tiếp trong hook
    const kpi: AdminDashboardKpi = {
        newOrdersToday: 38,
        onlineDrivers: 15,
        activeDeliveries: 12,
        todayRevenue: 3450000,
        pendingDriversCount: 3,
        pendingVehiclesCount: 2,
        stuckOrdersCount: 2,
    };

    // Thay thế danh sách đơn hàng mới bằng Nhật ký hoạt động hệ thống
    const systemLogs: SystemActivityLog[] = [
        { id: 1, action: "Duyệt tài xế", description: "Admin đã phê duyệt hồ sơ cho tài xế Trần Văn Mạnh", time: "5 phút trước", type: "DRIVER" },
        { id: 2, action: "Hủy đơn hàng", description: "Đơn hàng #TRK-A83F20 bị hủy do quá thời gian tìm tài xế", time: "12 phút trước", type: "ORDER" },
        { id: 3, action: "Cấu hình hệ thống", description: "Cập nhật biểu phí vận chuyển giờ cao điểm", time: "45 phút trước", type: "SYSTEM" },
        { id: 4, action: "Rút tiền", description: "Tài xế Nguyễn Văn Dung yêu cầu rút 500,000 đ", time: "1 giờ trước", type: "PAYMENT" },
    ];

    const pendingDrivers: PendingDriver[] = [
        { id: 101, fullName: "Phạm Hoàng Long", email: "long.pham@gmail.com", phone: "0901234567", createdAt: "Hôm nay" },
        { id: 102, fullName: "Vũ Minh Tuấn", email: "tuan.vu@gmail.com", phone: "0918765432", createdAt: "Hôm qua" },
        { id: 103, fullName: "Đặng Quốc Bảo", email: "bao.dang@gmail.com", phone: "0983334445", createdAt: "2 ngày trước" },
    ];

    // Các hàm điều hướng hệ thống
    const goToOrders = () => navigate("/manager/orders");
    const goToDriverApprovals = () => navigate("/manager/drivers/approvals");
    const goToVehicleApprovals = () => navigate("/manager/vehicles/approvals");
    const goToReports = () => navigate("/manager/reports");
    const goToSettings = () => navigate("/manager/settings/logs");
    const goToDriverDetail = (id: string | number) => navigate(`/manager/drivers/${id}`);

    return {
        kpi,
        systemLogs,
        pendingDrivers,
        isLoading,
        goToOrders,
        goToDriverApprovals,
        goToVehicleApprovals,
        goToReports,
        goToSettings,
        goToDriverDetail,
    };
}