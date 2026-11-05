import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import type { DriverResponse } from "../hooks/use-admin-drivers";

export interface DriverVehicleDetail {
    id: number;
    vehicleType: "MOTORBIKE" | "VAN" | "TRUCK" | "CONTAINER";
    licensePlate: string;
    brand?: string;
    color?: string;
    maxWeightKg?: number;
    isDefault: boolean;
    isVerified: boolean;
}

export interface DriverServiceAreaDetail {
    id: number;
    name: string;
    radiusKm: number;
    isDefault: boolean;
    isActive: boolean;
}

export interface DriverDetailType extends DriverResponse {
    Address?: string;
    LicenseNumber?: string;
    LicenseExpiryDate?: string; // Định dạng YYYY-MM-DD để tính thời gian hết hạn
    FrontLicenseImageUrl?: string;
    BackLicenseImageUrl?: string;
    Vehicles?: DriverVehicleDetail[];
    ServiceAreas?: DriverServiceAreaDetail[];
    TotalIncome?: number;
    RatingAvg?: number;
    TotalTrips?: number;
    HistoryTrips?: {
        id: string;
        trackingCode: string;
        income: number;
        completedAt: string;
        customerName: string;
    }[];
}

const MOCK_DRIVER_DETAIL_MAP: Record<number, DriverDetailType> = {
    2: {
        Id: 2,
        UserId: 2,
        Name: "Phạm Hoàng Long",
        Email: "long.pham@gmail.com",
        Role: "Driver",
        Phone: "0912345678",
        Address: "12 Võ Văn Kiệt, Phường Nguyễn Thái Bình, Quận 1, TP.HCM",
        LicensePlate: "59-G1 123.45",
        LicenseNumber: "B2-7918234",
        LicenseExpiryDate: "2026-11-20", // Sắp hết hạn (cách ngày hiện tại 2026-11-04 chỉ 16 ngày) -> Kích hoạt cảnh báo!
        FrontLicenseImageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
        BackLicenseImageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
        Balance: 1250000,
        IsActive: true,
        Online: true,
        ApprovalStatus: "APPROVED",
        DeliveryStatus: "DELIVERING",
        RatingAvg: 4.85,
        TotalTrips: 142,
        TotalIncome: 18450000,
        CreatedAt: "2026-10-05",
        AvatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
        Vehicles: [
            { id: 1, vehicleType: "MOTORBIKE", licensePlate: "59-G1 123.45", brand: "Honda AirBlade", color: "Đen", maxWeightKg: 50, isDefault: true, isVerified: true },
            { id: 2, vehicleType: "VAN", licensePlate: "59-D2 999.11", brand: "Thaco Towner", color: "Trắng", maxWeightKg: 950, isDefault: false, isVerified: true },
        ],
        ServiceAreas: [
            { id: 1, name: "Quận 1, TP.HCM", radiusKm: 10, isDefault: true, isActive: true },
            { id: 2, name: "Quận 5, TP.HCM", radiusKm: 8, isDefault: false, isActive: true },
        ],
        HistoryTrips: [
            { id: "201", trackingCode: "TRK-C77D88", income: 45000, completedAt: "2026-11-03 15:20", customerName: "Nguyễn Văn A" },
            { id: "202", trackingCode: "TRK-D44E11", income: 65000, completedAt: "2026-11-04 10:15", customerName: "Trần Thị C" },
        ],
    },
    4: {
        Id: 4,
        UserId: 4,
        Name: "Vũ Minh Tuấn",
        Email: "tuan.vu@gmail.com",
        Role: "Driver",
        Phone: "0987654321",
        Address: "45 Lê Duẩn, Bến Nghé, Quận 1, TP.HCM",
        LicensePlate: "59-C2 678.90",
        LicenseNumber: "C-9921823",
        LicenseExpiryDate: "2028-08-15", // Còn hạn dài
        FrontLicenseImageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
        BackLicenseImageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
        Balance: 3400000,
        IsActive: true,
        Online: true,
        ApprovalStatus: "APPROVED",
        DeliveryStatus: "ONLINE",
        RatingAvg: 4.92,
        TotalTrips: 218,
        TotalIncome: 32100000,
        CreatedAt: "2026-10-15",
        AvatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
        Vehicles: [
            { id: 3, vehicleType: "TRUCK", licensePlate: "59-C2 678.90", brand: "Isuzu QKR", color: "Xanh", maxWeightKg: 1900, isDefault: true, isVerified: true },
        ],
        ServiceAreas: [
            { id: 3, name: "Toàn TP.HCM", radiusKm: 30, isDefault: true, isActive: true },
        ],
        HistoryTrips: [
            { id: "203", trackingCode: "TRK-E11F99", income: 250000, completedAt: "2026-11-04 14:00", customerName: "Công ty Logistics ABC" },
        ],
    },
};

export function useAdminDriverDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const driverId = Number(id) || 2;

    const [isBanModalOpen, setIsBanModalOpen] = useState<boolean>(false);
    const [banReason, setBanReason] = useState<string>("");

    const { data: driver = MOCK_DRIVER_DETAIL_MAP[driverId] || MOCK_DRIVER_DETAIL_MAP[2], isLoading } = useQuery({
        queryKey: ["admin_driver_detail", driverId],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_DRIVER_DETAIL_MAP[driverId] || MOCK_DRIVER_DETAIL_MAP[2];
        },
    });

    // Mutation Khóa / Mở khóa tài xế
    const toggleActiveMutation = useMutation({
        mutationFn: async ({ isActive, reason }: { isActive: boolean; reason?: string }) => {
            await new Promise((r) => setTimeout(r, 400));
            // eslint-disable-next-line react-hooks/immutability
            driver.IsActive = isActive;
            driver.BanReason = reason || "";
            driver.Online = isActive ? driver.Online : false;
            return driver;
        },
        onSuccess: (_data, variables) => {
            toast.success(variables.isActive ? "Đã mở khóa tài xế thành công!" : "Đã khóa tài xế thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin_driver_detail", driverId] });
            setIsBanModalOpen(false);
            setBanReason("");
        },
    });

    const handleBack = () => navigate("/manager/drivers");
    const goToMap = () => navigate(`/manager/drivers/map?driverId=${driverId}`);

    const handleToggleDriverStatus = () => {
        const nextState = !driver.IsActive;
        if (!nextState && !banReason.trim()) {
            toast.error("Vui lòng nhập lý do khóa tài xế!");
            return;
        }
        toggleActiveMutation.mutate({ isActive: nextState, reason: banReason });
    };

    // Hàm tính toán kiểm tra bằng lái sắp hết hạn (Ví dụ: dưới 30 ngày hoặc đã quá hạn)
    const getLicenseExpiryWarning = (expiryDateStr?: string) => {
        if (!expiryDateStr) return { status: "NORMAL", message: "Chưa cập nhật hạn GPLX" };
        const expiryDate = new Date(expiryDateStr);
        const currentDate = new Date("2026-11-04"); // Thời điểm hiện tại hệ thống
        const diffTime = expiryDate.getTime() - currentDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return { status: "EXPIRED", message: `Bằng lái đã hết hạn từ ${Math.abs(diffDays)} ngày trước!` };
        } else if (diffDays <= 30) {
            return { status: "WARNING", message: `Cảnh báo: Bằng lái sắp hết hạn trong ${diffDays} ngày tới (${expiryDateStr})!` };
        }
        return { status: "NORMAL", message: `Bằng lái còn hạn (Hạn: ${expiryDateStr})` };
    };

    return {
        driver,
        isLoading,
        handleBack,
        goToMap,
        isBanModalOpen,
        setIsBanModalOpen,
        banReason,
        setBanReason,
        handleToggleDriverStatus,
        isPending: toggleActiveMutation.isPending,
        licenseWarning: getLicenseExpiryWarning(driver.LicenseExpiryDate),
    };
}