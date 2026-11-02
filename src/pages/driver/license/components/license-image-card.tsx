import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Upload } from "lucide-react";

interface Props {
    currentImage: string;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LicenseImageCard({ currentImage, handleImageChange }: Props) {
    return (
        <Card className="rounded-[24px] border-border/50 shadow-sm bg-card p-6 space-y-4">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Ảnh chụp Bằng lái</h4>

            <div className="relative rounded-2xl overflow-hidden border border-border/60 bg-muted group aspect-video">
                <img
                    src={currentImage}
                    alt="Giấy phép lái xe"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    {/* Sử dụng Dialog của shadcn */}
                    <Dialog>
                        <DialogTrigger >
                            <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                className="h-9 rounded-xl font-bold text-xs"
                            >
                                <Eye className="size-4 mr-1.5" /> Xem lớn
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl p-2 rounded-[24px] bg-card">
                            <DialogHeader className="p-2">
                                <DialogTitle className="text-sm font-bold text-center">Ảnh chụp Bằng lái xe</DialogTitle>
                            </DialogHeader>
                            <div className="overflow-hidden rounded-xl bg-muted">
                                <img
                                    src={currentImage}
                                    alt="Giấy phép lái xe phóng to"
                                    className="w-full h-auto max-h-[75vh] object-contain"
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Nút chọn ảnh mới */}
            <div className="space-y-2">
                <label className="flex items-center justify-center gap-2 w-full h-11 rounded-2xl border border-dashed border-primary/40 hover:bg-primary/5 text-primary text-xs font-bold cursor-pointer transition-all">
                    <Upload className="size-4" />
                    <span>Tải lên ảnh mới (Mặt trước)</span>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </label>
                <p className="text-[10px] text-muted-foreground text-center">
                    Định dạng JPG, PNG hoặc WEBP (Tối đa 5MB)
                </p>
            </div>
        </Card>
    );
}