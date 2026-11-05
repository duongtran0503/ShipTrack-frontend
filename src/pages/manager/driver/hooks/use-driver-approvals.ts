import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import type { DriverResponse } from "../hooks/use-admin-drivers";

export interface DriverApprovalResponse extends DriverResponse {
    LicenseNumber?: string;
    LicenseExpiryDate?: string;
    VehicleType?: "MOTORBIKE" | "VAN" | "TRUCK" | "CONTAINER"; // Bổ sung VehicleType khớp backend enum
    VehicleBrand?: string;
    VehicleModel?: string;
    RegisteredAt?: string;
    FrontLicenseImageUrl?: string;
    BackLicenseImageUrl?: string;
}

const MOCK_PENDING_DRIVERS: DriverApprovalResponse[] = [
    {
        Id: 8,
        UserId: 8,
        Name: "Đỗ Văn Nam",
        Email: "nam.do@gmail.com",
        Role: "Driver",
        Phone: "0908887766",
        LicensePlate: "29-A1 444.88",
        LicenseNumber: "B2-7982341",
        LicenseExpiryDate: "2028-05-12",
        VehicleType: "MOTORBIKE", // Bổ sung giá trị
        VehicleBrand: "Honda",
        VehicleModel: "Wave Alpha 2024",
        ApprovalStatus: "PENDING",
        RegisteredAt: "2026-11-03 14:15",
        AvatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
        FrontLicenseImageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
        BackLicenseImageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
        Balance: 0,
        IsActive: true,
        Online: false,
    },
    {
        Id: 9,
        UserId: 9,
        Name: "Bùi Thị Lan",
        Email: "lan.bui@gmail.com",
        Role: "Driver",
        Phone: "0934556677",
        LicensePlate: "50-H2 112.33",
        LicenseNumber: "C-1294821",
        LicenseExpiryDate: "2027-11-20",
        VehicleType: "VAN", // Bổ sung giá trị
        VehicleBrand: "Yamaha",
        VehicleModel: "Exciter 155",
        ApprovalStatus: "PENDING",
        RegisteredAt: "2026-11-04 09:30",
        AvatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
        FrontLicenseImageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
        BackLicenseImageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
        Balance: 0,
        IsActive: true,
        Online: false,
    },
];

export function useDriverApprovals() {
    const queryClient = useQueryClient();

    const [selectedDriver, setSelectedDriver] = useState<DriverApprovalResponse | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

    // State Modal Từ chối (cần lý do)
    const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);
    const [rejectReason, setRejectReason] = useState<string>("");

    // Query danh sách chờ duyệt
    const { data: pendingDrivers = MOCK_PENDING_DRIVERS, isLoading } = useQuery({
        queryKey: ["admin_driver_approvals"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_PENDING_DRIVERS;
        },
    });

    // Mutation Duyệt hồ sơ
    const approveMutation = useMutation({
        mutationFn: async (id: number) => {
            await new Promise((r) => setTimeout(r, 400));
            const index = MOCK_PENDING_DRIVERS.findIndex((d) => d.Id === id);
            if (index !== -1) {
                MOCK_PENDING_DRIVERS.splice(index, 1);
            }
            return id;
        },
        onSuccess: () => {
            toast.success("Đã duyệt hồ sơ tài xế thành công! Hệ thống đã gửi thông báo kích hoạt.");
            queryClient.invalidateQueries({ queryKey: ["admin_driver_approvals"] });
            setIsDetailModalOpen(false);
            setSelectedDriver(null);
        },
    });

    // Mutation Từ chối hồ sơ (có lý do)
    const rejectMutation = useMutation({
        mutationFn: async ({ id, reason }: { id: number; reason: string }) => {
            await new Promise((r) => setTimeout(r, 400));
            const index = MOCK_PENDING_DRIVERS.findIndex((d) => d.Id === id);
            if (index !== -1) {
                MOCK_PENDING_DRIVERS.splice(index, 1);
            }
            return { id, reason };
        },
        onSuccess: () => {
            toast.success("Đã từ chối hồ sơ và gửi thông báo lý do về cho tài xế.");
            queryClient.invalidateQueries({ queryKey: ["admin_driver_approvals"] });
            setIsRejectModalOpen(false);
            setIsDetailModalOpen(false);
            setSelectedDriver(null);
            setRejectReason("");
        },
    });

    const handleOpenDetail = (driver: DriverApprovalResponse) => {
        setSelectedDriver(driver);
        setIsDetailModalOpen(true);
    };

    const handleOpenReject = (driver: DriverApprovalResponse) => {
        setSelectedDriver(driver);
        setRejectReason("");
        setIsRejectModalOpen(true);
    };

    const handleConfirmApprove = (id: number) => {
        approveMutation.mutate(id);
    };

    const handleConfirmReject = () => {
        if (!selectedDriver) return;
        if (!rejectReason.trim()) {
            toast.error("Vui lòng nhập lý do từ chối hồ sơ tài xế!");
            return;
        }
        rejectMutation.mutate({ id: selectedDriver.Id, reason: rejectReason });
    };

    return {
        pendingDrivers,
        isLoading,
        selectedDriver,
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