import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Clock,
    Lock,
    PlusCircle,
    RefreshCw,
    Settings,
    ShieldAlert,
    Truck
} from "lucide-react"
import { useNavigate } from "react-router"
import { useDriverVehicle } from "./hooks/use-driver-vehicle"

export default function DriverVehiclePage() {
    const { vehicle, isLoading } = useDriverVehicle()
    const navigate = useNavigate()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <RefreshCw className="size-6 animate-spin text-primary mr-2" />
                Đang tải thông tin phương tiện...
            </div>
        )
    }

    return (
        <div className="w-full space-y-6">

            {/* TRƯỜNG HỢP A: CHƯA CÓ XE */}
            {!vehicle ? (
                <div className=" text-center py-20 space-y-5 bg-card rounded-[28px] border border-border/50 p-8 shadow-sm">
                    <div className="size-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
                        <Truck className="size-10" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-lg font-bold text-foreground">Bạn chưa đăng ký phương tiện</h2>
                        <p className="text-xs text-muted-foreground max-w-md mx-auto">
                            Đăng ký phương tiện ngay để có thể bật trạng thái sẵn sàng nhận đơn hàng và bắt đầu giao hàng trên hệ thống.
                        </p>
                    </div>
                    <Button
                        onClick={() => navigate("/driver/vehicles/register")}
                        className="rounded-2xl bg-[#710105] hover:bg-[#580104] text-white font-bold text-xs h-12 px-8 shadow-md cursor-pointer gap-2"
                    >
                        <PlusCircle className="size-4" /> Đăng ký xe ngay
                    </Button>
                </div>
            ) : (
                /* TRƯỜNG HỢP B: ĐÃ CÓ XE */
                <div className="space-y-6">

                    {/* Cảnh báo trạng thái phê duyệt nếu chưa duyệt hoặc bị từ chối */}
                    {vehicle.approvalStatus === "PENDING" && (
                        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-3">
                            <Clock className="size-5 shrink-0 text-amber-600" />
                            <div>
                                <strong className="font-bold">Đang chờ phê duyệt:</strong> Thông tin phương tiện của bạn đang được Admin kiểm duyệt. Bạn sẽ có thể nhận đơn ngay sau khi được duyệt.
                            </div>
                        </div>
                    )}

                    {vehicle.approvalStatus === "REJECTED" && (
                        <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-3">
                            <ShieldAlert className="size-5 shrink-0" />
                            <div>
                                <strong className="font-bold">Bị từ chối phê duyệt:</strong> Vui lòng cập nhật lại thông tin hoặc hình ảnh chính xác để được hệ thống chấp nhận.
                            </div>
                        </div>
                    )}

                    {/* Card Chi tiết Xe Hiện Tại */}
                    <Card className="rounded-[28px] border-border/60 shadow-sm bg-card overflow-hidden">
                        <CardContent className="p-6 sm:p-8 space-y-6">

                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-border/40">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                                        <Truck className="size-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-lg font-black text-foreground">{vehicle.vehicleTypeLabel}</h2>
                                            <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                                                <Lock className="size-3" /> Cố định vĩnh viễn
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-0.5">Đăng ký ngày: {vehicle.createdAt}</p>
                                    </div>
                                </div>

                                <Badge
                                    variant="outline"
                                    className={`text-xs font-bold px-4 py-1.5 rounded-full ${vehicle.approvalStatus === "APPROVED"
                                        ? "border-emerald-600 text-emerald-600 bg-emerald-500/10"
                                        : vehicle.approvalStatus === "PENDING"
                                            ? "border-amber-500 text-amber-600 bg-amber-500/10"
                                            : "border-destructive text-destructive bg-destructive/10"
                                        }`}
                                >
                                    {vehicle.approvalStatus === "APPROVED" && "✅ Đã được duyệt"}
                                    {vehicle.approvalStatus === "PENDING" && "⏳ Đang chờ duyệt"}
                                    {vehicle.approvalStatus === "REJECTED" && "❌ Bị từ chối"}
                                </Badge>
                            </div>

                            {/* Lưới thông tin chi tiết xe */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                {/* Ảnh xe & Biển số */}
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Ảnh chính diện xe</span>
                                        <div className="w-full h-44 rounded-2xl bg-muted/40 border border-border/40 overflow-hidden relative shadow-inner">
                                            <img src={vehicle.vehicleImageUrl} alt="Vehicle" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>

                                {/* Thông số cơ bản */}
                                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
                                    <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-1">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Biển số xe</span>
                                        <p className="text-base font-mono font-black text-foreground">{vehicle.licensePlate}</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-1">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Hãng xe</span>
                                        <p className="text-sm font-bold text-foreground">{vehicle.brand}</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-1">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Model dòng xe</span>
                                        <p className="text-sm font-bold text-foreground">{vehicle.model}</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-1">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Màu xe</span>
                                        <p className="text-sm font-bold text-foreground">{vehicle.color}</p>
                                    </div>
                                    {vehicle.weightCapacityKg && (
                                        <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-1 sm:col-span-2">
                                            <span className="text-[10px] uppercase font-bold text-muted-foreground">Tải trọng tối đa</span>
                                            <p className="text-sm font-bold text-foreground">{vehicle.weightCapacityKg} kg</p>
                                        </div>
                                    )}
                                </div>

                            </div>

                            {/* Các nút thao tác (Cập nhật thông tin / Thay xe mới) */}
                            <div className="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-border/40">
                                <Button
                                    variant="outline"
                                    onClick={() => navigate(`/driver/vehicles/${vehicle.id}/edit`)}
                                    className="rounded-xl font-bold text-xs h-11 px-6 border-border/60 hover:bg-muted cursor-pointer gap-2"
                                >
                                    <Settings className="size-4" /> Cập nhật thông tin xe
                                </Button>
                                <Button
                                    onClick={() => navigate("/driver/vehicles/replace")}
                                    className="rounded-xl bg-[#710105] hover:bg-[#580104] text-white font-bold text-xs h-11 px-6 shadow-md cursor-pointer gap-2"
                                >
                                    <RefreshCw className="size-4" /> Thay xe mới (Cùng loại)
                                </Button>
                            </div>

                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}