export interface UserType {
    id: string
    name: string
    email: string
    address: string
    phone: string
    role: "admin" | "user" | "editor"
    active: boolean
    createdAt: string
}

export const UserTypeDefaultValue: UserType = {
    id: "",
    name: "",
    email: "",
    address: "",
    phone: "",
    role: "user",
    active: true,
    createdAt: "",
}

// 10 user mẫu — static data
export const MOCK_USERS: UserType[] = [
    {
        id: "1",
        name: "Nguyễn Văn An",
        email: "an.nguyen@example.com",
        address: "123 Lê Lợi, Quận 1, TP.HCM",
        phone: "0901234567",
        role: "admin",
        active: true,
        createdAt: "2024-01-15",
    },
    {
        id: "2",
        name: "Trần Thị Bình",
        email: "binh.tran@example.com",
        address: "456 Nguyễn Huệ, Quận 3, TP.HCM",
        phone: "0902345678",
        role: "user",
        active: true,
        createdAt: "2024-02-20",
    },
    {
        id: "3",
        name: "Lê Hoàng Cường",
        email: "cuong.le@example.com",
        address: "789 Hai Bà Trưng, Quận 1, TP.HCM",
        phone: "0903456789",
        role: "editor",
        active: false,
        createdAt: "2024-03-10",
    },
    {
        id: "4",
        name: "Phạm Minh Dũng",
        email: "dung.pham@example.com",
        address: "321 Võ Văn Tần, Quận 3, TP.HCM",
        phone: "0904567890",
        role: "user",
        active: true,
        createdAt: "2024-04-05",
    },
    {
        id: "5",
        name: "Hoàng Thị Em",
        email: "em.hoang@example.com",
        address: "654 Cách Mạng Tháng 8, Quận 10, TP.HCM",
        phone: "0905678901",
        role: "user",
        active: false,
        createdAt: "2024-05-12",
    },
    {
        id: "6",
        name: "Vũ Văn Phúc",
        email: "phuc.vu@example.com",
        address: "987 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
        phone: "0906789012",
        role: "editor",
        active: true,
        createdAt: "2024-06-18",
    },
    {
        id: "7",
        name: "Đặng Thị Giang",
        email: "giang.dang@example.com",
        address: "147 Lý Thường Kiệt, Quận Tân Bình, TP.HCM",
        phone: "0907890123",
        role: "user",
        active: true,
        createdAt: "2024-07-22",
    },
    {
        id: "8",
        name: "Bùi Văn Hải",
        email: "hai.bui@example.com",
        address: "258 Trường Chinh, Quận Tân Phú, TP.HCM",
        phone: "0908901234",
        role: "admin",
        active: false,
        createdAt: "2024-08-30",
    },
    {
        id: "9",
        name: "Ngô Thị Inh",
        email: "inh.ngo@example.com",
        address: "369 Phan Xích Long, Quận Phú Nhuận, TP.HCM",
        phone: "0909012345",
        role: "user",
        active: true,
        createdAt: "2024-09-14",
    },
    {
        id: "10",
        name: "Đỗ Văn Khánh",
        email: "khanh.do@example.com",
        address: "741 Nguyễn Văn Cừ, Quận 5, TP.HCM",
        phone: "0910123456",
        role: "editor",
        active: true,
        createdAt: "2024-10-01",
    },
]