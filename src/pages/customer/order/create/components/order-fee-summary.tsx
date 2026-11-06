import { Calculator, Clock, Loader2, MapPin, PackageCheck, ShieldCheck, Timer, Weight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { formatDeliveryTime } from "@/lib/utils/format-time"
import type { CalculationResult } from "@/pages/customer/order/create/hooks/use-create-order"

interface Props {
    calculationResult: CalculationResult
    weight: number
    isCreating: boolean
    canSubmit: boolean
    isCalculating?: boolean
}

export function OrderFeeSummary({
    calculationResult,
    weight,
    isCreating,
    canSubmit,
    isCalculating = false,
}: Props) {
    return (
        <Card className="rounded-3xl border-border/60 shadow-xl sticky top-24">
            <CardHeader className="pb-3 border-b border-border/60">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Calculator className="size-5 text-primary" />
                    <span>Chi tiết cước phí & Lộ trình</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5 pt-4">
                {isCalculating ? (
                    <div className="flex flex-col items-center justify-center py-10 space-y-4">
                        <div className="p-4 rounded-full bg-primary/10">
                            <Loader2 className="size-8 animate-spin text-primary" />
                        </div>
                        <div className="text-center space-y-1">
                            <p className="text-sm font-bold text-foreground">Đang tính toán lộ trình...</p>
                            <p className="text-xs text-muted-foreground">Vietmap đang tối ưu hóa tuyến đường</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Thông số chi tiết */}
                        <div className="space-y-3 text-xs">
                            {/* Khoảng cách Vietmap */}
                            <div className="flex items-center justify-between py-1.5 border-b border-border/40">
                                <span className="text-muted-foreground flex items-center gap-1.5">
                                    <MapPin className="size-3.5 text-primary" /> Khoảng cách (Vietmap)
                                </span>
                                <span className="font-bold text-foreground">
                                    {calculationResult.distanceKm > 0
                                        ? `${calculationResult.distanceKm} km`
                                        : "-- km"}
                                </span>
                            </div>

                            {/* Thời gian di chuyển Vietmap */}
                            <div className="flex items-center justify-between py-1.5 border-b border-border/40">
                                <span className="text-muted-foreground flex items-center gap-1.5">
                                    <Timer className="size-3.5 text-blue-500" /> TG di chuyển (Vietmap)
                                </span>
                                <span className="font-semibold text-foreground">
                                    ~ {calculationResult.vietmapMinutes || 0} phút
                                </span>
                            </div>

                            {/* Thời gian xử lý / bốc xếp */}
                            <div className="flex items-center justify-between py-1.5 border-b border-border/40">
                                <span className="text-muted-foreground flex items-center gap-1.5">
                                    <PackageCheck className="size-3.5 text-amber-500" /> TG xử lý & bốc xếp
                                </span>
                                <span className="font-semibold text-foreground">
                                    ~ {calculationResult.processingMinutes || 0} phút
                                </span>
                            </div>

                            {/* Tổng thời gian giao dự kiến */}
                            <div className="flex items-center justify-between py-1.5 border-b border-border/40 bg-muted/30 px-2 rounded-lg">
                                <span className="text-foreground font-bold flex items-center gap-1.5">
                                    <Clock className="size-3.5 text-emerald-600" /> Tổng TG giao dự kiến
                                </span>
                                <span className="font-black text-primary text-sm">
                                    {formatDeliveryTime(calculationResult.estimatedMinutes)}
                                </span>
                            </div>

                            {/* Khối lượng */}
                            <div className="flex items-center justify-between py-1.5 border-b border-border/40">
                                <span className="text-muted-foreground flex items-center gap-1.5">
                                    <Weight className="size-3.5 text-emerald-500" /> Khối lượng hàng
                                </span>
                                <span className="font-bold text-foreground">
                                    {weight || 1} kg
                                </span>
                            </div>
                        </div>

                        {/* Tổng tiền */}
                        <div className="p-4 rounded-2xl bg-accent/50 border border-primary/20 space-y-1 text-center">
                            <p className="text-xs font-semibold text-muted-foreground">
                                Tổng phí vận chuyển dự kiến
                            </p>
                            <p className="text-3xl font-black text-shiptrack-price">
                                {calculationResult.fee > 0
                                    ? `${calculationResult.fee.toLocaleString("vi-VN")} đ`
                                    : "0 đ"}
                            </p>
                        </div>
                    </>
                )}

                {/* Nút submit */}
                <Button
                    type="submit"
                    disabled={!canSubmit || isCalculating}
                    className="h-12 w-full rounded-2xl text-sm font-bold text-white transition-all animate-btn-gradient btn-shine shadow-lg shadow-primary/20 cursor-pointer border-none disabled:opacity-50"
                >
                    {isCreating
                        ? "Đang khởi tạo đơn hàng..."
                        : isCalculating
                            ? "Đang chờ tính phí..."
                            : "Xác nhận tạo đơn hàng"}
                </Button>

                <div className="flex items-center gap-2 text-[11px] text-muted-foreground justify-center pt-1">
                    <ShieldCheck className="size-3.5 text-emerald-500" />
                    <span>Bảo hiểm hàng hóa & Định vị GPS real-time</span>
                </div>
            </CardContent>
        </Card>
    )
}