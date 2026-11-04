import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, Save } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { VehicleEditFormValues } from "../hooks/use-vehicle-edit";

interface Props {
    form: UseFormReturn<VehicleEditFormValues>;
    onSubmit: (e: React.BaseSyntheticEvent) => void;
    isSubmitting: boolean;
    onCancel: () => void;
}

export function VehicleForm({ form, onSubmit, isSubmitting, onCancel }: Props) {
    const { register, formState: { errors } } = form;

    return (
        <Card className="rounded-[28px] border-border/60 shadow-sm bg-card">
            <CardContent className="p-6 sm:p-8">
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Biển số xe (🔒 Đã khóa không cho sửa) */}
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                                Biển số xe <Lock className="size-3 text-muted-foreground" />
                            </Label>
                            <Input
                                {...register("licensePlate")}
                                disabled // 👈 Khóa ô input
                                className="h-11 rounded-xl text-xs bg-muted/60 font-mono font-bold text-muted-foreground cursor-not-allowed"
                            />
                            <p className="text-[10px] text-muted-foreground italic">Biển số xe không thể thay đổi sau khi đăng ký.</p>
                        </div>

                        {/* Hãng xe (🔒 Đã khóa không cho sửa) */}
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                                Hãng xe <Lock className="size-3 text-muted-foreground" />
                            </Label>
                            <Input
                                {...register("brand")}
                                disabled // 👈 Khóa ô input
                                className="h-11 rounded-xl text-xs bg-muted/60 font-semibold text-muted-foreground cursor-not-allowed"
                            />
                            <p className="text-[10px] text-muted-foreground italic">Hãng xe được cố định theo đăng ký ban đầu.</p>
                        </div>

                        {/* Model / Dòng xe (Vẫn cho phép sửa) */}
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-foreground uppercase tracking-wider">
                                Model / Dòng xe <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                {...register("model")}
                                className="h-11 rounded-xl text-xs bg-muted/40 font-semibold"
                            />
                            {errors.model && (
                                <span className="text-[11px] text-destructive font-semibold">
                                    {errors.model.message}
                                </span>
                            )}
                        </div>

                        {/* Màu sắc xe (Vẫn cho phép sửa) */}
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-foreground uppercase tracking-wider">
                                Màu sắc xe <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                {...register("color")}
                                className="h-11 rounded-xl text-xs bg-muted/40 font-semibold"
                            />
                            {errors.color && (
                                <span className="text-[11px] text-destructive font-semibold">
                                    {errors.color.message}
                                </span>
                            )}
                        </div>

                        {/* Tải trọng tối đa (Vẫn cho phép sửa) */}
                        {/* Tải trọng tối đa */}
                        <div className="space-y-2 sm:col-span-2">
                            <Label className="text-xs font-bold text-foreground uppercase tracking-wider">
                                Tải trọng tối đa (kg) <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                type="number"
                                {...register("maxWeightKg", { valueAsNumber: true })} // 👈 Đổi từ weightCapacityKg thành maxWeightKg
                                className="h-11 rounded-xl text-xs bg-muted/40 font-semibold"
                            />
                            {errors.maxWeightKg && ( // 👈 Sửa ở đây luôn
                                <span className="text-[11px] text-destructive font-semibold">
                                    {errors.maxWeightKg.message}
                                </span>
                            )}
                        </div>

                    </div>

                    {/* Nút Submit & Hủy */}
                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-border/40">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            className="rounded-xl text-xs font-bold h-11 px-6 cursor-pointer"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-xl bg-[#710105] hover:bg-[#580104] text-white font-bold text-xs h-11 px-8 shadow-md cursor-pointer gap-2"
                        >
                            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                            Lưu thay đổi
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}