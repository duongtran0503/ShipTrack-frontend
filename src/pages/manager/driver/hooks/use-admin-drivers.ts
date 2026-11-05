import type { UserResponse } from "@/pages/manager/user/hooks/use-admin-users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export interface DriverResponse extends UserResponse {
    AvatarUrl?: string;
    RatingAvg?: number;
    TotalTrips?: number;
    ApprovalStatus?: "PENDING" | "APPROVED" | "REJECTED"; // Trạng thái duyệt hồ sơ
    DeliveryStatus?: "ONLINE" | "OFFLINE" | "DELIVERING"; // Trạng thái hoạt động
}



const MOCK_DRIVERS: DriverResponse[] = [
    {
        Id: 2, UserId: 2, Name: "Phạm Hoàng Long", Email: "long.pham@gmail.com",
        Role: "Driver", Phone: "0912345678", LicensePlate: "59-G1 123.45",
        Balance: 1250000, IsActive: true, Online: true, ApprovalStatus: "APPROVED",
        DeliveryStatus: "DELIVERING", RatingAvg: 4.85, TotalTrips: 142,
        CreatedAt: "2026-10-05", AvatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    },
    {
        Id: 4, UserId: 4, Name: "Vũ Minh Tuấn", Email: "tuan.vu@gmail.com",
        Role: "Driver", Phone: "0987654321", LicensePlate: "59-C2 678.90",
        Balance: 3400000, IsActive: true, Online: true, ApprovalStatus: "APPROVED",
        DeliveryStatus: "ONLINE", RatingAvg: 4.92, TotalTrips: 218,
        CreatedAt: "2026-10-15", AvatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    },
    {
        Id: 5, UserId: 5, Name: "Lê Hoàng C", Email: "lehoangc@gmail.com",
        Role: "Driver", Phone: "0988112233", LicensePlate: "59-X1 999.99",
        Balance: 0, IsActive: false, Online: false, ApprovalStatus: "APPROVED",
        DeliveryStatus: "OFFLINE", BanReason: "Hủy đơn hàng quá nhiều lần",
        RatingAvg: 3.45, TotalTrips: 19, CreatedAt: "2026-10-12",
        AvatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    },
    {
        Id: 8, UserId: 8, Name: "Đỗ Văn Nam", Email: "nam.do@gmail.com",
        Role: "Driver", Phone: "0908887766", LicensePlate: "29-A1 444.88",
        Balance: 450000, IsActive: true, Online: false, ApprovalStatus: "PENDING",
        DeliveryStatus: "OFFLINE", RatingAvg: 0, TotalTrips: 0,
        CreatedAt: "2026-11-03", AvatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
    },
];

export function useAdminDrivers() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [isBanModalOpen, setIsBanModalOpen] = useState<boolean>(false);
    const [selectedDriver, setSelectedDriver] = useState<DriverResponse | null>(null);
    const [banReason, setBanReason] = useState<string>("");

    const { data: drivers = [], isLoading } = useQuery({
        queryKey: ["admin_drivers_list"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_DRIVERS;
        },
    });

    const toggleActiveMutation = useMutation({
        mutationFn: async ({ id, isActive, reason }: { id: number; isActive: boolean; reason?: string }) => {
            await new Promise((r) => setTimeout(r, 400));
            const target = MOCK_DRIVERS.find((d) => d.Id === id);
            if (target) {
                target.IsActive = isActive;
                target.BanReason = reason || "";
                target.DeliveryStatus = isActive ? "ONLINE" : "OFFLINE";
            }
            return target;
        },
        onSuccess: (_data, variables) => {
            toast.success(variables.isActive ? "Đã mở khóa tài xế thành công!" : "Đã khóa tài xế thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin_drivers_list"] });
            setIsBanModalOpen(false);
            setSelectedDriver(null);
            setBanReason("");
        },
    });

    const goToDriverDetail = (id: number) => navigate(`/manager/drivers/${id}`);

    const handleOpenBanModal = (driver: DriverResponse) => {
        setSelectedDriver(driver);
        setIsBanModalOpen(true);
    };

    const handleToggleDriverStatus = () => {
        if (!selectedDriver) return;
        const nextState = !selectedDriver.IsActive;
        if (!nextState && !banReason.trim()) {
            toast.error("Vui lòng nhập lý do khóa tài xế!");
            return;
        }
        toggleActiveMutation.mutate({
            id: selectedDriver.Id,
            isActive: nextState,
            reason: banReason,
        });
    };

    return {
        drivers,
        isLoading,
        goToDriverDetail,
        isBanModalOpen,
        setIsBanModalOpen,
        selectedDriver,
        banReason,
        setBanReason,
        handleOpenBanModal,
        handleToggleDriverStatus,
        isPending: toggleActiveMutation.isPending,
    };
}