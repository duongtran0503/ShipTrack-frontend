import { apiClient } from "@/lib/config/axios";
import type { ChangePasswordSchemaType, ProfileSchemaType } from "@/lib/schemas/user/profile";
import type { DashboardStatsResponse, UserProfileResponse } from "@/services/user/type";

export const userApi = {
    getProfile: async (): Promise<UserProfileResponse> => {
        const response = await apiClient.get<UserProfileResponse>("/users/me");
        console.log(response, "dsjfakjsdfhsklj")

        return response as unknown as UserProfileResponse;
    },

    updateProfile: async (data: ProfileSchemaType): Promise<{ message: string }> => {
        // Backend yêu cầu trường 'name', còn schema của bạn dùng 'fullName' -> Map lại ở đây
        const response = await apiClient.put<{ message: string }>("/users/me", {
            name: data.fullName,
            phone: data.phone,
        });
        return response.data as unknown as { message: string };
    },

    // POST /api/auth/change-password (hoặc endpoint tương ứng trên backend của bạn)
    changePassword: async (data: ChangePasswordSchemaType): Promise<{ message: string }> => {
        // Ánh xạ sang PascalCase đúng với ChangePasswordRequest của C# DTO
        const requestBody = {
            CurrentPassword: data.oldPassword,
            NewPassword: data.newPassword,
            ConfirmPassword: data.confirmPassword,
        };

        const response = await apiClient.post<{ message: string }>("/users/me/change-password", requestBody);
        return response.data as unknown as { message: string };
    },

    // Thêm hàm lấy thống kê dashboard
    getDashboardStats: async () => {
        const response = await apiClient.get<DashboardStatsResponse>("/users/dashboard-stats");
        return response as unknown as DashboardStatsResponse; // Trả về toàn bộ response hoặc response.data tùy cấu trúc interceptor của bạn
    },
};