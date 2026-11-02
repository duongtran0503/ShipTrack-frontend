import { User } from "lucide-react";
import { Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useProfileForm } from "@/pages/customer/profile/hooks/use-profile-form";

export function ProfileCard() {
    const { form, isLoading, isUpdating, onSubmit } = useProfileForm();
    const { control, formState: { errors } } = form;

    if (isLoading) {
        return (
            <Card className="rounded-[24px] border border-border/60 p-6 shadow-sm">
                <p className="text-center text-sm text-muted-foreground animate-pulse">
                    Đang tải thông tin tài khoản...
                </p>
            </Card>
        );
    }

    return (
        <Card className="rounded-[24px] border border-border/50 shadow-sm bg-white overflow-hidden">
            <CardHeader className="pb-4 pt-6 px-8 border-b border-border/40">
                <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2.5">
                    <User className="size-5 text-[#b91c1c]" />
                    <span>Chi tiết thông tin tài khoản</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-8 space-y-6">
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Họ và tên (Dùng fullName theo đúng schema của bạn) */}
                        <Controller
                            name="fullName"
                            control={control}
                            render={({ field }) => (
                                <Field data-invalid={!!errors.fullName}>
                                    <FieldLabel className="text-sm font-bold text-foreground mb-2 block">
                                        Họ và tên
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        placeholder="Nhập họ và tên"
                                        className="h-12 rounded-[16px] border-border/60 bg-white px-4 text-sm focus:border-ring"
                                    />
                                    {errors.fullName && (
                                        <FieldError className="text-xs text-destructive mt-1">
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
                                    <FieldLabel className="text-sm font-bold text-foreground mb-2 block">
                                        Số điện thoại
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        placeholder="Nhập số điện thoại"
                                        className="h-12 rounded-[16px] border-border/60 bg-white px-4 text-sm focus:border-ring"
                                    />
                                    {errors.phone && (
                                        <FieldError className="text-xs text-destructive mt-1">
                                            {errors.phone.message}
                                        </FieldError>
                                    )}
                                </Field>
                            )}
                        />
                    </div>

                    {/* Địa chỉ Email (Vô hiệu hóa vì email thường không cho phép sửa trực tiếp) */}
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Field data-invalid={!!errors.email}>
                                <FieldLabel className="text-sm font-bold text-foreground mb-2 block">
                                    Địa chỉ Email
                                </FieldLabel>
                                <Input
                                    {...field}
                                    disabled
                                    className="h-12 rounded-[16px] border-border/30 bg-[#f8fafc] text-muted-foreground/70 px-4 text-sm cursor-not-allowed"
                                />
                                {errors.email && (
                                    <FieldError className="text-xs text-destructive mt-1">
                                        {errors.email.message}
                                    </FieldError>
                                )}
                            </Field>
                        )}
                    />

                    {/* Nút bấm Cập nhật thay đổi */}
                    <div className="flex justify-end pt-2">
                        <Button
                            type="submit"
                            disabled={isUpdating}
                            className="h-12 px-8 rounded-full bg-[#a31527] hover:bg-[#85101e] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                        >
                            {isUpdating ? "Đang lưu..." : "Cập nhật thay đổi"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}