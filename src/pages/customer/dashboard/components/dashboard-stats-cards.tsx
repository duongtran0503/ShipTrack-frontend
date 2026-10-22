import { PackageCheck, PackagePlus, Truck, Wallet } from "lucide-react"

import { StatCard } from "./stat-card"

interface Stats {
    activeOrders?: number
    completedOrders?: number
    totalOrders?: number
    totalSpent?: number
}

interface Props {
    stats: Stats | undefined
    isLoading: boolean
}

export function DashboardStatsCards({ stats, isLoading }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
                label="Đơn đang hoạt động"
                value={stats?.activeOrders}
                hint="Đang tìm tài xế hoặc đang trên đường giao"
                icon={Truck}
                isLoading={isLoading}
                iconBgClass="bg-blue-500/10 text-blue-600 dark:text-blue-400"
            />

            <StatCard
                label="Đơn đã hoàn thành"
                value={stats?.completedOrders}
                hint="Đơn hàng thành công trong hệ thống"
                icon={PackageCheck}
                isLoading={isLoading}
                iconBgClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            />

            <StatCard
                label="Tổng số đơn hàng"
                value={stats?.totalOrders}
                hint="Lịch sử toàn bộ đơn đã khởi tạo"
                icon={PackagePlus}
                isLoading={isLoading}
                iconBgClass="bg-primary/10 text-primary"
            />

            <StatCard
                label="Tổng chi phí vận chuyển"
                value={`${(stats?.totalSpent || 0).toLocaleString("vi-VN")} đ`}
                hint="Tính trên các đơn hoàn thành thành công"
                icon={Wallet}
                isLoading={isLoading}
                iconBgClass="bg-amber-500/10 text-amber-600 dark:text-amber-400"
                valueClass="text-shiptrack-price"
            />
        </div>
    )
}