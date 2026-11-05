import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export interface ShippingFeeConfig {
    baseFee: number; // Phí cơ bản (VD: 15,000đ cho 2km đầu)
    baseDistanceKm: number; // Số km cơ bản
    pricePerKm: number; // Phí mỗi km tiếp theo (VD: 5,000đ/km)
    peakHourSurcharge: number; // Phụ phí giờ cao điểm (%)
    nightSurcharge: number; // Phụ phí ban đêm (đ)
    heavyWeightSurcharge: number; // Phụ phí cồng kềnh (đ/kg)
}

const MOCK_FEE_CONFIG: ShippingFeeConfig = {
    baseFee: 15000,
    baseDistanceKm: 2,
    pricePerKm: 5500,
    peakHourSurcharge: 20, // +20%
    nightSurcharge: 10000,
    heavyWeightSurcharge: 2000,
};

export function useShippingFeeSettings() {
    const queryClient = useQueryClient();

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    // State dùng cho công cụ xem trước (Preview Calculator)
    const [previewDistance, setPreviewDistance] = useState<number>(5);
    const [previewWeight, setPreviewWeight] = useState<number>(10);
    const [isPeakHour, setIsPeakHour] = useState<boolean>(false);
    const [isNightTime, setIsNightTime] = useState<boolean>(false);

    const { data: config = MOCK_FEE_CONFIG, isLoading } = useQuery({
        queryKey: ["admin_shipping_fee_config"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_FEE_CONFIG;
        },
    });

    const [formData, setFormData] = useState<ShippingFeeConfig>(config);

    // Mutation Cập nhật cấu hình
    const updateConfigMutation = useMutation({
        mutationFn: async (newConfig: ShippingFeeConfig) => {
            await new Promise((r) => setTimeout(r, 400));
            Object.assign(MOCK_FEE_CONFIG, newConfig);
            return newConfig;
        },
        onSuccess: () => {
            toast.success("Đã cập nhật cấu hình phí vận chuyển thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin_shipping_fee_config"] });
            setIsConfirmModalOpen(false);
        },
    });

    const handleFormChange = (field: keyof ShippingFeeConfig, value: number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value < 0 ? 0 : value,
        }));
    };

    const handleSaveClick = () => {
        // Validation dữ liệu cơ bản
        if (formData.baseFee <= 0 || formData.pricePerKm <= 0) {
            toast.error("Phí cơ bản và phí mỗi km phải lớn hơn 0!");
            return;
        }
        setIsConfirmModalOpen(true);
    };

    const handleConfirmSave = () => {
        updateConfigMutation.mutate(formData);
    };

    // Tính toán ước tính cước phí preview
    const calculatePreviewFee = () => {
        const targetConfig = formData || config;
        let total = targetConfig.baseFee;

        // Phí vượt km cơ bản
        if (previewDistance > targetConfig.baseDistanceKm) {
            const extraKm = previewDistance - targetConfig.baseDistanceKm;
            total += extraKm * targetConfig.pricePerKm;
        }

        // Phụ phí giờ cao điểm (%)
        if (isPeakHour) {
            total += (total * targetConfig.peakHourSurcharge) / 100;
        }

        // Phụ phí ban đêm
        if (isNightTime) {
            total += targetConfig.nightSurcharge;
        }

        // Phụ phí trọng lượng (vượt quá 5kg)
        if (previewWeight > 5) {
            total += (previewWeight - 5) * targetConfig.heavyWeightSurcharge;
        }

        return Math.round(total);
    };

    return {
        formData: formData.baseFee ? formData : config,
        isLoading,
        handleFormChange,
        handleSaveClick,
        isConfirmModalOpen,
        setIsConfirmModalOpen,
        handleConfirmSave,
        isPending: updateConfigMutation.isPending,
        // Preview State
        previewDistance,
        setPreviewDistance,
        previewWeight,
        setPreviewWeight,
        isPeakHour,
        setIsPeakHour,
        isNightTime,
        setIsNightTime,
        previewTotalFee: calculatePreviewFee(),
    };
}