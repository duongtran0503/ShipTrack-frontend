import type { RegisterSchemaType } from "@/lib/schemas/auth/register";

export interface MockUser {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: "SUPER_ADMIN" | "DRIVER" | "CUSTOMER";
    licenseNumber?: string;
    vehicleType?: string;
    licensePlate?: string;
}

export interface LoginResponse {
    username: string;
    role: "SUPER_ADMIN" | "DRIVER" | "CUSTOMER";
    email: string;
    accessToken: string;
    refreshToken: string;
}

const USERS_STORAGE_KEY = "shiptrack_mock_users";
const TOKEN_STORAGE_KEY = "accessToken";
const REFRESH_TOKEN_STORAGE_KEY = "refreshToken";
const USER_ROLE_STORAGE_KEY = "role";
const CURRENT_USER_STORAGE_KEY = "shiptrack_current_user";

const initMockUsers = (): MockUser[] => {
    const existing = localStorage.getItem(USERS_STORAGE_KEY);
    if (existing) return JSON.parse(existing);

    const defaultUsers: MockUser[] = [
        {
            id: "usr_admin",
            fullName: "Super Admin ShipTrack",
            email: "admin@shiptrack.com",
            phone: "0901234567",
            role: "SUPER_ADMIN",
        },
        {
            id: "usr_driver",
            fullName: "Tài Xế Nguyễn Văn A",
            email: "driver@shiptrack.com",
            phone: "0912345678",
            role: "DRIVER",
            licenseNumber: "GPLX-99812",
            vehicleType: "MOTORBIKE",
            licensePlate: "59-X1 888.88",
        },
        {
            id: "usr_customer",
            fullName: "Khách Hàng Trần Thị B",
            email: "customer@shiptrack.com",
            phone: "0923456789",
            role: "CUSTOMER",
        },
    ];

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
};

export const mockAuthService = {
    register: async (data: RegisterSchemaType): Promise<{ message: string; user: MockUser }> => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const users = initMockUsers();
        const existingUser = users.find((u) => u.email === data.email);

        if (existingUser) {
            throw new Error("Email này đã tồn tại trên hệ thống!");
        }

        const newUser: MockUser = {
            id: `usr_${Date.now()}`,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            role: data.role,
            licenseNumber: data.licenseNumber,
            vehicleType: data.vehicleType,
            licensePlate: data.licensePlate,
        };

        users.push(newUser);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

        return {
            message: "Đăng ký thành công!",
            user: newUser,
        };
    },

    // Mock Đăng nhập cập nhật trả về đúng cấu trúc yêu cầu
    login: async (email: string): Promise<LoginResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const users = initMockUsers();
        const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            throw new Error("Tài khoản không tồn tại. Thử tài khoản test: admin@shiptrack.com, driver@shiptrack.com, hoặc customer@shiptrack.com");
        }

        const accessToken = `mock_access_token_${user.role.toLowerCase()}_${Date.now()}`;
        const refreshToken = `mock_refresh_token_${user.role.toLowerCase()}_${Date.now()}`;

        // Lưu dữ liệu vào localStorage
        localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
        localStorage.setItem(USER_ROLE_STORAGE_KEY, user.role);
        localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));

        return {
            username: user.fullName,
            role: user.role,
            email: user.email,
            accessToken,
            refreshToken,
        };
    },

    logout: () => {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
        localStorage.removeItem(USER_ROLE_STORAGE_KEY);
        localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    },


    // Mock Quên mật khẩu - Gửi email nhận mã / link reset
    forgotPassword: async (email: string): Promise<{ message: string; resetToken: string }> => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const users = initMockUsers();
        const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            throw new Error("Không tìm thấy tài khoản với địa chỉ email này!");
        }

        // Tạo fake reset token
        const resetToken = `mock_reset_token_${Date.now()}`;
        localStorage.setItem("shiptrack_reset_token", resetToken);
        localStorage.setItem("shiptrack_reset_email", user.email);

        return {
            message: "Yêu cầu đặt lại mật khẩu đã được gửi đến email của bạn!",
            resetToken,
        };
    },

    // Mock Đặt lại mật khẩu mới
    resetPassword: async (password: string, token: string): Promise<{ message: string }> => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const savedToken = localStorage.getItem("shiptrack_reset_token");
        if (!savedToken || savedToken !== token) {
            throw new Error("Mã xác nhận không hợp lệ hoặc đã hết hạn!");
        }

        // Dọn dẹp token sau khi sử dụng thành công
        localStorage.removeItem("shiptrack_reset_token");
        localStorage.removeItem("shiptrack_reset_email");

        return {
            message: "Đặt lại mật khẩu thành công! Vui lòng đăng nhập bằng mật khẩu mới.",
        };
    },


    // Lấy thông tin user hiện tại
    getCurrentUser: (): MockUser | null => {
        const data = localStorage.getItem("shiptrack_current_user");
        return data ? JSON.parse(data) : null;
    },

    // Mock cập nhật hồ sơ cá nhân
    updateProfile: async (updatedData: Partial<MockUser>): Promise<{ message: string; user: MockUser }> => {
        await new Promise((resolve) => setTimeout(resolve, 600));

        const currentUser = mockAuthService.getCurrentUser();
        if (!currentUser) throw new Error("Phiên làm việc hết hạn. Vui lòng đăng nhập lại!");

        const newUserData: MockUser = {
            ...currentUser,
            ...updatedData,
        };

        // Cập nhật lại trong danh sách Users
        const usersData = localStorage.getItem("shiptrack_mock_users");
        if (usersData) {
            const users: MockUser[] = JSON.parse(usersData);
            const index = users.findIndex((u) => u.id === currentUser.id);
            if (index !== -1) {
                users[index] = newUserData;
                localStorage.setItem("shiptrack_mock_users", JSON.stringify(users));
            }
        }

        // Cập nhật lại user hiện tại
        localStorage.setItem("shiptrack_current_user", JSON.stringify(newUserData));

        return {
            message: "Cập nhật thông tin cá nhân thành công!",
            user: newUserData,
        };
    },

    // Mock đổi mật khẩu
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    changePassword: async (_oldPass: string, _newPass: string): Promise<{ message: string }> => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        return {
            message: "Đổi mật khẩu thành công!",
        };
    },
};