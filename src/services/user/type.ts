

export interface UserProfileResponse {
    status: string;
    message: string;
    data: {
        id: number;
        userId: number;
        name: string;
        email: string;
        role: string;
        phone: string;
        licensePlate: string;
        balance: number;
        isActive: boolean;
        banReason: string;
        online: boolean;
    };
}

export interface DashboardStatsResponse {
    status: string;
    message: string;
    data: {
        activeOrders: number;
        completedOrders: number;
        totalOrders: number;
        totalSpent: number;
    };
}

