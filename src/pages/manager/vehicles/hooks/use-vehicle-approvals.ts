import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import type { VehicleListItem } from "../hooks/use-admin-vehicles";

export interface VehicleApprovalItem extends VehicleListItem {
    licensePlateImageUrl?: string;
    registrationPaperUrl?: string;
    registeredAt: string;
}

const MOCK_PENDING_VEHICLES: VehicleApprovalItem[] = [
    {
        id: 4,
        driverId: 8,
        driverName: "Đỗ Văn Nam",
        driverPhone: "0908887766",
        driverAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
        vehicleType: "MOTORBIKE",
        licensePlate: "29-A1 444.88",
        brand: "Honda Wave Alpha",
        color: "Đỏ",
        maxWeightKg: 40,
        isDefault: true,
        isVerified: false,
        vehicleImageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=250&fit=crop",
        licensePlateImageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
        registrationPaperUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
        registeredAt: "2026-11-03 14:15",
        createdAt: "2026-11-03",
    },
    {
        id: 5,
        driverId: 9,
        driverName: "Bùi Thị Lan",
        driverPhone: "0934556677",
        driverAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
        vehicleType: "VAN",
        licensePlate: "50-H2 112.33",
        brand: "Suzuki Carry Pro",
        color: "Trắng",
        maxWeightKg: 750,
        isDefault: true,
        isVerified: false,
        vehicleImageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=250&fit=crop",
        licensePlateImageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
        registrationPaperUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
        registeredAt: "2026-11-04 09:30",
        createdAt: "2026-11-04",
    },
];

export function useVehicleApprovals() {
    const queryClient = useQueryClient();

    const [selectedVehicle, setSelectedVehicle] = useState<VehicleApprovalItem | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

    // State Modal Từ chối (cần lý do)
    const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);
    const [rejectReason, setRejectReason] = useState<string>("");

    // Query danh sách xe chờ duyệt
    const { data: pendingVehicles = MOCK_PENDING_VEHICLES, isLoading } = useQuery({
        queryKey: ["admin_vehicle_approvals"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_PENDING_VEHICLES;
        },
    });

    // Mutation Duyệt xe
    const approveMutation = useMutation({
        mutationFn: async (id: number) => {
            await new Promise((r) => setTimeout(r, 400));
            const index = MOCK_PENDING_VEHICLES.findIndex((v) => v.id === id);
            if (index !== -1) {
                MOCK_PENDING_VEHICLES.splice(index, 1);
            }
            return id;
        },
        onSuccess: () => {
            toast.success("Đã phê duyệt phương tiện thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin_vehicle_approvals"] });
            setIsDetailModalOpen(false);
            setSelectedVehicle(null);
        },
    });

    // Mutation Từ chối xe (có lý do bắt buộc)
    const rejectMutation = useMutation({
        mutationFn: async ({ id, reason }: { id: number; reason: string }) => {
            await new Promise((r) => setTimeout(r, 400));
            const index = MOCK_PENDING_VEHICLES.findIndex((v) => v.id === id);
            if (index !== -1) {
                MOCK_PENDING_VEHICLES.splice(index, 1);
            }
            return { id, reason };
        },
        onSuccess: () => {
            toast.success("Đã từ chối phương tiện và gửi thông báo lý do về cho tài xế.");
            queryClient.invalidateQueries({ queryKey: ["admin_vehicle_approvals"] });
            setIsRejectModalOpen(false);
            setIsDetailModalOpen(false);
            setSelectedVehicle(null);
            setRejectReason("");
        },
    });

    const handleOpenDetail = (vehicle: VehicleApprovalItem) => {
        setSelectedVehicle(vehicle);
        setIsDetailModalOpen(true);
    };

    const handleOpenReject = (vehicle: VehicleApprovalItem) => {
        setSelectedVehicle(vehicle);
        setRejectReason("");
        setIsRejectModalOpen(true);
    };

    const handleConfirmApprove = (id: number) => {
        approveMutation.mutate(id);
    };

    const handleConfirmReject = () => {
        if (!selectedVehicle) return;
        if (!rejectReason.trim()) {
            toast.error("Vui lòng nhập lý do từ chối phương tiện!");
            return;
        }
        rejectMutation.mutate({ id: selectedVehicle.id, reason: rejectReason });
    };

    return {
        pendingVehicles,
        isLoading,
        selectedVehicle,
        isDetailModalOpen,
        setIsDetailModalOpen,
        isRejectModalOpen,
        setIsRejectModalOpen,
        rejectReason,
        setRejectReason,
        handleOpenDetail,
        handleOpenReject,
        handleConfirmApprove,
        handleConfirmReject,
        isApproving: approveMutation.isPending,
        isRejecting: rejectMutation.isPending,
    };
}