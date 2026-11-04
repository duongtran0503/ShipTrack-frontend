import { apiClient } from "@/lib/config/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export interface ServiceAreaResponse {
    id: number;
    driverId: number;
    name: string;
    centerLat: number;
    centerLng: number;
    radiusKm: number;
    isDefault: boolean;
    isActive: boolean;
    createdAtUtc: string;
}

// Khớp hoàn toàn với UpsertServiceAreaRequest ở backend
export interface UpsertServiceAreaRequest {
    name: string;
    centerLat: number;
    centerLng: number;
    radiusKm: number;
    isDefault: boolean;
    isActive: boolean;
}

export function useDriverServiceAreas() {
    const queryClient = useQueryClient();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingArea, setEditingArea] = useState<ServiceAreaResponse | null>(null);

    // 1. GET /api/driver/service-areas
    const { data: serviceAreas, isLoading } = useQuery({
        queryKey: ["driver_service_areas"],
        queryFn: async () => {
            const response = await apiClient.get("/driver/service-areas");
            return (response.data.data || response.data) as ServiceAreaResponse[];
        },
    });

    // 2. POST /api/driver/service-areas & PUT /api/driver/service-areas/{id}
    const upsertMutation = useMutation({
        mutationFn: async (payload: UpsertServiceAreaRequest & { id?: number }) => {
            if (payload.id) {
                const res = await apiClient.put(`/driver/service-areas/${payload.id}`, payload);
                return res.data;
            } else {
                const res = await apiClient.post("/driver/service-areas", payload);
                return res.data;
            }
        },
        onSuccess: (_data, variables) => {
            toast.success(variables.id ? "Cập nhật vùng phục vụ thành công!" : "Thêm vùng phục vụ thành công!");
            queryClient.invalidateQueries({ queryKey: ["driver_service_areas"] });
            closeModal();
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Không thể lưu vùng phục vụ!");
        },
    });

    // 3. DELETE /api/driver/service-areas/{id}
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await apiClient.delete(`/driver/service-areas/${id}`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Đã xóa vùng phục vụ thành công.");
            queryClient.invalidateQueries({ queryKey: ["driver_service_areas"] });
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Không thể xóa vùng phục vụ!");
        },
    });

    const openCreateModal = () => {
        setEditingArea(null);
        setIsCreateModalOpen(true);
    };

    const openEditModal = (area: ServiceAreaResponse) => {
        setEditingArea(area);
        setIsCreateModalOpen(true);
    };

    const closeModal = () => {
        setIsCreateModalOpen(false);
        setEditingArea(null);
    };

    const handleToggleActive = async (area: ServiceAreaResponse, newActiveState: boolean) => {
        try {
            await upsertMutation.mutateAsync({
                id: area.id,
                name: area.name,
                centerLat: area.centerLat,
                centerLng: area.centerLng,
                radiusKm: area.radiusKm,
                isDefault: area.isDefault,
                isActive: newActiveState,
            });
            toast.success(newActiveState ? "Đã kích hoạt vùng phục vụ" : "Đã tạm dừng vùng phục vụ");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            // Lỗi đã được xử lý ở mutation onError
        }
    };

    const handleSetDefault = async (area: ServiceAreaResponse) => {
        try {
            await upsertMutation.mutateAsync({
                id: area.id,
                name: area.name,
                centerLat: area.centerLat,
                centerLng: area.centerLng,
                radiusKm: area.radiusKm,
                isDefault: true, // Đặt cờ mặc định thành true
                isActive: area.isActive,
            });
            toast.success("Đã đặt làm vùng phục vụ mặc định!");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            // Lỗi đã được xử lý ở mutation onError
        }
    };

    return {
        serviceAreas: serviceAreas || [],
        isLoading,
        isCreateModalOpen,
        editingArea,
        openCreateModal,
        openEditModal,
        closeModal,
        saveServiceArea: upsertMutation.mutateAsync,
        isSaving: upsertMutation.isPending,
        deleteServiceArea: (id: number) => deleteMutation.mutate(id),
        toggleActive: handleToggleActive,
        setDefaultArea: handleSetDefault,
    };
}