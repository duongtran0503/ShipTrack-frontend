import { Plus, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"

interface Props {
    onCreateOrder: () => void
}

export function DashboardWelcomeBanner({ onCreateOrder }: Props) {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-(image:--background-image-shiptrack-gradient) p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="relative z-10 space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold backdrop-blur-md border border-white/20">
                    <Truck className="size-3.5" />
                    <span>Cổng Khách Hàng ShipTrack</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                    Giao hàng nhanh chóng & Theo dõi tức thì!
                </h1>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                    Tạo đơn vận chuyển trong vài giây, tra cứu hành trình real-time và
                    quản lý toàn bộ đơn hàng của bạn một cách dễ dàng.
                </p>
            </div>

            <div className="relative z-10 w-full md:w-auto shrink-0">
                <Button
                    size="lg"
                    onClick={onCreateOrder}
                    className="w-full md:w-auto gap-2 bg-white text-primary hover:bg-white/90 font-bold rounded-2xl shadow-lg border-none cursor-pointer py-6 px-6 transition-transform active:scale-95"
                >
                    <Plus className="size-5 text-primary" />
                    <span>Tạo đơn hàng mới</span>
                </Button>
            </div>

            {/* Họa tiết trang trí */}
            <div className="absolute -top-16 -right-16 size-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 size-80 rounded-full bg-black/20 blur-3xl pointer-events-none" />
        </div>
    )
}