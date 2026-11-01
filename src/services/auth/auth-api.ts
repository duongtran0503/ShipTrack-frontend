import { apiClient } from "@/lib/config/axios";
import type { LoginShemaType } from "@/lib/schemas/auth/login";
import type { RegisterSchemaType } from "@/lib/schemas/auth/register";
import type { LoginResponse, MockUser } from "@/services/auth/type";

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
            fullName: "Quản trị Demo",
            email: "admin@demo.local",
            phone: "0900000000",
            role: "SUPER_ADMIN",
            licensePlate: "",
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
            licensePlate: "",
        },
    ];

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
};

export const authApi = {
    // POST /auth/register
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

    // POST /auth/login
    login: async (credentials: LoginShemaType): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>("/auth/login", credentials);
        return response.data;
    },

    // POST /auth/logout
    logout: () => {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
        localStorage.removeItem(USER_ROLE_STORAGE_KEY);
        localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    },

    // POST /auth/forgot-password
    forgotPassword: async (email: string): Promise<{ message: string; resetToken: string }> => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const users = initMockUsers();
        const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            throw new Error("Không tìm thấy tài khoản với địa chỉ email này!");
        }

        const resetToken = `mock_reset_token_${Date.now()}`;
        localStorage.setItem("shiptrack_reset_token", resetToken);
        localStorage.setItem("shiptrack_reset_email", user.email);

        return {
            message: "Yêu cầu đặt lại mật khẩu đã được gửi đến email của bạn!",
            resetToken,
        };
    },

    // POST /auth/reset-password
    resetPassword: async (_password: string, token: string): Promise<{ message: string }> => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const savedToken = localStorage.getItem("shiptrack_reset_token");
        if (!savedToken || savedToken !== token) {
            throw new Error("Mã xác nhận không hợp lệ hoặc đã hết hạn!");
        }

        localStorage.removeItem("shiptrack_reset_token");
        localStorage.removeItem("shiptrack_reset_email");

        return {
            message: "Đặt lại mật khẩu thành công! Vui lòng đăng nhập bằng mật khẩu mới.",
        };
    },

    // GET /users/me
    getCurrentUser: (): MockUser | null => {
        const data = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    },

    // PUT /users/me
    updateProfile: async (updatedData: Partial<MockUser>): Promise<{ message: string; user: MockUser }> => {
        await new Promise((resolve) => setTimeout(resolve, 600));

        const currentUser = authApi.getCurrentUser();
        if (!currentUser) throw new Error("Phiên làm việc hết hạn. Vui lòng đăng nhập lại!");

        const newUserData: MockUser = {
            ...currentUser,
            ...updatedData,
        };

        const usersData = localStorage.getItem(USERS_STORAGE_KEY);
        if (usersData) {
            const users: MockUser[] = JSON.parse(usersData);
            const index = users.findIndex((u) => u.id === currentUser.id);
            if (index !== -1) {
                users[index] = newUserData;
                localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
            }
        }

        localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(newUserData));

        return {
            message: "Cập nhật thông tin cá nhân thành công!",
            user: newUserData,
        };
    },

    // POST /auth/change-password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    changePassword: async (_oldPass: string, _newPass: string): Promise<{ message: string }> => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        return {
            message: "Đổi mật khẩu thành công!",
        };
    },
};