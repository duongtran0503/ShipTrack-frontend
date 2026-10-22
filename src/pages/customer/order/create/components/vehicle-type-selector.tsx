import {
    Bike,
    Building2,
    CheckCircle2,
    Truck,
} from "lucide-react"
import { Controller, type UseFormReturn } from "react-hook-form"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { CreateOrderSchemaType } from "@/lib/schemas/order"

const VEHICLES = [
    {
        id: "MOTORBIKE",
        label: "Xe máy",
        icon: Bike,
        desc: "Dưới 30kg - Nhanh gọn",
    },
    {
        id: "VAN",
        label: "Xe Van",
        icon: Building2,
        desc: "Dưới 500kg - Đồ đạc lớn",
    },
    {
        id: "TRUCK",
        label: "Xe Tải",
        icon: Truck,
        desc: "Dưới 2 tấn - Chuyển nhà",
    },
] as const

interface Props {
    form: UseFormReturn<CreateOrderSchemaType>
}

export function VehicleTypeSelector({ form }: Props) {
    const { control } = form

    return (
        <div className="space-y-2">
            <Label className="text-xs font-semibold">Loại phương tiện vận chuyển</Label>
            <Controller
                name="vehicleType"
                control={control}
                render={({ field }) => (
                    <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="grid grid-cols-3 gap-3"
                    >
                        {VEHICLES.map((v) => {
                            const Icon = v.icon
                            const isSelected = field.value === v.id
                            return (
                                <Label
                                    key={v.id}
                                    htmlFor={v.id}
                                    className={`p-3.5 rounded-2xl border flex flex-col justify-between space-y-2 cursor-pointer transition-all ${isSelected
                                        ? "bg-primary/10 border-primary text-primary ring-1 ring-primary/30"
                                        : "bg-muted/30 border-border text-foreground hover:border-border"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <RadioGroupItem
                                            value={v.id}
                                            id={v.id}
                                            className="sr-only"
                                        />
                                        <Icon className="size-5" />
                                        {isSelected && (
                                            <CheckCircle2 className="size-4 text-primary" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold">{v.label}</p>
                                        <p className="text-[10px] text-muted-foreground">
                                            {v.desc}
                                        </p>
                                    </div>
                                </Label>
                            )
                        })}
                    </RadioGroup>
                )}
            />
        </div>
    )
}