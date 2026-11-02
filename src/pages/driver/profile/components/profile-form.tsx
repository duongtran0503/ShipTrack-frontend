import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Phone, Save, User } from "lucide-react";
import type { ProfileFormInstance } from "../types";

interface Props {
    form: ProfileFormInstance;
    onSubmit: (e: React.BaseSyntheticEvent) => void;
    isSaving: boolean;
    avatarPreview: string | null;
}

export function ProfileForm({ form, onSubmit, isSaving, avatarPreview }: Props) {
    const { register, formState: { errors, isDirty } } = form;

    return (
        <Card className="rounded-[24px] border-border/50 shadow-sm bg-card h-full">
            <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <User className="size-5 text-primary" />
                    <span>Chi tiết thông tin liên hệ</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
                <form onSubmit={onSubmit} className="space-y-5">
                    {/* Họ và tên */}
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-foreground">Họ và tên tài xế</Label>
                        <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                {...register("fullName")}
                                placeholder="Nhập họ và tên"
                                className="pl-10 h-11 rounded-2xl border-border/60 focus:border-primary"
                            />
                        </div>
                        {errors.fullName && (
                            <p className="text-[11px] font-semibold text-destructive">{errors.fullName.message as string}</p>
                        )}
                    </div>

                    {/* Email (Đã khóa) */}
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-foreground">Địa chỉ Email (Không thể thay đổi)</Label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                {...register("email")}
                                disabled
                                placeholder="nhanvien@shiptrack.vn"
                                className="pl-10 h-11 rounded-2xl border-border/60 bg-muted/50 text-muted-foreground cursor-not-allowed"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-[11px] font-semibold text-destructive">{errors.email.message as string}</p>
                        )}
                    </div>

                    {/* Số điện thoại */}
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-foreground">Số điện thoại liên hệ</Label>
                        <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                {...register("phone")}
                                placeholder="0901234567"
                                className="pl-10 h-11 rounded-2xl border-border/60 focus:border-primary"
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-[11px] font-semibold text-destructive">{errors.phone.message as string}</p>
                        )}
                    </div>

                    {/* Nút Lưu thay đổi */}
                    <div className="pt-4 flex justify-end">
                        <Button
                            type="submit"
                            disabled={isSaving || (!isDirty && !avatarPreview)}
                            className="h-11 px-8 rounded-full bg-[#710105] hover:bg-[#580104] text-white font-bold text-sm shadow-md animate-btn-gradient btn-shine cursor-pointer flex items-center gap-2"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    <span>Đang lưu...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="size-4" />
                                    <span>Lưu thay đổi</span>
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}