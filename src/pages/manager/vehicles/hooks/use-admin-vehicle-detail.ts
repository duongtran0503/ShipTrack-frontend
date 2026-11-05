import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import type { VehicleApprovalItem } from "./use-vehicle-approvals";

export interface VehicleDetailType extends VehicleApprovalItem {
    model?: string;
    ownerAddress?: string;
    historyLogs?: {
        id: string;
        action: string;
        timestamp: string;
        performedBy: string;
    }[];
}

const MOCK_VEHICLE_DETAIL_MAP: Record<number, VehicleDetailType> = {
    1: {
        id: 1,
        driverId: 2,
        driverName: "Phạm Hoàng Long",
        driverPhone: "0912345678",
        driverAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
        ownerAddress: "12 Võ Văn Kiệt, Quận 1, TP.HCM",
        vehicleType: "MOTORBIKE",
        licensePlate: "59-G1 123.45",
        brand: "Honda",
        model: "AirBlade 160cc",
        color: "Đen nhám",
        maxWeightKg: 50,
        isDefault: true,
        isVerified: true,
        vehicleImageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&h=300&fit=crop",
        licensePlateImageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&h=300&fit=crop",
        registrationPaperUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&h=300&fit=crop",
        registeredAt: "2026-10-05 08:30",
        createdAt: "2026-10-05",
        historyLogs: [
            { id: "l1", action: "Đăng ký mới phương tiện lên hệ thống", timestamp: "2026-10-05 08:30", performedBy: "Phạm Hoàng Long" },
            { id: "l2", action: "Admin phê duyệt phương tiện thành công", timestamp: "2026-10-05 10:15", performedBy: "Admin Hệ Thống" },
            { id: "l3", action: "Cập nhật làm phương tiện Active chính", timestamp: "2026-10-06 09:00", performedBy: "Hệ thống tự động" },
        ],
    },
    4: {
        id: 4,
        driverId: 8,
        driverName: "Đỗ Văn Nam",
        driverPhone: "0908887766",
        driverAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
        ownerAddress: "88 Cách Mạng Tháng 8, Quận 3, TP.HCM",
        vehicleType: "MOTORBIKE",
        licensePlate: "29-A1 444.88",
        brand: "Honda",
        model: "Wave Alpha 2024",
        color: "Đỏ",
        maxWeightKg: 40,
        isDefault: true,
        isVerified: false, // Chờ duyệt
        vehicleImageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500&h=300&fit=crop",
        licensePlateImageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&h=300&fit=crop",
        registrationPaperUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&h=300&fit=crop",
        registeredAt: "2026-11-03 14:15",
        createdAt: "2026-11-03",
        historyLogs: [
            { id: "l4", action: "Đăng ký mới phương tiện chờ kiểm duyệt", timestamp: "2026-11-03 14:15", performedBy: "Đỗ Văn Nam" },
        ],
    },
};

export function useAdminVehicleDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const vehicleId = Number(id) || 1;

    const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);
    const [rejectReason, setRejectReason] = useState<string>("");

    const { data: vehicle = MOCK_VEHICLE_DETAIL_MAP[vehicleId] || MOCK_VEHICLE_DETAIL_MAP[1], isLoading } = useQuery({
        queryKey: ["admin_vehicle_detail", vehicleId],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_VEHICLE_DETAIL_MAP[vehicleId] || MOCK_VEHICLE_DETAIL_MAP[1];
        },
    });

    const approveMutation = useMutation({
        mutationFn: async () => {
            await new Promise((r) => setTimeout(r, 400));
            // eslint-disable-next-line react-hooks/immutability
            vehicle.isVerified = true;
            return vehicle;
        },
        onSuccess: () => {
            toast.success("Đã phê duyệt phương tiện thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin_vehicle_detail", vehicleId] });
        },
    });

    const rejectMutation = useMutation({
        mutationFn: async (reason: string) => {
            await new Promise((r) => setTimeout(r, 400));
            return reason;
        },
        onSuccess: () => {
            toast.success("Đã từ chối phương tiện và gửi thông báo về cho tài xế.");
            setIsRejectModalOpen(false);
            setRejectReason("");
            navigate("/manager/vehicles/approvals");
        },
    });

    const handleBack = () => navigate("/manager/vehicles");
    const goToDriverDetail = (driverId: number) => navigate(`/manager/drivers/${driverId}`);

    const handleConfirmApprove = () => {
        approveMutation.mutate();
    };

    const handleConfirmReject = () => {
        if (!rejectReason.trim()) {
            toast.error("Vui lòng nhập lý do từ chối phương tiện!");
            return;
        }
        rejectMutation.mutate(rejectReason);
    };

    return {
        vehicle,
        isLoading,
        handleBack,
        goToDriverDetail,
        isRejectModalOpen,
        setIsRejectModalOpen,
        rejectReason,
        setRejectReason,
        handleConfirmApprove,
        handleConfirmReject,
        isApproving: approveMutation.isPending,
        isRejecting: rejectMutation.isPending,
    };
}