import { Lock, Truck } from "lucide-react";

interface Props {
    vehicleTypeLabel: string;
}

export function VehicleReadonlyInfo({ vehicleTypeLabel }: Props) {
    return (
        <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Truck className="size-5" />
                </div>
                <div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">Loại phương tiện (Cố định)</span>
                    <strong className="text-sm font-bold text-foreground">{vehicleTypeLabel}</strong>
                </div>
            </div>
            <span className="text-xs text-muted-foreground bg-card px-3 py-1.5 rounded-xl border border-border/60 flex items-center gap-1.5 font-semibold">
                <Lock className="size-3.5 text-primary" /> Không thể thay đổi
            </span>
        </div>
    );
}