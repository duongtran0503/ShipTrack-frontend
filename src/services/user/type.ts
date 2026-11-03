

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



export interface CustomerAddress {
    id: string | number;
    ownerId?: number;
    label: string;
    contactName: string;
    contactPhone: string;
    fullAddress: string;
    isDefault: boolean;
    lat: number;
    lng: number;
}

export interface AddressResponse {
    status: string;
    message: string;
    data: CustomerAddress[] | CustomerAddress;
}