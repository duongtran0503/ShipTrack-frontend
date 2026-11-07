import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { VehicleReplaceFormValues } from "../hooks/use-vehicle-replace";

interface Props {
    form: UseFormReturn<VehicleReplaceFormValues>;
    onSubmit: (e: React.BaseSyntheticEvent) => void;
    onCancel: () => void;
}

export function ReplaceForm({ form, onSubmit, onCancel }: Props) {
    const { register, formState: { errors } } = form;

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Biển số xe */}
                <div className="space-y-2">
                    <Label className="text-xs font-bold text-foreground uppercase tracking-wider">
                        Biển số xe mới <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        placeholder="Nhập biển số xe mới"
                        {...register("licensePlate")}
                        className="h-11 rounded-xl text-xs bg-muted/40 font-mono font-bold"
                    />
                    {errors.licensePlate && (
                        <span className="text-[11px] text-destructive font-semibold">{errors.licensePlate.message}</span>
                    )}
                </div>

                {/* Hãng xe */}
                <div className="space-y-2">
                    <Label className="text-xs font-bold text-foreground uppercase tracking-wider">
                        Hãng xe mới <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        placeholder="Ví dụ: Yamaha, Honda..."
                        {...register("brand")}
                        className="h-11 rounded-xl text-xs bg-muted/40 font-semibold"
                    />
                    {errors.brand && (
                        <span className="text-[11px] text-destructive font-semibold">{errors.brand.message}</span>
                    )}
                </div>



                {/* Màu xe */}
                <div className="space-y-2">
                    <Label className="text-xs font-bold text-foreground uppercase tracking-wider">
                        Màu xe mới <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        placeholder="Ví dụ: Đỏ đen..."
                        {...register("color")}
                        className="h-11 rounded-xl text-xs bg-muted/40 font-semibold"
                    />
                    {errors.color && (
                        <span className="text-[11px] text-destructive font-semibold">{errors.color.message}</span>
                    )}
                </div>

                {/* Lý do thay xe */}
                <div className="space-y-2 sm:col-span-2">
                    <Label className="text-xs font-bold text-foreground uppercase tracking-wider">
                        Lý do thay xe <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        placeholder="Ví dụ: Bán xe cũ, đổi xe mới để giao hàng tốt hơn..."
                        {...register("reason")}
                        className="h-11 rounded-xl text-xs bg-muted/40 font-semibold"
                    />
                    {errors.reason && (
                        <span className="text-[11px] text-destructive font-semibold">{errors.reason.message}</span>
                    )}
                </div>
            </div>

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
                    className="rounded-xl bg-[#710105] hover:bg-[#580104] text-white font-bold text-xs h-11 px-8 shadow-md cursor-pointer gap-2"
                >
                    <RefreshCw className="size-4" /> Tiến hành thay xe mới
                </Button>
            </div>
        </form>
    );
}