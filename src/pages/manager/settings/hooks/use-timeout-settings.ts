import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export interface SystemTimeoutConfig {
    driverAcceptTimeoutMinutes: number; // Thời gian chờ tài xế nhận/xác nhận đơn (phút)
    maxDeliveryTimeHours: number; // Thời gian giao hàng tối đa cho phép (giờ)
    autoCancelUnassignedMinutes: number; // Thời gian tự động hủy đơn nếu không có tài xế nhận (phút)
    driverInactiveTimeoutMinutes: number; // Thời gian tự động chuyển offline khi tài xế mất tín hiệu (phút)
}

const MOCK_TIMEOUT_CONFIG: SystemTimeoutConfig = {
    driverAcceptTimeoutMinutes: 3,
    maxDeliveryTimeHours: 4,
    autoCancelUnassignedMinutes: 15,
    driverInactiveTimeoutMinutes: 10,
};

export function useTimeoutSettings() {
    const queryClient = useQueryClient();

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const { data: config = MOCK_TIMEOUT_CONFIG, isLoading } = useQuery({
        queryKey: ["admin_timeout_config"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_TIMEOUT_CONFIG;
        },
    });

    const [formData, setFormData] = useState<SystemTimeoutConfig>(config);

    const updateMutation = useMutation({
        mutationFn: async (newConfig: SystemTimeoutConfig) => {
            await new Promise((r) => setTimeout(r, 400));
            Object.assign(MOCK_TIMEOUT_CONFIG, newConfig);
            return newConfig;
        },
        onSuccess: () => {
            toast.success("Đã cập nhật cấu hình thời gian timeout thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin_timeout_config"] });
            setIsConfirmModalOpen(false);
        },
    });

    const handleFormChange = (field: keyof SystemTimeoutConfig, value: number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value < 1 ? 1 : value,
        }));
    };

    const handleSaveClick = () => {
        setIsConfirmModalOpen(true);
    };

    const handleConfirmSave = () => {
        updateMutation.mutate(formData);
    };

    return {
        formData: formData.driverAcceptTimeoutMinutes ? formData : config,
        isLoading,
        handleFormChange,
        handleSaveClick,
        isConfirmModalOpen,
        setIsConfirmModalOpen,
        handleConfirmSave,
        isPending: updateMutation.isPending,
    };
}