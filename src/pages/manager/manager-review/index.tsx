import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAdminReviews, type ReviewListItem } from "@/pages/manager/manager-review/hooks/use-admin-reviews";
import {
    AlertTriangle,
    Eye,
    Loader2,
    MessageSquare,
    Search,
    ShieldAlert,
    Star,
    Trash2,
} from "lucide-react";

export default function AdminReviewsPage() {
    const {
        reviews,
        isLoading,
        searchTerm,
        setSearchTerm,
        starFilter,
        setStarFilter,
        goToDetail,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        selectedReview,
        deleteReason,
        setDeleteReason,
        handleOpenDeleteModal,
        handleConfirmDelete,
        isDeleting,
    } = useAdminReviews();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải danh sách đánh giá hệ thống...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-xl font-black text-foreground flex items-center gap-2">
                    <MessageSquare className="size-6 text-primary" />
                    <span>Quản lý đánh giá & Phản hồi</span>
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                    Theo dõi toàn bộ ý kiến đánh giá từ khách hàng, kiểm duyệt các phản hồi tiêu cực hoặc vi phạm tiêu chuẩn cộng đồng.
                </p>
            </div>

            {/* Thanh tìm kiếm và bộ lọc số sao */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-card p-4 rounded-[20px] border border-border/60 shadow-sm">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Tìm theo nội dung, tên khách hàng, tài xế, mã đơn..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 text-xs rounded-xl border-border/60 h-10"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {[
                        { label: "Tất cả", value: "ALL" },
                        { label: "Tiêu cực (1-2★)", value: "NEGATIVE" },
                        { label: "5 Sao ★", value: "5" },
                        { label: "4 Sao ★", value: "4" },
                        { label: "3 Sao ★", value: "3" },
                    ].map((tab) => (
                        <Button
                            key={tab.value}
                            variant={starFilter === tab.value ? (tab.value === "NEGATIVE" ? "destructive" : "default") : "outline"}
                            size="sm"
                            onClick={() => setStarFilter(tab.value)}
                            className="rounded-xl text-xs font-semibold h-9"
                        >
                            {tab.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Bảng danh sách đánh giá */}
            <Card className="rounded-[24px] border-border/60 shadow-sm bg-card overflow-hidden">
                <CardContent className="p-0">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border/40 bg-muted/30 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                                    <th className="p-4 pl-6">Số sao</th>
                                    <th className="p-4">Nội dung nhận xét</th>
                                    <th className="p-4">Khách hàng</th>
                                    <th className="p-4">Tài xế được đánh giá</th>
                                    <th className="p-4">Mã đơn hàng</th>
                                    <th className="p-4">Thời gian</th>
                                    <th className="p-4 pr-6 text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/30 text-xs">
                                {reviews.length > 0 ? (
                                    reviews.map((rev: ReviewListItem) => {
                                        const isNegative = rev.stars <= 2;
                                        return (
                                            <tr
                                                key={rev.id}
                                                className={`transition-colors ${isNegative ? "bg-rose-500/5 hover:bg-rose-500/10" : "hover:bg-muted/20"
                                                    }`}
                                            >
                                                <td className="p-4 pl-6">
                                                    <div className="flex items-center gap-1 font-bold">
                                                        <span className={isNegative ? "text-rose-600 font-black text-sm" : "text-foreground"}>
                                                            {rev.stars}
                                                        </span>
                                                        <Star className={`size-3.5 ${isNegative ? "text-rose-500 fill-rose-500" : "text-amber-500 fill-amber-500"}`} />
                                                    </div>
                                                </td>
                                                <td className="p-4 max-w-xs">
                                                    <p className={`line-clamp-2 ${isNegative ? "font-semibold text-rose-700 dark:text-rose-300" : "text-foreground"}`}>
                                                        "{rev.comment}"
                                                    </p>
                                                    {isNegative && (
                                                        <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20 text-[9px] mt-1 font-bold">
                                                            <AlertTriangle className="size-2.5 mr-1" /> Tiêu cực cần xử lý
                                                        </Badge>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    <p className="font-bold text-foreground">{rev.customerName}</p>
                                                    <p className="text-[10px] text-muted-foreground">{rev.customerPhone}</p>
                                                </td>
                                                <td className="p-4 font-semibold text-primary">{rev.driverName}</td>
                                                <td className="p-4">
                                                    <span className="font-mono font-bold text-xs bg-muted/50 px-2 py-0.5 rounded border border-border/60">
                                                        #{rev.orderCode}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-muted-foreground text-[11px]">{rev.createdAt}</td>
                                                <td className="p-4 pr-6 text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => goToDetail(rev.id)}
                                                            className="h-8 w-8 p-0 rounded-xl hover:bg-primary/10 hover:text-primary"
                                                            title="Xem chi tiết"
                                                        >
                                                            <Eye className="size-4" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => handleOpenDeleteModal(rev)}
                                                            className="h-8 w-8 p-0 rounded-xl hover:bg-destructive/10 hover:text-destructive text-muted-foreground"
                                                            title="Xóa đánh giá vi phạm"
                                                        >
                                                            <Trash2 className="size-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="text-center py-12 text-xs text-muted-foreground">
                                            Không tìm thấy đánh giá nào phù hợp với bộ lọc.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Modal Xóa đánh giá vi phạm (Bắt buộc nhập lý do) */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="rounded-[24px] max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-base font-bold flex items-center gap-2 text-destructive">
                            <ShieldAlert className="size-5" />
                            <span>Xác nhận xóa đánh giá #{selectedReview?.id}</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Hành động này sẽ gỡ bỏ đánh giá khỏi hệ thống. Vui lòng nhập lý do xóa (VD: Ngôn từ xúc phạm, nội dung rác...).
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-2 py-2">
                        <label className="text-xs font-bold text-foreground">
                            Lý do xóa đánh giá <span className="text-destructive">*</span>
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