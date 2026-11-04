import { apiClient } from "@/lib/config/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export interface DriverVehicleItem {
    id: number;
    driverId: number;
    vehicleType: "MOTORBIKE" | "CAR" | "TRUCK";
    licensePlate: string;
    brand?: string;
    color?: string;
    maxWeightKg?: number;
    isDefault: boolean;
    isVerified: boolean;
    createdAtUtc: string;
}

export interface UpsertVehicleRequest {
    vehicleType: "MOTORBIKE" | "CAR" | "TRUCK";
    licensePlate: string;
    brand?: string;
    color?: string;
    maxWeightKg?: number;
}

export function useDriverVehicle() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // 1. GET /api/driver/vehicles — Lấy danh sách và sắp xếp isVerified lên đầu
    const { data: rawVehicles, isLoading } = useQuery({
        queryKey: ["driver_vehicles_list"],
        queryFn: async () => {
            const response = await apiClient.get("/driver/vehicles");
            const list = (response.data.data || response.data) as DriverVehicleItem[];

            // 🔥 Sắp xếp: isVerified = true lên đầu tiên, sau đó ưu tiên isDefault
            return list.sort((a, b) => {
                if (a.isVerified === b.isVerified) {
                    return (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0);
                }
                return a.isVerified ? -1 : 1;
            });
        },
    });

    const vehicles = rawVehicles || [];
    const defaultVehicle = vehicles.find((v) => v.isDefault) || vehicles[0] || null;

    // 2. POST /api/driver/vehicles — Đăng ký xe mới
    const registerMutation = useMutation({
        mutationFn: async (payload: UpsertVehicleRequest) => {
            const res = await apiClient.post("/driver/vehicles", payload);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Thêm phương tiện mới thành công!");
            queryClient.invalidateQueries({ queryKey: ["driver_vehicles_list"] });
            queryClient.invalidateQueries({ queryKey: ["driver_availability"] });
            navigate("/driver/vehicles");
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Không thể thêm phương tiện!");
        },
    });

    // 3. POST /api/driver/vehicles/{id}/set-default — Đặt xe mặc định để chạy đơn
    const setDefaultMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await apiClient.post(`/driver/vehicles/${id}/set-default`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Đã chọn phương tiện mặc định thành công!");
            queryClient.invalidateQueries({ queryKey: ["driver_vehicles_list"] });
            queryClient.invalidateQueries({ queryKey: ["driver_availability"] });
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Không thể đặt xe mặc định!");
        },
    });

    // 4. DELETE /api/driver/vehicles/{id} — Xóa phương tiện
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await apiClient.delete(`/driver/vehicles/${id}`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Đã xóa phương tiện thành công.");
            queryClient.invalidateQueries({ queryKey: ["driver_vehicles_list"] });
            queryClient.invalidateQueries({ queryKey: ["driver_availability"] });
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Không thể xóa phương tiện này!");
        },
    });

    return {
        vehicles,
        vehicle: defaultVehicle,
        defaultVehicle,
        isLoading,
        registerVehicle: registerMutation.mutateAsync,
        setDefaultVehicle: (id: number) => setDefaultMutation.mutate(id),
        deleteVehicle: (id: number) => deleteMutation.mutate(id),
        isSubmitting: registerMutation.isPending || setDefaultMutation.isPending || deleteMutation.isPending,
    };
}