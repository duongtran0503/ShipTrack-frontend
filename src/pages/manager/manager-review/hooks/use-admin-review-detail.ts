import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export interface ReviewDetailType {
    id: number;
    stars: number;
    comment: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    driverId: number;
    driverName: string;
    driverPhone: string;
    driverAvatar?: string;
    orderCode: string;
    orderAmount: number;
    createdAt: string;
    adminReply?: string;
    adminReplyAt?: string;
}

const MOCK_REVIEW_DETAIL_MAP: Record<number, ReviewDetailType> = {
    101: {
        id: 101,
        stars: 1,
        comment: "Tài xế giao hàng quá chậm, có thái độ thô lỗ và cộc lốc với khách hàng khi nhận hàng!",
        customerName: "Nguyễn Văn A",
        customerPhone: "0901112233",
        customerEmail: "nguyenvana@gmail.com",
        driverId: 5,
        driverName: "Lê Hoàng C",
        driverPhone: "0988112233",
        driverAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
        orderCode: "TRK-X99B12",
        orderAmount: 85000,
        createdAt: "2026-11-03 16:30",
    },
    103: {
        id: 103,
        stars: 5,
        comment: "Giao hàng cực kỳ nhanh chóng, tài xế thân thiện và cẩn thận với đồ dễ vỡ.",
        customerName: "Lê Minh K",
        customerPhone: "0918889900",
        customerEmail: "leminhk@gmail.com",
        driverId: 4,
        driverName: "Vũ Minh Tuấn",
        driverPhone: "0987654321",
        driverAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
        orderCode: "TRK-E11F99",
        orderAmount: 250000,
        createdAt: "2026-11-04 14:20",
        adminReply: "Cảm ơn bạn đã tin tưởng và ủng hộ dịch vụ của Shiptrack!",
        adminReplyAt: "2026-11-04 15:00",
    },
};

export function useAdminReviewDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const reviewId = Number(id) || 101;

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [deleteReason, setDeleteReason] = useState<string>("");

    const [replyContent, setReplyContent] = useState<string>("");

    const { data: review = MOCK_REVIEW_DETAIL_MAP[reviewId] || MOCK_REVIEW_DETAIL_MAP[101], isLoading } = useQuery({
        queryKey: ["admin_review_detail", reviewId],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_REVIEW_DETAIL_MAP[reviewId] || MOCK_REVIEW_DETAIL_MAP[101];
        },
    });

    // Mutation Xóa đánh giá
    const deleteMutation = useMutation({
        mutationFn: async (reason: string) => {
            await new Promise((r) => setTimeout(r, 400));
            return reason;
        },
        onSuccess: () => {
            toast.success("Đã xóa đánh giá thành công!");
            navigate("/manager/reviews");
        },
    });

    // Mutation Gửi phản hồi chính thức từ Admin
    const replyMutation = useMutation({
        mutationFn: async (content: string) => {
            await new Promise((r) => setTimeout(r, 400));
            // eslint-disable-next-line react-hooks/immutability
            review.adminReply = content;
            review.adminReplyAt = "2026-11-04 16:00";
            return content;
        },
        onSuccess: () => {
            toast.success("Đã gửi phản hồi chính thức thành công đến khách hàng!");
            queryClient.invalidateQueries({ queryKey: ["admin_review_detail", reviewId] });
            setReplyContent("");
        },
    });

    const handleBack = () => navigate("/manager/reviews");
    const goToDriverDetail = (driverId: number) => navigate(`/manager/drivers/${driverId}`);

    const handleConfirmDelete = () => {
        if (!deleteReason.trim()) {
            toast.error("Vui lòng nhập lý do xóa đánh giá!");
            return;
        }
        deleteMutation.mutate(deleteReason);
    };

    const handleSendReply = () => {
        if (!replyContent.trim()) {
            toast.error("Vui lòng nhập nội dung phản hồi chính thức!");
            return;
        }
        replyMutation.mutate(replyContent);
    };

    return {
        review,
        isLoading,
        handleBack,
        goToDriverDetail,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        deleteReason,
        setDeleteReason,
        handleConfirmDelete,
        isDeleting: deleteMutation.isPending,
        replyContent,
        setReplyContent,
        handleSendReply,
        isReplying: replyMutation.isPending,
    };
}