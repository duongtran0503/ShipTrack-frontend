import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AddressSearchInput } from "@/pages/customer/order/create/components/address-search-input";
import type { ServiceAreaResponse, UpsertServiceAreaRequest } from "@/pages/driver/service-areas/hooks/use-driver-service-areas";
import { Loader2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (payload: UpsertServiceAreaRequest & { id?: number }) => Promise<any>;
    isSaving: boolean;
    editingArea?: ServiceAreaResponse | null;
}

export function ServiceAreaModal({ isOpen, onClose, onSave, isSaving, editingArea }: Props) {
    const [name, setName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [centerLat, setCenterLat] = useState<number>(10.7769);
    const [centerLng, setCenterLng] = useState<number>(106.7009);
    const [radiusKm, setRadiusKm] = useState<number>(5);
    const [isDefault, setIsDefault] = useState(false);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (editingArea) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setName(editingArea.name);
            setSearchQuery(editingArea.name);
            setCenterLat(editingArea.centerLat);
            setCenterLng(editingArea.centerLng);
            setRadiusKm(editingArea.radiusKm);
            setIsDefault(editingArea.isDefault);
            setIsActive(editingArea.isActive);
        } else {
            setName("");
            setSearchQuery("");
            setCenterLat(10.7769);
            setCenterLng(106.7009);
            setRadiusKm(5);
            setIsDefault(false);
            setIsActive(true);
        }
    }, [editingArea, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error("Vui lòng nhập tên vùng phục vụ.");
            return;
        }
        if (radiusKm <= 0) {
            toast.error("Bán kính vùng phục vụ phải lớn hơn 0.");
            return;
        }

        await onSave({
            id: editingArea?.id,
            name,
            centerLat,
            centerLng,
            radiusKm,
            isDefault,
            isActive,
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg rounded-[28px] p-6 bg-card border border-border shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-foreground">
                        {editingArea ? "Chỉnh sửa vùng phục vụ" : "Thêm vùng phục vụ mới"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5 pt-2">
                    <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-foreground uppercase tracking-wider">Tên vùng / Khu vực</Label>
                        <Input
                            placeholder="Ví dụ: Khu vực Quận 1 & Thủ Đức"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-11 rounded-xl text-xs bg-muted/40 font-semibold"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <AddressSearchInput
                            label="Tìm kiếm địa điểm tâm (Center)"
                            placeholder="Nhập địa chỉ tâm của vùng..."
                            value={searchQuery}
                            onChange={(val) => setSearchQuery(val)}
                            onSelectLocation={(loc) => {
                                setCenterLat(loc.lat);
                                setCenterLng(loc.lng);
                                toast.success(`Đã chọn tọa độ: ${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`);
                            }}
                        />
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1 font-medium">
                            <MapPin className="size-3 text-primary" /> Tọa độ hiện tại: <span className="font-mono">{centerLat.toFixed(4)}, {centerLng.toFixed(4)}</span>
                        </p>
                    </div>

                    <div className="space-y-2 p-4 rounded-2xl bg-muted/30 border border-border/40">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs font-bold text-foreground uppercase tracking-wider">Bán kính hoạt động (Km)</Label>
                            <span className="text-sm font-black text-primary bg-primary/10 px-3 py-1 rounded-xl">
                                {radiusKm} km
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0.5"
                            max="50"
                            step="0.5"
                            value={radiusKm}
                            onChange={(e) => setRadiusKm(Number(e.target.value))}
                            className="w-full accent-primary cursor-pointer"
                        />
                    </div>

                    <div className="space-y-3 pt-2 border-t border-border/40">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-foreground">Đặt làm vùng mặc định</p>
                                <p className="text-[11px] text-muted-foreground">Ưu tiên quét đơn tự động cho vùng này.</p>
                            </div>
                            <Switch checked={isDefault} onCheckedChange={setIsDefault} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-foreground">Kích hoạt hoạt động</p>
                                <p className="text-[11px] text-muted-foreground">Bật để hệ thống quét đơn hàng trong vùng.</p>
                            </div>
                            <Switch checked={isActive} onCheckedChange={setIsActive} />
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-border/40">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="rounded-xl text-xs font-bold h-11 px-6 cursor-pointer"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSaving}
                            className="rounded-xl bg-[#710105] hover:bg-[#580104] text-white font-bold text-xs h-11 px-8 shadow-md cursor-pointer gap-2"
                        >
                            {isSaving && <Loader2 className="size-4 animate-spin" />}
                            {editingArea ? "Lưu thay đổi" : "Thêm vùng mới"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}