import { useState } from "react"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { LatLng } from "@/lib/hooks/use-vietmap"
import type { CreateOrderSchemaType } from "@/lib/schemas/order"
import type { CustomerAddress } from "@/services/user/type"
import { AddressSearchInput } from "./address-search-input"

type AddressType = "sender" | "receiver"

interface Props {
    type: AddressType
    stepNumber: number
    title: string
    form: UseFormReturn<CreateOrderSchemaType>
    addresses?: CustomerAddress[]
    onSelectAddress: (addrId: string) => void
    userLocation?: LatLng
}

export function AddressSection({
    type,
    stepNumber,
    title,
    form,
    addresses,
    onSelectAddress,
    userLocation,
}: Props) {
    const [selectedAddressId, setSelectedAddressId] = useState("")
    const { control, setValue, formState: { errors } } = form

    const addressField = (type === "sender" ? "senderAddress" : "dropoffAddress")
    const nameField = (type === "sender" ? "senderName" : "receiverName")
    const phoneField = (type === "sender" ? "senderPhone" : "receiverPhone")
    const latField = (type === "sender" ? "pickupLat" : "dropoffLat")
    const lngField = (type === "sender" ? "pickupLng" : "dropoffLng")

    return (
        <Card className="rounded-3xl border-border/60 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border/60">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Badge className="size-6 rounded-full p-0 flex items-center justify-center bg-primary/10 text-primary font-black hover:bg-primary/20">
                        {stepNumber}
                    </Badge>
                    <span>{title}</span>
                </CardTitle>

                {addresses && addresses.length > 0 && (
                    <Select
                        value={selectedAddressId}
                        onValueChange={(value) => {
                            if (value) {
                                onSelectAddress(value)
                                setSelectedAddressId(value)
                            }
                        }}
                    >
                        <SelectTrigger className="w-50 h-8 text-xs rounded-xl bg-muted/40">
                            <SelectValue placeholder="-- Chọn từ sổ địa chỉ --" />
                        </SelectTrigger>
                        <SelectContent side="bottom" align="start">
                            {addresses.map((a) => (
                                <SelectItem key={a.id} value={a.id} className="text-xs">
                                    {a.label} ({a.contactName})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
                <Controller
                    name={addressField}
                    control={control}
                    render={({ field }) => (
                        <div>
                            <AddressSearchInput
                                label="Địa chỉ chi tiết"
                                placeholder={
                                    type === "sender"
                                        ? "Ví dụ: 456 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM"
                                        : "Ví dụ: 789 Lê Văn Việt, Phường Tăng Nhơn Phú A, TP. Thủ Đức"
                                }
                                value={field.value ?? ""}
                                onChange={(value) => field.onChange(value)}
                                onSelectLocation={(location) => {
                                    // 👇 QUAN TRỌNG: Đổi shouldValidate thành true
                                    // để React Hook Form trigger re-render cho hook useCreateOrder
                                    setValue(latField, location.lat, {
                                        shouldValidate: true,
                                        shouldDirty: true
                                    })
                                    setValue(lngField, location.lng, {
                                        shouldValidate: true,
                                        shouldDirty: true
                                    })
                                }}
                                badgeColor={type === "sender" ? "primary" : "emerald"}
                                userLocation={userLocation}
                            />
                            {errors[addressField] && (
                                <FieldError className="px-1 text-xs text-destructive mt-1">
                                    {errors[addressField]?.message}
                                </FieldError>
                            )}
                        </div>
                    )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                        name={nameField}
                        control={control}
                        render={({ field }) => (
                            <Field data-invalid={!!errors[nameField]}>
                                <FieldLabel className="text-xs font-semibold">
                                    Tên người {type === "sender" ? "gửi" : "nhận"}
                                </FieldLabel>
                                <Input
                                    {...field}
                                    placeholder={`Họ và tên người ${type === "sender" ? "gửi" : "nhận"}`}
                                    className="h-11 rounded-xl bg-muted/30"
                                />
                                {errors[nameField] && (
                                    <FieldError className="px-1 text-xs text-destructive">
                                        {errors[nameField]?.message}
                                    </FieldError>
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name={phoneField}
                        control={control}
                        render={({ field }) => (
                            <Field data-invalid={!!errors[phoneField]}>
                                <FieldLabel className="text-xs font-semibold">
                                    Số điện thoại {type === "sender" ? "gửi" : "nhận"}
                                </FieldLabel>
                                <Input
                                    {...field}
                                    placeholder="Số điện thoại"
                                    className="h-11 rounded-xl bg-muted/30"
                                />
                                {errors[phoneField] && (
                                    <FieldError className="px-1 text-xs text-destructive">
                                        {errors[phoneField]?.message}
                                    </FieldError>
                                )}
                            </Field>
                        )}
                    />
                </div>
            </CardContent>
        </Card>
    )
}