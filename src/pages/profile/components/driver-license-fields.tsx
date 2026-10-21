import { Truck } from "lucide-react"
import { Controller, type Control } from "react-hook-form"

import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { ProfileSchemaType } from "@/lib/schemas/user/profile"

interface Props {
    control: Control<ProfileSchemaType>
}

export function DriverLicenseFields({ control }: Props) {
    return (
        <div className="space-y-4 pt-2 border-t border-border/60">
            <div className="flex items-center gap-2 text-sm font-bold text-primary">
                <Truck className="size-4" />
                <span>Hồ sơ Phương tiện & Bằng lái (Tài xế)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Controller
                    name="licenseNumber"
                    control={control}
                    render={({ field }) => (
                        <Field>
                            <FieldLabel className="text-xs font-semibold">
                                Số GPLX / Bằng lái
                            </FieldLabel>
                            <Input
                                {...field}
                                placeholder="Số bằng lái xe"
                                className="h-11 rounded-xl border-border bg-muted/30 px-4 text-sm"
                            />
                        </Field>
                    )}
                />

                <Controller
                    name="vehicleType"
                    control={control}
                    render={({ field }) => (
                        <Field>
                            <FieldLabel className="text-xs font-semibold">
                                Loại phương tiện
                            </FieldLabel>
                            <select
                                {...field}
                                className="h-11 w-full rounded-xl border border-border bg-muted/30 px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="MOTORBIKE">Xe máy</option>
                                <option value="VAN">Xe Tải Nhỏ / Van</option>
                                <option value="TRUCK">Xe Tải Lớn</option>
                            </select>
                        </Field>
                    )}
                />

                <Controller
                    name="licensePlate"
                    control={control}
                    render={({ field }) => (
                        <Field>
                            <FieldLabel className="text-xs font-semibold">Biển số xe</FieldLabel>
                            <Input
                                {...field}
                                placeholder="Biển số xe đăng ký"
                                className="h-11 rounded-xl border-border bg-muted/30 px-4 text-sm"
                            />
                        </Field>
                    )}
                />
            </div>
        </div>
    )
}