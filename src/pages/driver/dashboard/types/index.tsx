

export interface DriverStats {
    isOnline: boolean;
    activeOrdersCount: number;
    completedTodayCount: number;
    todayEarnings: number;
    averageRating: number;
}

export interface Notification {
    title?: string;
    message?: string;
    content?: string;
    time?: string;
}