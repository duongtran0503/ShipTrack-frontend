import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, FileText, Loader2, Save } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { DriverLicenseInfo, DriverLicenseSchemaType } from "../hooks/use-driver-license";
import { LicenseStatusBadge } from "./license-status-badge";

interface Props {
    form: UseFormReturn<DriverLicenseSchemaType>;
    onSubmit: (e: React.BaseSyntheticEvent) => void;
    isSaving: boolean;
    imagePreview: string | null;
    approvalStatus: DriverLicenseInfo["approvalStatus"];
}

export function LicenseForm({ form, onSubmit, isSaving, imagePreview, approvalStatus }: Props) {
    const { register, formState: { errors, isDirty } } = form;

    return (
        <Card className="rounded-[24px] border-border/50 shadow-sm bg-card h-full">
            <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <FileText className="size-5 text-primary" />
                    <span>Chi tiết Giấy phép lái xe</span>
                </CardTitle>
                <LicenseStatusBadge status={approvalStatus} />
            </CardHeader>

            <CardContent className="p-6">
                <form onSubmit={onSubmit} className="space-y-5">
                    {/* Số bằng lái */}
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-foreground">Số bằng lái xe (GPLX)</Label>
                        <div className="relative">
                            <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                {...register("licenseNumber")}
                                placeholder="Nhập số bằng lái (VD: 790123456789)"
                                className="pl-10 h-11 rounded-2xl border-border/60 focus:border-primary"
                            />
                        </div>
                        {errors.licenseNumber && (
                            <p className="text-[11px] font-semibold text-destructive">{errors.licenseNumber.message}</p>
                        )}
                    </div>

                    {/* Ngày cấp & Ngày hết hạn */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-foreground">Ngày cấp</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    type="date"
                                    {...register("issueDate")}
                                    className="pl-10 h-11 rounded-2xl border-border/60 focus:border-primary"
                                />
                            </div>
                            {errors.issueDate && (
                                <p className="text-[11px] font-semibold text-destructive">{errors.issueDate.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-foreground">Ngày hết hạn</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    type="date"
                                    {...register("expiryDate")}
                                    className="pl-10 h-11 rounded-2xl border-border/60 focus:border-primary"
                                />
                            </div>
                            {errors.expiryDate && (
                                <p className="text-[11px] font-semibold text-destructive">{errors.expiryDate.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Nút Lưu thay đổi */}
                    <div className="pt-4 flex justify-end">
                        <Button
                            type="submit"
                            disabled={isSaving || (!isDirty && !imagePreview)}
                            className="h-11 px-8 rounded-full bg-[#710105] hover:bg-[#580104] text-white font-bold text-sm shadow-md animate-btn-gradient btn-shine cursor-pointer flex items-center gap-2"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    <span>Đang gửi...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="size-4" />
                                    <span>Gửi phê duyệt</span>
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}