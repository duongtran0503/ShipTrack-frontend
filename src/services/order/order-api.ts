import { apiClient } from "@/lib/config/axios";
import type { CreateOrderPayload, GetOrdersParams, OrderDetailResponse, OrderItem, PaginatedOrdersResponse } from "@/services/order/type";

export const orderApi = {
    createOrder: async (payload: CreateOrderPayload): Promise<OrderItem> => {
        const requestBody = {
            PickupAddress: payload.senderAddress,
            DropoffAddress: payload.dropoffAddress,
            PickupLat: payload.pickupLat,
            PickupLng: payload.pickupLng,
            DropoffLat: payload.dropoffLat,
            DropoffLng: payload.dropoffLng,
            VehicleType: payload.vehicleType,
            ServiceType: payload.serviceType,
            SenderName: payload.senderName,
            SenderPhone: payload.senderPhone,
            ReceiverName: payload.receiverName,
            ReceiverPhone: payload.receiverPhone,
            PackageName: payload.packageDetails || "Hàng hóa thông thường", // Đảm bảo không trống
            WeightKg: payload.weightKg,
            PackageDetails: payload.packageDetails,
            Note: payload.note || "",
            PaymentMethod: payload.paymentMethod,
            IsBulky: payload.isBulky,
            IsDoorDelivery: payload.isDoorDelivery,
            TipAmount: payload.tipAmount || 0,
            CodAmount: payload.codAmount || 0,
            PromotionCode: payload.promotionCode || "",
        };

        const response = await apiClient.post<OrderItem>("/orders", requestBody);
        return response.data;
    },

    // GET /api/orders (Lấy danh sách đơn hàng phân trang, tìm kiếm)
    getOrders: async (params: GetOrdersParams): Promise<PaginatedOrdersResponse> => {
        const response = await apiClient.get<PaginatedOrdersResponse>("/orders/my-orders", {
            params: {
                page: params.page || 1,
                itemPerpage: params.itemPerpage || 10,
                search: params.search || "",
                status: params.status || "",
            },
        });

        return response as unknown as PaginatedOrdersResponse;
    },

    getOrderById: async (id: string | number): Promise<OrderDetailResponse> => {
        const response = await apiClient.get<OrderDetailResponse>(`/orders/${id}`);
        return response as unknown as OrderDetailResponse;
    },
};