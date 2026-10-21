import { User } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"
import { Controller } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { ProfileSchemaType } from "@/lib/schemas/user/profile"
import { DriverLicenseFields } from "./driver-license-fields"

interface Props {
    form: UseFormReturn<ProfileSchemaType>
    onSubmit: (e: React.FormEvent) => void
    isDriver: boolean
    isPending: boolean
}

export function ProfileInfoForm({ form, onSubmit, isDriver, isPending }: Props) {
    const {
        control,
        formState: { errors },
    } = form

    return (
        <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-lg space-y-6 animate-in fade-in-50">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
                <User className="size-5 text-primary" />
                <span>Chi tiết thông tin tài khoản</span>
            </h2>

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Họ và tên */}
                    <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                            <Field data-invalid={!!errors.fullName}>
                                <FieldLabel className="text-xs font-semibold">Họ và tên</FieldLabel>
                                <Input
                                    {...field}
                                    placeholder="Họ và tên đầy đủ"
                                    className="h-11 rounded-xl border-border bg-muted/30 px-4 text-sm"
                                />
                                {errors.fullName && (
                                    <FieldError className="px-1 text-xs text-destructive">
                                        {errors.fullName.message}
                                    </FieldError>
                                )}
                            </Field>
                        )}
                    />

                    {/* Số điện thoại */}
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <Field data-invalid={!!errors.phone}>
                                <FieldLabel className="text-xs font-semibold">Số điện thoại</FieldLabel>
                                <Input
                                    {...field}
                                    placeholder="Số điện thoại liên hệ"
                                    className="h-11 rounded-xl border-border bg-muted/30 px-4 text-sm"
                                />
                                {errors.phone && (
                                    <FieldError className="px-1 text-xs text-destructive">
                                        {errors.phone.message}
                                    </FieldError>
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* Email (Readonly) */}
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Field>
                            <FieldLabel className="text-xs font-semibold">Địa chỉ Email</FieldLabel>
                            <Input
                                {...field}
                                disabled
                                className="h-11 rounded-xl border-border bg-muted/70 px-4 text-sm text-muted-foreground cursor-not-allowed"
                            />
                        </Field>
                    )}
                />

                {/* Thông tin riêng cho Driver */}
                {isDriver && <DriverLicenseFields control={control} />}

                <div className="pt-2 flex justify-end">
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="h-11 px-6 rounded-full text-sm font-bold text-white transition-all animate-btn-gradient btn-shine shadow-md shadow-primary/20 border-none cursor-pointer"
                    >
                        {isPending ? "Đang lưu..." : "Cập nhật thay đổi"}
                    </Button>
                </div>
            </form>
        </div>
    )
}