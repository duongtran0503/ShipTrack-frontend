import { Truck } from "lucide-react";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { VehicleRegisterFormValues } from "../hooks/use-vehicle-register";

interface Props {
    watch: UseFormWatch<VehicleRegisterFormValues>;
    setValue: UseFormSetValue<VehicleRegisterFormValues>;
}

const VEHICLE_TYPES = [
    { id: "MOTORBIKE", label: "Xe máy" },
    { id: "CAR", label: "Ô tô" },
    { id: "TRUCK", label: "Xe tải" },
] as const;

export function VehicleTypeSelector({ watch, setValue }: Props) {
    const currentType = watch("vehicleType");

    return (
        <div className="space-y-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                Loại phương tiện <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-3 gap-4">
                {VEHICLE_TYPES.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setValue("vehicleType", item.id, { shouldValidate: true })}
                        className={`p-4 rounded-2xl border font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${currentType === item.id
                            ? "border-primary bg-primary/10 text-primary shadow-sm"
                            : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
                            }`}
                    >
                        <Truck className="size-6" />
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}