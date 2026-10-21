import { KeyRound } from "lucide-react"
import { Controller, type UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import type { ChangePasswordSchemaType } from "@/lib/schemas/user/profile"
import { PasswordInput } from "./password-input"

interface Props {
    form: UseFormReturn<ChangePasswordSchemaType>
    onSubmit: (e: React.FormEvent) => void
    isPending: boolean
}

export function ProfilePasswordForm({ form, onSubmit, isPending }: Props) {
    const {
        control,
        formState: { errors },
    } = form

    return (
        <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-lg space-y-6 animate-in fade-in-50">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
                <KeyRound className="size-5 text-primary" />
                <span>Đổi mật khẩu truy cập</span>
            </h2>

            <form onSubmit={onSubmit} className="space-y-4 max-w-lg">
                {/* Mật khẩu cũ */}
                <Controller
                    name="oldPassword"
                    control={control}
                    render={({ field }) => (
                        <Field data-invalid={!!errors.oldPassword}>
                            <FieldLabel className="text-xs font-semibold">
                                Mật khẩu hiện tại
                            </FieldLabel>
                            <PasswordInput
                                name="oldPassword"
                                label="Mật khẩu hiện tại"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                placeholder="Nhập mật khẩu cũ"
                                error={errors.oldPassword?.message}
                            />
                        </Field>
                    )}
                />

                {/* Mật khẩu mới */}
                <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }) => (
                        <Field data-invalid={!!errors.newPassword}>
                            <FieldLabel className="text-xs font-semibold">Mật khẩu mới</FieldLabel>
                            <PasswordInput
                                name="newPassword"
                                label="Mật khẩu mới"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                placeholder="Mật khẩu mới (ít nhất 6 ký tự)"
                                error={errors.newPassword?.message}
                            />
                        </Field>
                    )}
                />

                {/* Xác nhận mật khẩu mới */}
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                        <Field data-invalid={!!errors.confirmPassword}>
                            <FieldLabel className="text-xs font-semibold">
                                Xác nhận mật khẩu mới
                            </FieldLabel>
                            <PasswordInput
                                name="confirmPassword"
                                label="Xác nhận mật khẩu mới"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                placeholder="Nhập lại mật khẩu mới"
                                error={errors.confirmPassword?.message}
                            />
                        </Field>
                    )}
                />

                <div className="pt-2">
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="h-11 px-6 rounded-full text-sm font-bold text-white transition-all animate-btn-gradient btn-shine shadow-md shadow-primary/20 border-none cursor-pointer"
                    >
                        {isPending ? "Đang đổi mật khẩu..." : "Đổi mật khẩu"}
                    </Button>
                </div>
            </form>
        </div>
    )
}