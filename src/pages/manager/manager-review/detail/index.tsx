import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAdminReviewDetail } from "@/pages/manager/manager-review/hooks/use-admin-review-detail";
import {
    ArrowLeft,
    Loader2,
    MessageSquare,
    Package,
    Send,
    ShieldAlert,
    Star,
    Trash2,
    Truck,
    User,
} from "lucide-react";

export default function AdminReviewDetailPage() {
    const {
        review,
        isLoading,
        handleBack,
        goToDriverDetail,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        deleteReason,
        setDeleteReason,
        handleConfirmDelete,
        isDeleting,
        replyContent,
        setReplyContent,
        handleSendReply,
        isReplying,
    } = useAdminReviewDetail();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải thông tin chi tiết đánh giá...
            </div>
        );
    }

    const isNegative = review.stars <= 2;

    return (
        <div className="w-full space-y-6 pb-12">
            {/* Header & Điều hướng */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={handleBack} className="rounded-xl size-10 p-0 border-border/60 hover:bg-accent">
                        <ArrowLeft className="size-4" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-black text-foreground">Chi tiết đánh giá #{review.id}</h1>
                            <Badge className={isNegative ? "bg-rose-500/10 text-rose-600 border-rose-500/20 text-[10px]" : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]"}>
                                {isNegative ? "Tiêu cực / Vi phạm" : "Tích cực"}
                            </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Thời điểm đánh giá: {review.createdAt}
                        </p>
                    </div>
                </div>

                {/* Nút Xóa đánh giá */}
                <Button
                    variant="destructive"
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="rounded-xl text-xs font-bold h-10 px-4"
                >
                    <Trash2 className="size-4 mr-1.5" /> Xóa đánh giá
                </Button>
            </div>

            {/* Nội dung đánh giá chính */}
            <Card className={`rounded-[24px] border shadow-sm bg-card ${isNegative ? "border-rose-500/30 bg-rose-500/5" : "border-border/60"}`}>
                <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                        <Star className={`size-4 ${isNegative ? "text-rose-500 fill-rose-500" : "text-amber-500 fill-amber-500"}`} />
                        <span>Đánh giá {review.stars} Sao từ khách hàng</span>
                    </CardTitle>
                    <span className="text-xs text-muted-foreground font-mono">{review.createdAt}</span>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <p className="text-sm text-foreground italic bg-card p-4 rounded-2xl border border-border/60 shadow-inner">
                        "{review.comment}"
                    </p>

                    {/* Phản hồi chính thức từ Admin */}
                    {review.adminReply ? (
                        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-1.5 text-xs">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-primary flex items-center gap-1.5">
                                    <MessageSquare className="size-3.5" /> Phản hồi chính thức từ quản trị viên (Admin)
                                </span>
                                <span className="text-[10px] text-muted-foreground font-mono">{review.adminReplyAt}</span>
                            </div>
                            <p className="text-foreground font-medium">{review.adminReply}</p>
                        </div>
                    ) : (
                        <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 space-y-3 text-xs">
                            <label className="font-bold text-foreground block">Gửi phản hồi chính thức từ hệ thống</label>
                            <Textarea
                                placeholder="Nhập nội dung phản hồi công khai gửi đến khách hàng..."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                className="rounded-xl text-xs min-h-[80px] border-border/60 bg-card"
                            />
                            <div className="flex justify-end">
                                <Button
                                    onClick={handleSendReply}
                                    disabled={isReplying}
                                    className="rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-4"
                                >
                                    {isReplying ? <Loader2 className="size-4 animate-spin mr-1.5" /> : <Send className="size-4 mr-1.5" />}
                                    Gửi phản hồi
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Thông tin chi tiết Khách hàng, Tài xế & Đơn hàng */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Khách hàng */}
                <Card className="rounded-[24px] border-border/60 shadow-sm bg-card">
                    <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                        <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                            <User className="size-4 text-primary" /> Thông tin khách hàng
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-3 text-xs">
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Họ và tên</span>
                            <span className="font-bold text-foreground text-sm">{review.customerName}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Số điện thoại</span>
                            <span className="font-semibold text-foreground">{review.customerPhone}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Email liên hệ</span>
                            <span className="font-semibold text-foreground">{review.customerEmail || "---"}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Tài xế */}
                <Card className="rounded-[24px] border-border/60 shadow-sm bg-card">
                    <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                        <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                            <Truck className="size-4 text-primary" /> Tài xế được đánh giá
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4 text-xs">
                        <div className="flex items-center gap-3">
                            <img
                                src={review.driverAvatar || "https://github.com/shadcn.png"}
                                alt={review.driverName}
                                className="size-10 rounded-full object-cover border border-border"
                            />
                            <div>
                                <p className="font-bold text-foreground">{review.driverName}</p>
                                <p className="text-[10px] text-muted-foreground">{review.driverPhone}</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => goToDriverDetail(review.driverId)}
                            className="w-full rounded-xl text-xs font-bold border-border/60 hover:bg-accent"
                        >
                            Xem hồ sơ tài xế
                        </Button>
                    </CardContent>
                </Card>

                {/* Đơn hàng liên quan */}
                <Card className="rounded-[24px] border-border/60 shadow-sm bg-card">
                    <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                        <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                            <Package className="size-4 text-primary" /> Đơn hàng liên quan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-3 text-xs">
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Mã vận đơn</span>
                            <span className="font-mono font-bold text-primary text-sm">#{review.orderCode}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Giá trị đơn hàng</span>
                            <span className="font-black text-shiptrack-price text-sm">{review.orderAmount.toLocaleString("vi-VN")} đ</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Modal Xóa đánh giá (Bắt buộc lý do) */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="rounded-[24px] max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-base font-bold flex items-center gap-2 text-destructive">
                            <ShieldAlert className="size-5" />
                            <span>Xác nhận xóa đánh giá #{review.id}</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Hành động này sẽ gỡ bỏ đánh giá khỏi hệ thống. Vui lòng nhập lý do cụ thể.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-2 py-2">
                        <label className="text-xs font-bold text-foreground">
                            Lý do xóa <span className="text-destructive">*</span>
                        </label>
                        <Textarea
                            placeholder="Nhập lý do chi tiết..."
                            value={deleteReason}
                            onChange={(e) => setDeleteReason(e.target.value)}
                            className="rounded-xl text-xs min-h-[90px] border-border/60"
                        />
                    </div>

                    <DialogFooter className="gap-2 pt-2">
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} className="rounded-xl text-xs font-bold">
                            Hủy bỏ
                        </Button>
                        <Button
                            onClick={handleConfirmDelete}
                            disabled={isDeleting}
                            className="rounded-xl text-xs font-bold bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                        >
                            {isDeleting ? <Loader2 className="size-4 animate-spin mr-1" /> : null}
                            Xác nhận xóa
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}