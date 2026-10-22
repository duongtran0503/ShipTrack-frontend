export interface CustomerOrderType {
    id: string
    trackingCode: string
    packageName: string
    senderAddress: string
    receiverAddress: string
    receiverName: string
    receiverPhone: string
    shippingFee: number
    status: "PENDING" | "SEARCHING_DRIVER" | "DELIVERING" | "COMPLETED" | "CANCELLED"
    createdAt: string
    driverName?: string
}

export const MOCK_CUSTOMER_ORDERS: CustomerOrderType[] = [
    {
        id: "ord_101",
        trackingCode: "ST-88291",
        packageName: "Tài liệu hợp đồng & Hồ sơ",
        senderAddress: "Kho Tổng Q.1, TP. Hồ Chí Minh",
        receiverAddress: "123 Nguyễn Thị Minh Khai, Q.3, TP. Hồ Chí Minh",
        receiverName: "Nguyễn Văn Cường",
        receiverPhone: "0987654321",
        shippingFee: 25000,
        status: "DELIVERING",
        createdAt: "2026-10-21 09:30",
        driverName: "Nguyễn Văn A (Tài xế)",
    },
    {
        id: "ord_102",
        trackingCode: "ST-88290",
        packageName: "Giày thể thao Nike",
        senderAddress: "45 Lê Lợi, Q.1, TP. Hồ Chí Minh",
        receiverAddress: "789 Điện Biên Phủ, Q. Bình Thạnh, TP. Hồ Chí Minh",
        receiverName: "Lê Thị Hoa",
        receiverPhone: "0912345678",
        shippingFee: 35000,
        status: "COMPLETED",
        createdAt: "2026-10-20 14:15",
        driverName: "Trần Đình B",
    },
    {
        id: "ord_103",
        trackingCode: "ST-88289",
        packageName: "Thùng Linh Kiện Điện Tử",
        senderAddress: "12 Võ Văn Kiệt, Q.1, TP. Hồ Chí Minh",
        receiverAddress: "56 Nguyễn Trãi, Q.5, TP. Hồ Chí Minh",
        receiverName: "Phạm Minh Tuấn",
        receiverPhone: "0934567890",
        shippingFee: 55000,
        status: "SEARCHING_DRIVER",
        createdAt: "2026-10-21 10:10",
    },
    {
        id: "ord_104",
        trackingCode: "ST-88288",
        packageName: "Mỹ phẩm quà tặng",
        senderAddress: "88 Lý Tự Trọng, Q.1, TP. Hồ Chí Minh",
        receiverAddress: "234 Hoàng Diệu, Q.4, TP. Hồ Chí Minh",
        receiverName: "Đỗ Hoàng Long",
        receiverPhone: "0978123456",
        shippingFee: 30000,
        status: "CANCELLED",
        createdAt: "2026-10-19 16:45",
    },
    {
        id: "ord_105",
        trackingCode: "ST-88287",
        packageName: "Quần áo thời trang",
        senderAddress: "15 Lê Lai, Q.1, TP. Hồ Chí Minh",
        receiverAddress: "99 Cách Mạng Tháng 8, Q.10, TP. Hồ Chí Minh",
        receiverName: "Nguyễn Thị Mai",
        receiverPhone: "0905123456",
        shippingFee: 28000,
        status: "PENDING",
        createdAt: "2026-10-21 11:20",
    },
]