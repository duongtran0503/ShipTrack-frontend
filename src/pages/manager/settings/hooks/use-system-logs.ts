import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export interface SystemLogItem {
    id: number;
    timestamp: string;
    level: "INFO" | "WARNING" | "ERROR";
    category: string;
    message: string;
    user?: string;
}

const MOCK_LOGS: SystemLogItem[] = [
    {
        id: 1,
        timestamp: "2026-11-04 15:30:22",
        level: "INFO",
        category: "AUTH",
        message: "Quản trị viên admin@gmail.com đăng nhập thành công vào hệ thống.",
        user: "Admin",
    },
    {
        id: 2,
        timestamp: "2026-11-04 15:25:10",
        level: "WARNING",
        category: "DISPATCH",
        message: "Không tìm thấy tài xế trong bán kính 10km cho đơn hàng #TRK-B91C12. Đang tự động mở rộng bán kính.",
        user: "System",
    },
    {
        id: 3,
        timestamp: "2026-11-04 15:10:05",
        level: "ERROR",
        category: "PAYMENT",
        message: "Lỗi kết nối cổng thanh toán VNPay API khi xử lý giao dịch nạp tiền ví tài xế #4.",
        user: "Gateway Service",
    },
    {
        id: 4,
        timestamp: "2026-11-04 14:50:12",
        level: "INFO",
        category: "VEHICLE",
        message: "Phương tiện biển số 29-A1 444.88 đã được phê duyệt thành công.",
        user: "Admin",
    },
];

export function useSystemLogs() {
    const [searchTerm, setSearchTerm] = useState("");
    const [levelFilter, setLevelFilter] = useState<string>("ALL"); // ALL, INFO, WARNING, ERROR

    const { data: logs = MOCK_LOGS, isLoading } = useQuery({
        queryKey: ["admin_system_logs"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_LOGS;
        },
    });

    const handleExportLogs = () => {
        toast.info("Tính năng xuất file Log hệ thống hiện chưa phát triển!");
    };

    const filteredLogs = logs.filter((log) => {
        const matchesSearch =
            log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (log.user && log.user.toLowerCase().includes(searchTerm.toLowerCase()));

        if (!matchesSearch) return false;

        if (levelFilter !== "ALL") {
            return log.level === levelFilter;
        }

        return true;
    });

    return {
        logs: filteredLogs,
        isLoading,
        searchTerm,
        setSearchTerm,
        levelFilter,
        setLevelFilter,
        handleExportLogs,
    };
}