import { Controller, type UseFormReturn } from "react-hook-form"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { CreateOrderSchemaType } from "@/lib/schemas/order"
import { VehicleTypeSelector } from "./vehicle-type-selector"

interface Props {
    form: UseFormReturn<CreateOrderSchemaType>
}

export function PackageInfoSection({ form }: Props) {
    const {
        control,
        formState: { errors },
    } = form

    return (
        <Card className="rounded-3xl border-border/60 shadow-md">
            <CardHeader className="pb-4 border-b border-border/60">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Badge className="size-6 rounded-full p-0 flex items-center justify-center bg-primary/10 text-primary font-black hover:bg-primary/20">
                        3
                    </Badge>
                    <span>Thông tin kiện hàng & Chọn phương tiện</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
                <VehicleTypeSelector form={form} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <Controller
                        name="packageName"
                        control={control}
                        render={({ field }) => (
                            <Field data-invalid={!!errors.packageName}>
                                <FieldLabel className="text-xs font-semibold">
                                    Tên mặt hàng
                                </FieldLabel>
                                <Input
                                    {...field}
                                    placeholder="Ví dụ: Quần áo, Hồ sơ, Thiết bị điện tử..."
                                    className="h-11 rounded-xl bg-muted/30"
                                />
                                {errors.packageName && (
                                    <FieldError className="px-1 text-xs text-destructive">
                                        {errors.packageName.message}
                                    </FieldError>
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="weightKg"
                        control={control}
                        render={({ field }) => (
                            <Field data-invalid={!!errors.weightKg}>
                                <FieldLabel className="text-xs font-semibold">
                                    Khối lượng ước tính (kg)
                                </FieldLabel>
                                <Input
                                    type="number"
                                    step="0.5"
                                    value={field.value}
                                    onChange={(e) =>
                                        field.onChange(parseFloat(e.target.value) || 0)
                                    }
                                    className="h-11 rounded-xl bg-muted/30"
                                />
                                {errors.weightKg && (
                                    <FieldError className="px-1 text-xs text-destructive">
                                        {errors.weightKg.message}
                                    </FieldError>
                                )}
                            </Field>
                        )}
                    />
                </div>

                <Controller
                    name="note"
                    control={control}
                    render={({ field }) => (
                        <Field>
                            <FieldLabel className="text-xs font-semibold">
                                Ghi chú cho tài xế (Tùy chọn)
                            </FieldLabel>
                            <Textarea
                                {...field}
                                placeholder="Ví dụ: Hàng dễ vỡ xin nhẹ tay, gọi trước khi giao..."
                                className="rounded-xl bg-muted/30 resize-none min-h-[80px]"
                            />
                        </Field>
                    )}
                />
            </CardContent>
        </Card>
    )
}