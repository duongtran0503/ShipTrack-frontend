import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Edit3, Loader2, MapPin, PlusCircle, Radio } from "lucide-react";
import { ServiceAreaModal } from "./components/service-area-modal";
import { useDriverServiceAreas } from "./hooks/use-driver-service-areas";

export default function ServiceAreasPage() {
    const {
        serviceAreas,
        isLoading,
        isCreateModalOpen,
        editingArea,
        openCreateModal,
        openEditModal,
        closeModal,
        saveServiceArea,
        isSaving,
        toggleActive,
        setDefaultArea,
    } = useDriverServiceAreas();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải danh sách vùng phục vụ...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-16 px-2 sm:px-4">

            {/* Header Trang */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black text-foreground">Vùng phục vụ nhận đơn</h1>
                    <p className="text-xs text-muted-foreground">
                        Cấu hình các khu vực bạn muốn nhận đơn hàng để hệ thống tự động phân phối tối ưu.
                    </p>
                </div>
                <Button
                    onClick={openCreateModal}
                    className="rounded-2xl bg-[#710105] hover:bg-[#580104] text-white font-bold text-xs h-11 px-6 shadow-md cursor-pointer gap-2"
                >
                    <PlusCircle className="size-4" /> Thêm vùng phục vụ
                </Button>
            </div>

            {/* Danh sách các Card Vùng Phục Vụ (Style Card Address) */}
            {serviceAreas.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-[28px] border border-border/50 p-8 space-y-4 shadow-sm">
                    <div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                        <Radio className="size-8" />
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-base font-bold text-foreground">Chưa có vùng phục vụ nào</h2>
                        <p className="text-xs text-muted-foreground">Hãy thêm ít nhất một vùng để bắt đầu nhận đơn hàng quanh bạn.</p>
                    </div>
                    <Button
                        onClick={openCreateModal}
                        className="rounded-xl bg-[#710105] hover:bg-[#580104] text-white font-bold text-xs h-10 px-6 cursor-pointer"
                    >
                        Thêm vùng ngay
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceAreas.map((area) => (
                        <Card
                            key={area.id}
                            className={`rounded-[24px] border transition-all shadow-sm bg-card ${area.isDefault ? "border-primary/60 shadow-md ring-1 ring-primary/20" : "border-border/60"
                                }`}
                        >
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                            <MapPin className="size-5" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-sm font-black text-foreground">{area.name}</h3>
                                                {area.isDefault && (
                                                    <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                        Mặc định
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-[11px] text-muted-foreground font-mono">
                                                Bán kính: <strong className="text-foreground">{area.radiusKm} km</strong>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Switch Bật/Tắt IsActive nhanh */}
                                    <Switch
                                        checked={area.isActive}
                                        onCheckedChange={(checked) => toggleActive(area, checked)}
                                    />
                                </div>

                                <div className="p-3 rounded-xl bg-muted/40 border border-border/40 text-[11px] space-y-1">
                                    <div className="flex items-center justify-between text-muted-foreground font-medium">
                                        <span>Tọa độ tâm (Lat, Lng):</span>
                                        <span className="font-mono font-bold text-foreground">
                                            {area.centerLat.toFixed(4)}, {area.centerLng.toFixed(4)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-muted-foreground font-medium">
                                        <span>Trạng thái hoạt động:</span>
                                        <span className={area.isActive ? "text-emerald-600 font-bold" : "text-muted-foreground"}>
                                            {area.isActive ? "🟢 Đang quét đơn" : "⚪ Tạm dừng"}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-border/40">
                                    {!area.isDefault ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setDefaultArea(area)}
                                            className="text-xs font-bold text-primary hover:bg-primary/10 h-8 px-3 rounded-lg cursor-pointer"
                                        >
                                            Đặt làm mặc định
                                        </Button>
                                    ) : (
                                        <span className="text-[11px] text-muted-foreground font-semibold italic">Đang là vùng chính</span>
                                    )}

                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openEditModal(area)}
                                            className="text-xs font-bold h-8 px-3 rounded-lg hover:bg-muted cursor-pointer gap-1.5"
                                        >
                                            <Edit3 className="size-3.5" /> Sửa
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Modal Thêm / Sửa Vùng Phục Vụ */}
            <ServiceAreaModal
                isOpen={isCreateModalOpen}
                onClose={closeModal}
                onSave={saveServiceArea}
                isSaving={isSaving}
                editingArea={editingArea}
            />

        </div>
    );
}