import { Controller, type UseFormReturn } from "react-hook-form"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
                    <span>Thông tin kiện hàng & Dịch vụ</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
                {/* Chọn loại phương tiện */}
                <VehicleTypeSelector form={form} />

                {/* Chi tiết mặt hàng & Khối lượng */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <Controller
                        name="packageDetails"
                        control={control}
                        render={({ field }) => (
                            <Field data-invalid={!!errors.packageDetails}>
                                <FieldLabel className="text-xs font-semibold">
                                    Chi tiết mặt hàng
                                </FieldLabel>
                                <Input
                                    {...field}
                                    placeholder="Ví dụ: Quần áo, Hồ sơ, Thiết bị điện tử..."
                                    className="h-11 rounded-xl bg-muted/30"
                                />
                                {errors.packageDetails && (
                                    <FieldError className="px-1 text-xs text-destructive">
                                        {errors.packageDetails.message}
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

                {/* Loại dịch vụ & Phương thức thanh toán */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                        name="serviceType"
                        control={control}
                        render={({ field }) => (
                            <Field data-invalid={!!errors.serviceType}>
                                <FieldLabel className="text-xs font-semibold">
                                    Loại dịch vụ giao hàng
                                </FieldLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="h-11 rounded-xl bg-muted/30">
                                        <SelectValue placeholder="Chọn dịch vụ" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="STANDARD">Giao tiêu chuẩn (Standard)</SelectItem>
                                        <SelectItem value="FAST">Giao nhanh (Express)</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.serviceType && (
                                    <FieldError className="px-1 text-xs text-destructive">
                                        {errors.serviceType.message}
                                    </FieldError>
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="paymentMethod"
                        control={control}
                        render={({ field }) => (
                            <Field data-invalid={!!errors.paymentMethod}>
                                <FieldLabel className="text-xs font-semibold">
                                    Phương thức thanh toán
                                </FieldLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="h-11 rounded-xl bg-muted/30">
                                        <SelectValue placeholder="Chọn phương thức thanh toán" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="CASH">Tiền mặt (Cash)</SelectItem>
                                        <SelectItem value="BANK_TRANSFER">Chuyển khoản ngân hàng</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.paymentMethod && (
                                    <FieldError className="px-1 text-xs text-destructive">
                                        {errors.paymentMethod.message}
                                    </FieldError>
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* Tiền thu hộ COD & Mã khuyến mãi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                        name="codAmount"
                        control={control}
                        render={({ field }) => (
                            <Field data-invalid={!!errors.codAmount}>
                                <FieldLabel className="text-xs font-semibold">
                                    Tiền thu hộ COD (VNĐ)
                                </FieldLabel>
                                <Input
                                    type="number"
                                    step="1000"
                                    value={field.value}
                                    onChange={(e) =>
                                        field.onChange(parseFloat(e.target.value) || 0)
                                    }
                                    placeholder="0"
                                    className="h-11 rounded-xl bg-muted/30"
                                />
                                {errors.codAmount && (
                                    <FieldError className="px-1 text-xs text-destructive">
                                        {errors.codAmount.message}
                                    </FieldError>
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="promotionCode"
                        control={control}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel className="text-xs font-semibold">
                                    Mã khuyến mãi (Tùy chọn)
                                </FieldLabel>
                                <Input
                                    {...field}
                                    placeholder="Nhập mã giảm giá..."
                                    className="h-11 rounded-xl bg-muted/30"
                                />
                            </Field>
                        )}
                    />
                </div>

                {/* Các tùy chọn bổ sung (Hàng cồng kềnh, Giao tận cửa) */}
                <div className="flex flex-wrap gap-6 pt-2">
                    <Controller
                        name="isBulky"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="isBulky"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                                <label
                                    htmlFor="isBulky"
                                    className="text-xs font-medium leading-none cursor-pointer"
                                >
                                    Hàng cồng kềnh
                                </label>
                            </div>
                        )}
                    />

                    <Controller
                        name="isDoorDelivery"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="isDoorDelivery"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                                <label
                                    htmlFor="isDoorDelivery"
                                    className="text-xs font-medium leading-none cursor-pointer"
                                >
                                    Giao tận cửa (Door Delivery)
                                </label>
                            </div>
                        )}
                    />
                </div>

                {/* Ghi chú */}
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
                                className="rounded-xl bg-muted/30 resize-none min-h-20"
                            />
                        </Field>
                    )}
                />
            </CardContent>
        </Card>
    )
}