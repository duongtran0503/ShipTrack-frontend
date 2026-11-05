import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, FileText, Loader2, Truck, User } from "lucide-react";
import type { VehicleApprovalItem } from "../hooks/use-vehicle-approvals";

interface Props {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    vehicle: VehicleApprovalItem | null;
    onApprove: (id: number) => void;
    onReject: (vehicle: VehicleApprovalItem) => void;
    isApproving: boolean;
}

export function ApprovalDetailDialog({ isOpen, onOpenChange, vehicle, onApprove, onReject, isApproving }: Props) {
    if (!vehicle) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            {/* Đã mở rộng max-w-4xl / sm:max-w-5xl để form rộng rãi, không bị bó sát */}
            <DialogContent className="rounded-[24px] max-w-4xl sm:max-w-5xl max-h-[90vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle className="text-base font-bold flex items-center gap-2">
                        <FileText className="size-5 text-primary" />
                        <span>Chi tiết kiểm duyệt phương tiện & tài xế: {vehicle.licensePlate}</span>
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        Kiểm tra toàn diện thông tin cá nhân tài xế và hồ sơ phương tiện trước khi phê duyệt.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 text-xs py-2">
                    {/* 1. THÔNG TIN CHI TIẾT TÀI XẾ */}
                    <div className="space-y-3">
                        <h3 className="font-bold text-foreground flex items-center gap-1.5 text-xs uppercase tracking-wider text-primary">
                            <User className="size-4" /> 1. Thông tin tài xế sở hữu
                        </h3>
                        <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src={vehicle.driverAvatar || "https://github.com/shadcn.png"}
                                    alt={vehicle.driverName}
                                    className="size-12 rounded-full object-cover border border-border shrink-0"
                                />
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="font-bold text-foreground text-sm">{vehicle.driverName}</p>
                                        <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]">Tài xế</Badge>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground mt-0.5">
                                        SĐT: <span className="font-semibold text-foreground">{vehicle.driverPhone}</span> • ID: #{vehicle.driverId}
                                    </p>
                                </div>
                            </div>
                            <div className="text-left sm:text-right shrink-0">
                                <span className="text-[10px] text-muted-foreground block">Trạng thái tài khoản</span>
                                <span className="font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                                    <span className="size-2 rounded-full bg-emerald-500" /> Đang hoạt động
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 2. THÔNG TIN CHI TIẾT VỀ XE */}
                    <div className="space-y-2">
                        <h3 className="font-bold text-foreground flex items-center gap-1 text-xs uppercase tracking-wider text-primary">
                            <Truck className="size-4" /> 2. Thông tin chi tiết phương tiện
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 p-4 rounded-2xl bg-muted/30 border border-border/50">
                            <div>
                                <span className="text-muted-foreground block text-[11px]">Loại phương tiện</span>
                                <span className="font-bold text-foreground mt-0.5 block">{vehicle.vehicleType}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block text-[11px]">Biển số xe</span>
                                <span className="font-bold font-mono text-foreground text-sm mt-0.5 block">{vehicle.licensePlate}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block text-[11px]">Hãng xe</span>
                                <span className="font-bold text-foreground mt-0.5 block">{vehicle.brand || "---"}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block text-[11px]">Màu sắc</span>
                                <span className="font-bold text-foreground mt-0.5 block">{vehicle.color || "---"}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block text-[11px]">Tải trọng tối đa</span>
                                <span className="font-bold text-foreground mt-0.5 block">{vehicle.maxWeightKg} kg</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block text-[11px]">Ngày đăng ký</span>
                                <span className="font-bold text-foreground mt-0.5 block">{vehicle.registeredAt}</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. HÌNH ẢNH XÁC THỰC THỰC TẾ */}
                    <div className="space-y-2">
                        <span className="font-bold text-foreground block uppercase tracking-wider text-[11px] text-muted-foreground">
                            3. Hình ảnh thực tế xe & Biển số xác thực
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="border border-border/60 rounded-xl overflow-hidden bg-muted/20">
                                <p className="text-[10px] font-semibold text-muted-foreground p-2 bg-muted/50 border-b border-border/40 text-center">Ảnh tổng quan phương tiện</p>
                                <img src={vehicle.vehicleImageUrl} alt="Ảnh xe" className="w-full h-48 object-cover" />
                            </div>
                            <div className="border border-border/60 rounded-xl overflow-hidden bg-muted/20">
                                <p className="text-[10px] font-semibold text-muted-foreground p-2 bg-muted/50 border-b border-border/40 text-center">Ảnh chụp Biển số xe</p>
                                <img src={vehicle.licensePlateImageUrl} alt="Ảnh biển số" className="w-full h-48 object-cover" />
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2 pt-1 border-t border-border/40 sm:justify-end">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="rounded-xl text-xs font-bold"
                    >
                        Đóng
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => onReject(vehicle)}
                        className="rounded-xl text-xs font-bold"
                    >
                        Từ chối xe
                    </Button>
                    <Button
                        onClick={() => onApprove(vehicle.id)}
                        disabled={isApproving}
                        className="rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                        {isApproving ? <Loader2 className="size-4 animate-spin mr-1" /> : <CheckCircle2 className="size-4 mr-1" />}
                        Phê duyệt phương tiện
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}