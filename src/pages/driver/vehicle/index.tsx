import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Lock,
    PlusCircle,
    RefreshCw,
    Settings,
    Trash2,
    Truck
} from "lucide-react";
import { useNavigate } from "react-router";
import { useDriverVehicle } from "./hooks/use-driver-vehicle";

export default function DriverVehiclePage() {
    const { vehicles, isLoading, setDefaultVehicle, deleteVehicle } = useDriverVehicle();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <RefreshCw className="size-6 animate-spin text-primary mr-2" />
                Đang tải thông tin phương tiện...
            </div>
        );
    }

    const typeLabels: Record<string, string> = {
        MOTORBIKE: "Xe máy",
        CAR: "Ô tô",
        TRUCK: "Xe tải",
    };

    // Phân loại xe: Ưu tiên xe đã xác thực (isVerified = true) hoặc xe chính lên đầu layout lớn
    const primaryVehicle = vehicles.find((v) => v.isVerified && v.isDefault) || vehicles.find((v) => v.isVerified) || vehicles[0];
    const secondaryVehicles = vehicles.filter((v) => v.id !== primaryVehicle?.id);

    return (
        <div className="w-full space-y-8 pb-16">

            {/* Header Trang */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-foreground">Quản lý phương tiện</h1>
                    <p className="text-xs text-muted-foreground">
                        Quản lý phương tiện chính đang hoạt động và các xe đăng ký bổ sung.
                    </p>
                </div>
                <Button
                    onClick={() => navigate("/driver/vehicles/register")}
                    className="rounded-2xl bg-[#710105] hover:bg-[#580104] text-white font-bold text-xs h-11 px-6 shadow-md cursor-pointer gap-2"
                >
                    <PlusCircle className="size-4" /> Đăng ký xe mới
                </Button>
            </div>

            {/* TRƯỜNG HỢP A: CHƯA CÓ XE NÀO */}
            {!primaryVehicle ? (
                <div className="text-center py-20 space-y-5 bg-card rounded-[28px] border border-border/50 p-8 shadow-sm">
                    <div className="size-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
                        <Truck className="size-10" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-lg font-bold text-foreground">Bạn chưa đăng ký phương tiện nào</h2>
                        <p className="text-xs text-muted-foreground max-w-md mx-auto">
                            Đăng ký phương tiện ngay để có thể bật trạng thái sẵn sàng nhận đơn hàng trên hệ thống.
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
                /* TRƯỜNG HỢP B: ĐÃ CÓ XE CHÍNH (Giữ nguyên layout chuẩn như hình mẫu) */
                <div className="space-y-6">

                    {/* Card Layout Chính (Giống hệt ảnh mẫu bạn cung cấp) */}
                    <Card className="rounded-[28px] border-border/60 shadow-sm bg-card overflow-hidden">
                        <CardContent className="p-6 sm:p-8 space-y-6">

                            {/* Header bên trong Card */}
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-border/40">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                                        <Truck className="size-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-lg font-black text-foreground">
                                                {typeLabels[primaryVehicle.vehicleType] || primaryVehicle.vehicleType}
                                            </h2>
                                            <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                                                <Lock className="size-3" /> Cố định vĩnh viễn
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            Đăng ký ngày: {new Date(primaryVehicle.createdAtUtc).toLocaleDateString("vi-VN")}
                                        </p>
                                    </div>
                                </div>

                                <Badge
                                    variant="outline"
                                    className={`text-xs font-bold px-4 py-1.5 rounded-full ${primaryVehicle.isVerified
                                        ? "border-emerald-600 text-emerald-600 bg-emerald-500/10"
                                        : "border-amber-500 text-amber-600 bg-amber-500/10"
                                        }`}
                                >
                                    {primaryVehicle.isVerified ? "✅ Đã được duyệt (Verified)" : "⏳ Đang chờ duyệt"}
                                </Badge>
                            </div>

                            {/* Lưới thông tin chi tiết xe (Ảnh demo + Các ô thông số) */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                {/* Ảnh chính diện xe (Dùng ảnh demo chuẩn như mẫu) */}
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Ảnh chính diện xe</span>
                                        <div className="w-full h-44 rounded-2xl bg-muted/40 border border-border/40 overflow-hidden relative shadow-inner flex items-center justify-center">
                                            <img
                                                src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80"
                                                alt="Vehicle Demo"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Thông số các ô: Biển số, Hãng, Model, Màu */}
                                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
                                    <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-1">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Biển số xe</span>
                                        <p className="text-base font-mono font-black text-foreground">{primaryVehicle.licensePlate}</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-1">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Hãng xe</span>
                                        <p className="text-sm font-bold text-foreground">{primaryVehicle.brand || "—"}</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-1">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Model dòng xe</span>
                                        <p className="text-sm font-bold text-foreground">{primaryVehicle.color ? `Màu ${primaryVehicle.color}` : "Chuẩn tiêu chuẩn"}</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-1">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Tải trọng tối đa</span>
                                        <p className="text-sm font-bold text-foreground">{primaryVehicle.maxWeightKg ? `${primaryVehicle.maxWeightKg} kg` : "50 kg"}</p>
                                    </div>
                                </div>

                            </div>

                            {/* Các nút thao tác chính */}
                            <div className="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-border/40">
                                <Button
                                    variant="outline"
                                    onClick={() => navigate(`/driver/vehicles/${primaryVehicle.id}/edit`)}
                                    className="rounded-xl font-bold text-xs h-11 px-6 border-border/60 hover:bg-muted cursor-pointer gap-2"
                                >
                                    <Settings className="size-4" /> Cập nhật thông tin xe
                                </Button>
                                <Button
                                    onClick={() => navigate("/driver/vehicles/replace")}
                                    className="rounded-2xl bg-[#710105] hover:bg-[#580104] text-white font-bold text-xs h-11 px-6 shadow-md cursor-pointer gap-2"
                                >
                                    <RefreshCw className="size-4" /> Thay xe mới (Cùng loại)
                                </Button>
                            </div>

                        </CardContent>
                    </Card>

                    {/* ================= PHẦN PHỤ BÊN DƯỚI (Dành cho các xe khác hoặc isVerified = false / đăng ký thêm) ================= */}
                    {secondaryVehicles.length > 0 && (
                        <div className="space-y-4 pt-4">
                            <h3 className="text-sm font-black text-foreground uppercase tracking-wider">
                                Phương tiện chờ duyệt / Đăng ký khác ({secondaryVehicles.length})
                            </h3>

                            <div className="grid grid-cols-1 gap-4">
                                {secondaryVehicles.map((v) => (
                                    <Card key={v.id} className="rounded-[24px] border border-border/60 bg-card shadow-sm">
                                        <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                                                    <Truck className="size-5" />
                                                </div>
                                                <div className="space-y-0.5">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-sm font-bold text-foreground">{typeLabels[v.vehicleType] || v.vehicleType}</h4>
                                                        <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-500/40 bg-amber-500/10">
                                                            Chờ duyệt (Unverified)
                                                        </Badge>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground font-mono">
                                                        Biển số: <span className="font-bold text-foreground">{v.licensePlate}</span> • Hãng: {v.brand || "—"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                                {!v.isDefault && v.isVerified && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setDefaultVehicle(v.id)}
                                                        className="text-xs font-bold h-9 rounded-xl border-primary/40 text-primary"
                                                    >
                                                        Chọn chạy xe này
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => deleteVehicle(v.id)}
                                                    className="text-xs font-bold h-9 rounded-xl text-destructive hover:bg-destructive/10"
                                                >
                                                    <Trash2 className="size-4" /> Xóa
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}