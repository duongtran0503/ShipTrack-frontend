import {
    Building2,
    CheckCircle2,
    Home,
    Pencil,
    Star,
    Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import type { CustomerAddress } from "@/demo_data_services/mockAddressService"

interface Props {
    address: CustomerAddress
    onEdit: (addr: CustomerAddress) => void
    onDelete: (id: string) => void
    onSetDefault: (id: string) => void
}

export function AddressCard({
    address,
    onEdit,
    onDelete,
    onSetDefault,
}: Props) {
    const isCompany = address.label.includes("Công ty")

    return (
        <div
            className={`relative p-5 rounded-3xl bg-card border transition-all flex flex-col justify-between space-y-4 shadow-sm ${address.isDefault
                ? "border-primary/60 shadow-primary/10 ring-1 ring-primary/30"
                : "border-border/60 hover:border-border"
                }`}
        >
            <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <span className="p-2 rounded-xl bg-accent text-primary">
                            {isCompany ? (
                                <Building2 className="size-4" />
                            ) : (
                                <Home className="size-4" />
                            )}
                        </span>
                        <h3 className="font-bold text-foreground text-sm">
                            {address.label}
                        </h3>
                    </div>

                    {address.isDefault && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                            <CheckCircle2 className="size-3" /> Mặc định
                        </span>
                    )}
                </div>

                <div className="text-xs space-y-1 pt-1">
                    <p className="font-semibold text-foreground">
                        {address.contactName}{" "}
                        <span className="text-muted-foreground">
                            ({address.contactPhone})
                        </span>
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        {address.fullAddress}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs">
                {!address.isDefault ? (
                    <button
                        type="button"
                        onClick={() => onSetDefault(address.id)}
                        className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary font-semibold transition-colors cursor-pointer"
                    >
                        <Star className="size-3.5" />
                        <span>Đặt làm mặc định</span>
                    </button>
                ) : (
                    <span className="text-[11px] text-muted-foreground font-medium">
                        Địa chỉ ưu tiên
                    </span>
                )}

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(address)}
                        className="size-8 p-0 rounded-xl hover:bg-accent hover:text-primary"
                    >
                        <Pencil className="size-3.5" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(address.id)}
                        className="size-8 p-0 rounded-xl hover:bg-destructive/10 hover:text-destructive"
                    >
                        <Trash2 className="size-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}