import { ArrowLeft, PackagePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
} from "@/components/ui/card"

interface Props {
    onBack: () => void
}

export function CreateOrderHeader({ onBack }: Props) {
    return (
        <Card className="rounded-3xl border-border/30 bg-transparent shadow-none">
            <CardContent className="p-2 px-4 space-y-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBack}
                        className="gap-1.5 text-xs text-muted-foreground hover:text-primary p-0 h-auto cursor-pointer"
                    >
                        <ArrowLeft className="size-3.5" /> Trang tổng quan
                    </Button>
                    <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
                        <PackagePlus className="size-6 text-primary" />
                        <span>Tạo đơn hàng vận chuyển mới</span>
                    </h1>
                    <CardDescription>
                        Nhập thông tin điểm lấy, điểm giao và kiện hàng để nhận báo giá tự
                        động.
                    </CardDescription>
                </div>
            </CardContent>
        </Card>
    )
}