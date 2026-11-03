import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { VehicleRegisterFormValues } from "../hooks/use-vehicle-register";
import { VehicleTypeSelector } from "./vehicle-type-selector";

interface Props {
    form: UseFormReturn<VehicleRegisterFormValues>;
    onSubmit: (e: React.BaseSyntheticEvent) => void;
    isSubmitting: boolean;
    onCancel: () => void;
}

export function RegisterForm({ form, onSubmit, isSubmitting, onCancel }: Props) {
    const { register, formState: { errors }, watch, setValue } = form;

    return (
        <Card className="rounded-[28px] border-border/60 shadow-sm bg-card">
            <CardContent className="p-6 sm:p-8">
                <form onSubmit={onSubmit} className="space-y-6">
                    {/* Chọn loại xe */}
                    <VehicleTypeSelector watch={watch} setValue={setValue} />

                    {/* Các thông tin chi tiết */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-foreground uppercase tracking-wider">
                                Biển số xe <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                {...register("licensePlate")}
                                placeholder="Ví dụ: 59-X1 123.45"
                                className="h-11 rounded-xl text-xs bg-muted/40 font-mono font-bold"
                            />
                            {errors.licensePlate && (
                                <span className="text-[11px] text-destructive font-semibold">{errors.licensePlate.message}</span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-foreground uppercase tracking-wider">
                                Hãng xe <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                {...register("brand")}
                                placeholder="Ví dụ: Honda, Toyota..."
                                className="h-11 rounded-xl text-xs bg-muted/40 font-semibold"
                            />
                            {errors.brand && (
                                <span className="text-[11px] text-destructive font-semibold">{errors.brand.message}</span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-foreground uppercase tracking-wider">
                                Model / Dòng xe <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                {...register("model")}
                                placeholder="Ví dụ: Wave Alpha, Vios..."
                                className="h-11 rounded-xl text-xs bg-muted/40 font-semibold"
                            />
                            {errors.model && (
                                <span className="text-[11px] text-destructive font-semibold">{errors.model.message}</span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-foreground uppercase tracking-wider">
                                Màu sắc xe <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                {...register("color")}
                                placeholder="Ví dụ: Đen, Trắng, Đỏ..."
                                className="h-11 rounded-xl text-xs bg-muted/40 font-semibold"
                            />
                            {errors.color && (
                                <span className="text-[11px] text-destructive font-semibold">{errors.color.message}</span>
                            )}
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                            <Label className="text-xs font-bold text-foreground uppercase tracking-wider">
                                Tải trọng tối đa (kg)
                            </Label>
                            <Input
                                type="number"
                                {...register("weightCapacityKg", { valueAsNumber: true })}
                                placeholder="Ví dụ: 50"
                                className="h-11 rounded-xl text-xs bg-muted/40 font-semibold"
                            />
                            {errors.weightCapacityKg && (
                                <span className="text-[11px] text-destructive font-semibold">{errors.weightCapacityKg.message}</span>
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
                            Xác nhận đăng ký xe
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}