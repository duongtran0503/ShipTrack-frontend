export interface OrderRating {
    stars: number;
    comment?: string;
    ratedAt: string;
}

export interface OrderItem {
    id: string;
    trackingCode: string;
    senderAddress: string;
    senderName?: string;
    senderPhone?: string;
    receiverAddress: string;
    receiverName: string;
    receiverPhone: string;
    packageName: string;
    weightKg: number;
    shippingFee: number;
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
    senderName: string;
    senderPhone: string;
    receiverAddress: string;
    receiverName: string;
    receiverPhone: string;
    packageName: string;
    weightKg: number;
    vehicleType: "MOTORBIKE" | "VAN" | "TRUCK";
    note?: string;
    codAmount?: number;
    distanceKm: number;
    shippingFee: number;
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
            senderName: "Kho tổng ShipTrack",
            senderPhone: "0901234567",
            receiverAddress: "123 Nguyễn Thị Minh Khai, Q.3, TP. Hồ Chí Minh",
            receiverName: "Nguyễn Văn Cường",
            receiverPhone: "0987654321",
            packageName: "Tài liệu hợp đồng & Hồ sơ",
            weightKg: 0.5,
            shippingFee: 25000,
            status: "DELIVERING",
            createdAt: "2026-10-21T09:30:00Z",
            driverName: "Nguyễn Văn A (Tài xế)",
            driverPhone: "0912345678",
        },
        {
            id: "ord_102",
            trackingCode: "ST-88290",
            senderAddress: "45 Lê Lợi, Q.1, TP. Hồ Chí Minh",
            senderName: "Cửa hàng Quần áo",
            senderPhone: "0902345678",
            receiverAddress: "789 Điện Biên Phủ, Q. Bình Thạnh, TP. Hồ Chí Minh",
            receiverName: "Lê Thị Hoa",
            receiverPhone: "0912345678",
            packageName: "Giày thể thao Nike",
            weightKg: 1.2,
            shippingFee: 35000,
            status: "COMPLETED",
            createdAt: "2026-10-20T14:15:00Z",
            driverName: "Trần Đình B",
            driverPhone: "0923456789",
        },
        {
            id: "ord_103",
            trackingCode: "ST-88289",
            senderAddress: "12 Võ Văn Kiệt, Q.1, TP. Hồ Chí Minh",
            senderName: "Kho hàng Linh kiện",
            senderPhone: "0903456789",
            receiverAddress: "56 Nguyễn Trãi, Q.5, TP. Hồ Chí Minh",
            receiverName: "Phạm Minh Tuấn",
            receiverPhone: "0934567890",
            packageName: "Thùng Linh Kiện Điện Tử",
            weightKg: 3.5,
            shippingFee: 55000,
            status: "SEARCHING_DRIVER",
            createdAt: "2026-10-21T10:10:00Z",
        },
        {
            id: "ord_104",
            trackingCode: "ST-88288",
            senderAddress: "88 Lý Tự Trọng, Q.1, TP. Hồ Chí Minh",
            senderName: "Shop Mỹ Phẩm",
            senderPhone: "0904567890",
            receiverAddress: "234 Hoàng Diệu, Q.4, TP. Hồ Chí Minh",
            receiverName: "Đỗ Hoàng Long",
            receiverPhone: "0978123456",
            packageName: "Mỹ phẩm quà tặng",
            weightKg: 0.8,
            shippingFee: 30000,
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
    createOrder: async (payload: CreateOrderPayload): Promise<OrderItem> => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const existingData = localStorage.getItem(ORDERS_STORAGE_KEY);
        const orders: OrderItem[] = existingData ? JSON.parse(existingData) : [];

        const newOrder: OrderItem = {
            id: `ord_${Date.now()}`,
            trackingCode: `ST-${Math.floor(10000 + Math.random() * 90000)}`,
            senderAddress: payload.senderAddress,
            senderName: payload.senderName,
            senderPhone: payload.senderPhone,
            receiverAddress: payload.receiverAddress,
            receiverName: payload.receiverName,
            receiverPhone: payload.receiverPhone,
            packageName: payload.packageName,
            weightKg: payload.weightKg,
            shippingFee: payload.shippingFee,
            status: "SEARCHING_DRIVER",
            createdAt: new Date().toISOString(),
        };

        orders.unshift(newOrder);
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));

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