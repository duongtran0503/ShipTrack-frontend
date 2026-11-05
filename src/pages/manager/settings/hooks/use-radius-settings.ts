import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export interface DriverRadiusConfig {
    maxRadiusKm: number; // Bán kính tìm kiếm tối đa (km)
    maxDriversToNotify: number; // Số lượng tài xế tối đa nhận thông báo đơn hàng
    dispatchWaitSeconds: number; // Thời gian chờ tài xế xác nhận đơn (giây)
    expandRadiusStepKm: number; // Bước nhảy mở rộng bán kính khi không có tài xế nhận (km)
}

const MOCK_RADIUS_CONFIG: DriverRadiusConfig = {
    maxRadiusKm: 10,
    maxDriversToNotify: 5,
    dispatchWaitSeconds: 30,
    expandRadiusStepKm: 3,
};

export function useRadiusSettings() {
    const queryClient = useQueryClient();

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const { data: config = MOCK_RADIUS_CONFIG, isLoading } = useQuery({
        queryKey: ["admin_radius_config"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_RADIUS_CONFIG;
        },
    });

    const [formData, setFormData] = useState<DriverRadiusConfig>(config);

    const updateMutation = useMutation({
        mutationFn: async (newConfig: DriverRadiusConfig) => {
            await new Promise((r) => setTimeout(r, 400));
            Object.assign(MOCK_RADIUS_CONFIG, newConfig);
            return newConfig;
        },
        onSuccess: () => {
            toast.success("Đã cập nhật cấu hình bán kính tìm tài xế thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin_radius_config"] });
            setIsConfirmModalOpen(false);
        },
    });

    const handleFormChange = (field: keyof DriverRadiusConfig, value: number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value < 1 ? 1 : value,
        }));
    };

    const handleSaveClick = () => {
        if (formData.maxRadiusKm <= 0 || formData.maxDriversToNotify <= 0) {
            toast.error("Bán kính và số lượng tài xế phải lớn hơn 0!");
            return;
        }
        setIsConfirmModalOpen(true);
    };

    const handleConfirmSave = () => {
        updateMutation.mutate(formData);
    };

    return {
        formData: formData.maxRadiusKm ? formData : config,
        isLoading,
        handleFormChange,
        handleSaveClick,
        isConfirmModalOpen,
        setIsConfirmModalOpen,
        handleConfirmSave,
        isPending: updateMutation.isPending,
    };
}