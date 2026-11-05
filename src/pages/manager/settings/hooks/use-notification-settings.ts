import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export interface NotificationSettingsConfig {
    enablePush: boolean;
    enableSms: boolean;
    enableEmail: boolean;
    orderCreatedTemplate: string;
    orderAssignedTemplate: string;
    orderCompletedTemplate: string;
}

const MOCK_NOTIF_CONFIG: NotificationSettingsConfig = {
    enablePush: true,
    enableSms: true,
    enableEmail: false,
    orderCreatedTemplate: "Đơn hàng #{OrderCode} của bạn đã được tạo thành công và đang tìm tài xế.",
    orderAssignedTemplate: "Tài xế {DriverName} ({DriverPhone}) đã nhận đơn hàng #{OrderCode} của bạn.",
    orderCompletedTemplate: "Đơn hàng #{OrderCode} đã giao thành công. Cảm ơn bạn đã sử dụng Shiptrack!",
};

export function useNotificationSettings() {
    const queryClient = useQueryClient();

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const { data: config = MOCK_NOTIF_CONFIG, isLoading } = useQuery({
        queryKey: ["admin_notification_config"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_NOTIF_CONFIG;
        },
    });

    const [formData, setFormData] = useState<NotificationSettingsConfig>(config);

    const updateMutation = useMutation({
        mutationFn: async (newConfig: NotificationSettingsConfig) => {
            await new Promise((r) => setTimeout(r, 400));
            Object.assign(MOCK_NOTIF_CONFIG, newConfig);
            return newConfig;
        },
        onSuccess: () => {
            toast.success("Đã cập nhật cấu hình thông báo thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin_notification_config"] });
            setIsConfirmModalOpen(false);
        },
    });

    const handleToggle = (field: "enablePush" | "enableSms" | "enableEmail", val: boolean) => {
        setFormData((prev) => ({ ...prev, [field]: val }));
    };

    const handleTemplateChange = (field: keyof NotificationSettingsConfig, val: string) => {
        setFormData((prev) => ({ ...prev, [field]: val }));
    };

    const handleSaveClick = () => {
        setIsConfirmModalOpen(true);
    };

    const handleConfirmSave = () => {
        updateMutation.mutate(formData);
    };

    return {
        formData: formData.orderCreatedTemplate ? formData : config,
        isLoading,
        handleToggle,
        handleTemplateChange,
        handleSaveClick,
        isConfirmModalOpen,
        setIsConfirmModalOpen,
        handleConfirmSave,
        isPending: updateMutation.isPending,
    };
}