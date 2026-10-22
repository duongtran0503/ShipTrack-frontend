import { MapPin, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

interface Props {
    onCreate: () => void
}

export function AddressHeader({ onCreate }: Props) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-transparent border border-border/30">
            <div>
                <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="size-5 text-primary" />
                    <span>Danh sách địa chỉ nhận & lấy hàng</span>
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                    Quản lý danh sách địa chỉ giúp bạn tạo đơn hàng nhanh chóng chỉ với 1
                    cú click.
                </p>
            </div>

            <Button
                onClick={onCreate}
                className="gap-2 text-white animate-btn-gradient btn-shine font-bold rounded-2xl cursor-pointer border-none py-5 px-5"
            >
                <Plus className="size-4" />
                <span>Thêm địa chỉ mới</span>
            </Button>
        </div>
    )
}