import type { CreateOrderSchemaType } from "@/lib/schemas/order";

export interface OrderRating {
    stars: number;
    comment?: string;
    ratedAt: string;
}

export interface OrderItem {
    id: string;
    trackingCode: string;
    senderAddress: string;
    pickupLat: number;
    pickupLng: number;
    senderName?: string;
    senderPhone?: string;
    receiverAddress: string;
    dropoffLat: number;
    dropoffLng: number;
    receiverName: string;
    receiverPhone: string;
    packageName: string;
    weightKg: number;
    shippingFee: number;

    vehicleType: "MOTORBIKE" | "VAN" | "TRUCK";
    serviceType: string;
    paymentMethod: string;
    isBulky: boolean;
    isDoorDelivery: boolean;
    promotionCode?: string;
    note?: string;
    codAmount: number;
    distanceKm: number;
    distanceFromDriverKm?: number;

    status: "PENDING" | "SEARCHING_DRIVER" | "DELIVERING" | "COMPLETED" | "CANCELLED" | "PICKED_UP" | "DRIVER_ASSIGNED" | "FAILED";
    createdAt: string;
    driverName?: string;
    driverPhone?: string;
    rating?: OrderRating;
}

export interface DriverRatingPayload {
    orderId: string;
    ratingStars: number;
    comment?: string;
    ratingCategories?: {
        attitudeRating?: number;
        speedRating?: number;
        packagingRating?: number;
    };
}

// Map khớp hoàn toàn với C# CreateOrderRequest DTO
export interface CreateOrderPayload extends CreateOrderSchemaType {
    distanceKm?: number;
    shippingFee?: number;
    tipAmount?: number; // Bổ sung tipAmount nếu C# DTO yêu cầu
}

export interface PaginatedOrdersResponse {
    status: string;
    message: string;
    data: {
        total_items: number;
        total_pages: number;
        current_page: number;
        item_per_page: number;
        has_next: boolean;
        has_prev: boolean;
        data: any[]; // Hoặc map trực tiếp sang OrderItem tùy cấu trúc backend trả về
    };

}

export interface OrderDetailResponse {
    status: string;
    message: string;
    data: any;
}

export interface GetOrdersParams {
    page?: number;
    itemPerpage?: number;
    search?: string;
    status?: string;
}