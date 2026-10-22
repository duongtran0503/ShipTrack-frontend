import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Props {
    trackingCode: string
    open: boolean
    onOpenChange: (open: boolean) => void
    reason: string
    onReasonChange: (value: string) => void
    note: string
    onNoteChange: (value: string) => void
    isPending: boolean
    onConfirm: () => void
}

const CANCEL_REASONS = [
    { value: "wrong_info", label: "Đặt nhầm thông tin địa chỉ" },
    { value: "change_mind", label: "Thay đổi ý định không gửi nữa" },
    { value: "slow_driver", label: "Chờ tìm tài xế quá lâu" },
    { value: "other", label: "Lý do khác" },
]

export function CancelOrderDialog({
    trackingCode,
    open,
    onOpenChange,
    reason,
    onReasonChange,
    note,
    onNoteChange,
    isPending,
    onConfirm,
}: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger >
                <Button
                    variant="outline"
                    className="rounded-2xl border-destructive/30 text-destructive hover:bg-destructive/10 font-bold"
                >
                    Hủy đơn hàng
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">
                        Xác nhận hủy đơn hàng?
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                        Bạn có chắc chắn muốn hủy đơn{" "}
                        <strong className="text-foreground">{trackingCode}</strong>? Hành
                        động này không thể hoàn tác.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 py-2">
                    <label className="text-xs font-semibold">Lý do hủy đơn</label>
                    <Select onValueChange={(value) => {
                        if (value) {
                            onReasonChange(value as string)
                        } else {
                            onReasonChange("")
                        }

                    }}>
                        <SelectTrigger className="rounded-xl h-10 text-xs">
                            <SelectValue placeholder="-- Chọn lý do hủy --" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            {CANCEL_REASONS.map((r) => (
                                <SelectItem key={r.value} value={r.value} className="text-xs">
                                    {r.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Textarea
                        placeholder="Ghi chú thêm (Tùy chọn)..."
                        value={note}
                        onChange={(e) => onNoteChange(e.target.value)}
                        className="rounded-xl bg-muted/30 text-xs resize-none"
                    />
                </div>

                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="rounded-xl"
                    >
                        Bỏ qua
                    </Button>
                    <Button
                        variant="destructive"
                        disabled={isPending || !reason}
                        onClick={onConfirm}
                        className="rounded-xl font-bold"
                    >
                        {isPending ? "Đang hủy..." : "Xác nhận hủy"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}