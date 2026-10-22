import { X } from "lucide-react"
import { Controller, type UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { CustomerAddress } from "@/demo_data_services/mockAddressService"
import type { AddressSchemaType } from "@/lib/schemas/address"

const LABEL_PRESETS = ["Nhà riêng", "Công ty", "Kho hàng"]

interface Props {
    isOpen: boolean
    editingAddress: CustomerAddress | null
    form: UseFormReturn<AddressSchemaType>
    onSubmit: (e: React.FormEvent) => void
    onClose: () => void
    isSaving: boolean
}

export function AddressFormModal({
    isOpen,
    editingAddress,
    form,
    onSubmit,
    onClose,
    isSaving,
}: Props) {
    if (!isOpen) return null

    const {
        control,
        setValue,
        formState: { errors },
    } = form

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-50">
            <div className="w-full max-w-lg bg-card border border-border/80 rounded-3xl shadow-2xl p-6 space-y-5 relative">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <h2 className="text-lg font-bold text-foreground">
                        {editingAddress ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    {/* Nhãn địa chỉ */}
                    <Controller
                        name="label"
                        control={control}
                        render={({ field }) => (
                            <Field data-invalid={!!errors.label}>
                                <FieldLabel className="text-xs font-semibold">
                                    Nhãn gợi nhớ
                                </FieldLabel>
                                <div className="flex gap-2 mb-2">
                                    {LABEL_PRESETS.map((item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => setValue("label", item)}
                                            className={`px-3 py-1 rounded-xl text-xs font-semibold border cursor-pointer transition-colors ${field.value === item
                                                ? "bg-primary text-white border-primary"
                                                : "bg-muted/50 border-border text-muted-foreground"
                                                }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                                <Input
                                    {...field}
                                    placeholder="Nhập nhãn địa chỉ (ví dụ: Nhà riêng, Kho tổng Q1...)"
                                    className="h-11 rounded-xl border-border bg-muted/30 px-4 text-sm"
                                />
                                {errors.label && (
                                    <FieldError className="px-1 text-xs text-destructive">
                                        {errors.label.message}
                                    </FieldError>
                                )}
                            </Field>
                        )}
                    />

                    {/* Tên & Số điện thoại */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Controller
                            name="contactName"
                            control={control}
                            render={({ field }) => (
                                <Field data-invalid={!!errors.contactName}>
                                    <FieldLabel className="text-xs font-semibold">
                                        Tên người liên hệ
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        placeholder="Họ và tên"
                                        className="h-11 rounded-xl border-border bg-muted/30 px-4 text-sm"
                                    />
                                    {errors.contactName && (
                                        <FieldError className="px-1 text-xs text-destructive">
                                            {errors.contactName.message}
                                        </FieldError>
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="contactPhone"
                            control={control}
                            render={({ field }) => (
                                <Field data-invalid={!!errors.contactPhone}>
                                    <FieldLabel className="text-xs font-semibold">
                                        Số điện thoại
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        placeholder="Số điện thoại"
                                        className="h-11 rounded-xl border-border bg-muted/30 px-4 text-sm"
                                    />
                                    {errors.contactPhone && (
                                        <FieldError className="px-1 text-xs text-destructive">
                                            {errors.contactPhone.message}
                                        </FieldError>
                                    )}
                                </Field>
                            )}
                        />
                    </div>

                    {/* Địa chỉ chi tiết */}
                    <Controller
                        name="fullAddress"
                        control={control}
                        render={({ field }) => (
                            <Field data-invalid={!!errors.fullAddress}>
                                <FieldLabel className="text-xs font-semibold">
                                    Địa chỉ chi tiết
                                </FieldLabel>
                                <Input
                                    {...field}
                                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, TP"
                                    className="h-11 rounded-xl border-border bg-muted/30 px-4 text-sm"
                                />
                                {errors.fullAddress && (
                                    <FieldError className="px-1 text-xs text-destructive">
                                        {errors.fullAddress.message}
                                    </FieldError>
                                )}
                            </Field>
                        )}
                    />

                    {/* Tick Mặc định */}
                    <Controller
                        name="isDefault"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center gap-2 pt-1">
                                <input
                                    type="checkbox"
                                    id="isDefault"
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    className="size-4 rounded border-border text-primary focus:ring-primary/20 accent-[#710105] cursor-pointer"
                                />
                                <label
                                    htmlFor="isDefault"
                                    className="text-xs font-semibold text-foreground cursor-pointer"
                                >
                                    Đặt làm địa chỉ mặc định
                                </label>
                            </div>
                        )}
                    />

                    <div className="pt-2 flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="rounded-xl border-border"
                        >
                            Hủy
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSaving}
                            className="animate-btn-gradient btn-shine text-white font-bold rounded-xl border-none"
                        >
                            {isSaving ? "Đang lưu..." : "Lưu địa chỉ"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}