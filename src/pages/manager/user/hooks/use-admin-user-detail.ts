import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import type { UserResponse } from "./use-admin-users";

export interface WarningLog {
    id: string;
    content: string;
    createdAt: string;
    issuedBy: string;
}

export interface UserDetailType extends UserResponse {
    Address?: string;
    TotalCompletedOrders?: number;
    TotalSpentOrEarned?: number;
    BannedAt?: string | null;
    BannedBy?: string | null;
    WarningLogs?: WarningLog[];
    HistoryOrders?: {
        id: string;
        trackingCode: string;
        destination: string;
        fee: number;
        status: string;
        createdAt: string;
    }[];
    HistoryTrips?: {
        id: string;
        trackingCode: string;
        income: number;
        completedAt: string;
    }[];
}

const MOCK_USER_DETAIL_MAP: Record<number, UserDetailType> = {
    1: {
        Id: 1,
        UserId: 1,
        Name: "Nguyễn Văn A",
        Email: "nguyenvana@gmail.com",
        Role: "Customer",
        Phone: "0901112223",
        Address: "227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM",
        Balance: 500000,
        TotalCompletedOrders: 14,
        TotalSpentOrEarned: 1250000,
        IsActive: false, // User đang bị khóa để test hiển thị thông tin ban/warn
        Online: false,
        BanReason: "Vi phạm chính sách thanh toán và gian lận đơn hàng nhiều lần.",
        BannedAt: "2026-11-01 10:30",
        BannedBy: "Admin Hệ Thống",
        WarningLogs: [
            { id: "w-1", content: "Cảnh báo lần 1: Hủy đơn hàng đột xuất sau khi tài xế đã nhận.", createdAt: "2026-10-15 14:20", issuedBy: "Admin Kiểm Duyệt" },
            { id: "w-2", content: "Cảnh báo lần 2: Phản hồi tiêu cực từ tài xế về thái độ.", createdAt: "2026-10-25 09:10", issuedBy: "Hỗ Trợ Khách Hàng" },
        ],
        CreatedAt: "2026-10-01",
        HistoryOrders: [
            { id: "101", trackingCode: "TRK-A83F20", destination: "135 Nam Kỳ Khởi Nghĩa, Q.1", fee: 45000, status: "CANCELLED", createdAt: "2026-11-01" },
        ],
    },
    2: {
        Id: 2,
        UserId: 2,
        Name: "Phạm Hoàng Long",
        Email: "long.pham@gmail.com",
        Role: "Driver",
        Phone: "0912345678",
        Address: "12 Võ Văn Kiệt, Quận 1, TP.HCM",
        LicensePlate: "59-G1 123.45",
        Balance: 1250000,
        TotalCompletedOrders: 42,
        TotalSpentOrEarned: 4500000,
        IsActive: true, // Đang hoạt động bình thường
        Online: true,
        CreatedAt: "2026-10-05",
        WarningLogs: [],
        HistoryTrips: [
            { id: "201", trackingCode: "TRK-C77D88", income: 35000, completedAt: "2026-11-03" },
        ],
    },
};

export function useAdminUserDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const userId = Number(id) || 1;

    const [showSensitiveInfo, setShowSensitiveInfo] = useState<boolean>(false);
    const [isBanModalOpen, setIsBanModalOpen] = useState<boolean>(false);
    const [banReason, setBanReason] = useState<string>("");
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

    const { data: user = MOCK_USER_DETAIL_MAP[userId] || MOCK_USER_DETAIL_MAP[1], isLoading } = useQuery({
        queryKey: ["admin_user_detail", userId],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_USER_DETAIL_MAP[userId] || MOCK_USER_DETAIL_MAP[1];
        },
    });

    const toggleActiveMutation = useMutation({
        mutationFn: async ({ isActive, reason }: { isActive: boolean; reason?: string }) => {
            await new Promise((r) => setTimeout(r, 400));
            // eslint-disable-next-line react-hooks/immutability
            user.IsActive = isActive;
            user.BanReason = reason || null;
            user.BannedAt = !isActive ? new Date().toISOString().replace("T", " ").slice(0, 16) : null;
            user.BannedBy = !isActive ? "Admin Hiện Tại" : null;
            return user;
        },
        onSuccess: (_data, variables) => {
            toast.success(variables.isActive ? "Đã mở khóa tài khoản thành công!" : "Đã khóa tài khoản thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin_user_detail", userId] });
            setIsBanModalOpen(false);
            setBanReason("");
        },
    });

    const resetPasswordMutation = useMutation({
        mutationFn: async () => {
            await new Promise((r) => setTimeout(r, 600));
            return true;
        },
        onSuccess: () => {
            toast.success(`Đã đặt lại mật khẩu và gửi email mật khẩu mới đến ${user.Email}!`);
            setIsResetPasswordModalOpen(false);
        },
    });

    const handleBack = () => navigate("/manager/users");

    const handleToggleUserStatus = () => {
        const nextState = !user.IsActive;
        if (!nextState && !banReason.trim()) {
            toast.error("Vui lòng nhập lý do khóa tài khoản!");
            return;
        }
        toggleActiveMutation.mutate({ isActive: nextState, reason: banReason });
    };

    return {
        user,
        isLoading,
        handleBack,
        showSensitiveInfo,
        toggleShowSensitiveInfo: () => setShowSensitiveInfo((prev) => !prev),
        isBanModalOpen,
        setIsBanModalOpen,
        banReason,
        setBanReason,
        handleToggleUserStatus,
        isBanPending: toggleActiveMutation.isPending,
        isResetPasswordModalOpen,
        setIsResetPasswordModalOpen,
        handleResetPassword: () => resetPasswordMutation.mutate(),
        isResetPending: resetPasswordMutation.isPending,
        isEditModalOpen,
        setIsEditModalOpen,
    };
}