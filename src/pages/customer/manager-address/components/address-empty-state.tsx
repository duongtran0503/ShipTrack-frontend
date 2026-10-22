import { MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"

interface Props {
    onCreate: () => void
}

export function AddressEmptyState({ onCreate }: Props) {
    return (
        <div className="p-12 text-center bg-card rounded-3xl border border-border/60 space-y-3">
            <MapPin className="size-10 text-muted-foreground/50 mx-auto" />
            <p className="text-sm text-muted-foreground">
                Bạn chưa lưu địa chỉ nào!
            </p>
            <Button
                onClick={onCreate}
                className="animate-btn-gradient btn-shine text-white font-bold rounded-xl border-none"
            >
                Thêm địa chỉ ngay
            </Button>
        </div>
    )
}