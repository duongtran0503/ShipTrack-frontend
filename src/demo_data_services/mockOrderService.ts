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

    status: "PENDING" | "SEARCHING_DRIVER" | "DELIVERING" | "COMPLETED" | "CANCELLED" | "PICKED_UP" | "DRIVER_ASSIGNED" | "FAILED";
    createdAt: string;
    driverName?: string;
    driverPhone?: string;
    rating?: OrderRating;
}

export interface DriverRatingPayload {
    orderId: string;
    ratingStars: number; // 1 -> 5 sao
    comment?: string;
    ratingCategories?: {
        attitudeRating?: number; // Thái độ phục vụ
        speedRating?: number;    // Tốc độ giao hàng
        packagingRating?: number; // Bảo quản hàng hóa
    };
}

export interface CreateOrderPayload {
    senderAddress: string;
    pickupLat: number;
    pickupLng: number;
    senderName: string;
    senderPhone: string;
    dropoffAddress: string;
    dropoffLat: number;
    dropoffLng: number;
    receiverName: string;
    receiverPhone: string;
    packageDetails: string;
    weightKg: number;
    vehicleType: "MOTORBIKE" | "VAN" | "TRUCK";
    serviceType: string;
    paymentMethod: string;
    isBulky: boolean;
    isDoorDelivery: boolean;
    promotionCode?: string;
    note?: string;
    codAmount: number;
    distanceKm?: number;
    shippingFee?: number;
}

const ORDERS_STORAGE_KEY = "shiptrack_customer_orders";

const initMockOrders = (): OrderItem[] => {
    const existing = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (existing) return JSON.parse(existing);

    const defaultOrders: OrderItem[] = [

    ];

    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(defaultOrders));
    return defaultOrders;
};

export const mockOrderService = {
    // Lấy danh sách đơn hàng
    getRecentOrders: async (): Promise<OrderItem[]> => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        return initMockOrders();
    },

    // Thống kê cho Customer Dashboard
    getDashboardStats: async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const orders = initMockOrders();

        const activeOrders = orders.filter(
            (o) => o.status === "DELIVERING" || o.status === "SEARCHING_DRIVER" || o.status === "PENDING"
        ).length;

        const completedOrders = orders.filter((o) => o.status === "COMPLETED").length;

        const totalSpent = orders
            .filter((o) => o.status === "COMPLETED")
            .reduce((sum, o) => sum + o.shippingFee, 0);

        return {
            totalOrders: orders.length,
            activeOrders,
            completedOrders,
            totalSpent,
        };
    },

    // Tạo đơn hàng mới
    createOrder: async (payload: CreateOrderSchemaType & { distanceKm?: number; shippingFee?: number }): Promise<OrderItem> => {



        // Map chính xác các trường từ payload (đã khớp với Zod Schema) sang OrderItem
        const newOrder: OrderItem = {
            id: `ord_${Date.now()}`,
            trackingCode: `ST-${Math.floor(10000 + Math.random() * 90000)}`,

            senderAddress: payload.senderAddress,
            pickupLat: payload.pickupLat,
            pickupLng: payload.pickupLng,
            senderName: payload.senderName,
            senderPhone: payload.senderPhone,

            receiverAddress: payload.dropoffAddress, // map dropoff -> receiverAddress
            dropoffLat: payload.dropoffLat,
            dropoffLng: payload.dropoffLng,
            receiverName: payload.receiverName,
            receiverPhone: payload.receiverPhone,

            packageName: payload.packageDetails,
            weightKg: payload.weightKg,
            vehicleType: payload.vehicleType,
            serviceType: payload.serviceType,
            paymentMethod: payload.paymentMethod,
            isBulky: payload.isBulky,
            isDoorDelivery: payload.isDoorDelivery,
            promotionCode: payload.promotionCode,
            note: payload.note,
            codAmount: payload.codAmount,

            shippingFee: payload.shippingFee || 0,
            distanceKm: payload.distanceKm || 0,
            status: "SEARCHING_DRIVER",
            createdAt: new Date().toISOString(),
        };

        console.log("data:", newOrder)

        return newOrder;
    },

    // Hủy đơn hàng
    cancelOrder: async (orderId: string): Promise<{ message: string }> => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const orders = initMockOrders();
        const index = orders.findIndex((o) => o.id === orderId);

        if (index !== -1) {
            orders[index].status = "CANCELLED";
            localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
        }

        return { message: "Hủy đơn hàng thành công!" };
    },

    // Gửi đánh giá tài xế
    submitDriverRating: async (payload: DriverRatingPayload): Promise<{ message: string }> => {
        await new Promise((resolve) => setTimeout(resolve, 600));

        const orders = initMockOrders();
        const index = orders.findIndex((o) => o.id === payload.orderId);

        if (index !== -1) {
            orders[index].rating = {
                stars: payload.ratingStars,
                comment: payload.comment,
                ratedAt: new Date().toISOString(),
            };
            localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
        }

        return { message: "Cảm ơn bạn đã gửi đánh giá!" };
    },
};