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

    status: "PENDING" | "SEARCHING_DRIVER" | "DELIVERING" | "COMPLETED" | "CANCELLED";
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
        {
            id: "ord_101",
            trackingCode: "ST-88291",
            senderAddress: "Kho Tổng Q.1, TP. Hồ Chí Minh",
            pickupLat: 10.7769,
            pickupLng: 106.7009,
            senderName: "Kho tổng ShipTrack",
            senderPhone: "0901234567",
            receiverAddress: "123 Nguyễn Thị Minh Khai, Q.3, TP. Hồ Chí Minh",
            dropoffLat: 10.7829,
            dropoffLng: 106.6852,
            receiverName: "Nguyễn Văn Cường",
            receiverPhone: "0987654321",
            packageName: "Tài liệu hợp đồng & Hồ sơ",
            weightKg: 0.5,
            shippingFee: 25000,
            vehicleType: "MOTORBIKE",
            serviceType: "STANDARD",
            paymentMethod: "CASH",
            isBulky: false,
            isDoorDelivery: true,
            codAmount: 0,
            distanceKm: 3.5,
            status: "DELIVERING",
            createdAt: "2026-10-21T09:30:00Z",
            driverName: "Nguyễn Văn A (Tài xế)",
            driverPhone: "0912345678",
        },
        {
            id: "ord_102",
            trackingCode: "ST-88290",
            senderAddress: "45 Lê Lợi, Q.1, TP. Hồ Chí Minh",
            pickupLat: 10.7743,
            pickupLng: 106.7012,
            senderName: "Cửa hàng Quần áo",
            senderPhone: "0902345678",
            receiverAddress: "789 Điện Biên Phủ, Q. Bình Thạnh, TP. Hồ Chí Minh",
            dropoffLat: 10.8014,
            dropoffLng: 106.7123,
            receiverName: "Lê Thị Hoa",
            receiverPhone: "0912345678",
            packageName: "Giày thể thao Nike",
            weightKg: 1.2,
            shippingFee: 35000,
            vehicleType: "MOTORBIKE",
            serviceType: "FAST",
            paymentMethod: "BANK_TRANSFER",
            isBulky: false,
            isDoorDelivery: true,
            codAmount: 500000,
            distanceKm: 5.2,
            status: "COMPLETED",
            createdAt: "2026-10-20T14:15:00Z",
            driverName: "Trần Đình B",
            driverPhone: "0923456789",
        },
        {
            id: "ord_103",
            trackingCode: "ST-88289",
            senderAddress: "12 Võ Văn Kiệt, Q.1, TP. Hồ Chí Minh",
            pickupLat: 10.7689,
            pickupLng: 106.6987,
            senderName: "Kho hàng Linh kiện",
            senderPhone: "0903456789",
            receiverAddress: "56 Nguyễn Trãi, Q.5, TP. Hồ Chí Minh",
            dropoffLat: 10.7551,
            dropoffLng: 106.6689,
            receiverName: "Phạm Minh Tuấn",
            receiverPhone: "0934567890",
            packageName: "Thùng Linh Kiện Điện Tử",
            weightKg: 3.5,
            shippingFee: 55000,
            vehicleType: "VAN",
            serviceType: "STANDARD",
            paymentMethod: "CASH",
            isBulky: true,
            isDoorDelivery: true,
            codAmount: 1200000,
            distanceKm: 4.1,
            status: "SEARCHING_DRIVER",
            createdAt: "2026-10-21T10:10:00Z",
        },
        {
            id: "ord_104",
            trackingCode: "ST-88288",
            senderAddress: "88 Lý Tự Trọng, Q.1, TP. Hồ Chí Minh",
            pickupLat: 10.7781,
            pickupLng: 106.7025,
            senderName: "Shop Mỹ Phẩm",
            senderPhone: "0904567890",
            receiverAddress: "234 Hoàng Diệu, Q.4, TP. Hồ Chí Minh",
            dropoffLat: 10.7589,
            dropoffLng: 106.7054,
            receiverName: "Đỗ Hoàng Long",
            receiverPhone: "0978123456",
            packageName: "Mỹ phẩm quà tặng",
            weightKg: 0.8,
            shippingFee: 30000,
            vehicleType: "MOTORBIKE",
            serviceType: "STANDARD",
            paymentMethod: "CASH",
            isBulky: false,
            isDoorDelivery: true,
            codAmount: 0,
            distanceKm: 2.8,
            status: "CANCELLED",
            createdAt: "2026-10-19T16:45:00Z",
        },
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