import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export interface ReviewListItem {
    id: number;
    stars: number;
    comment: string;
    customerName: string;
    customerPhone: string;
    driverId: number;
    driverName: string;
    orderCode: string;
    createdAt: string;
    isViolating?: boolean;
}

const MOCK_REVIEWS_LIST: ReviewListItem[] = [
    {
        id: 101,
        stars: 1,
        comment: "Tài xế giao hàng quá chậm, có thái độ thô lỗ và cộc lốc với khách hàng khi nhận hàng!",
        customerName: "Nguyễn Văn A",
        customerPhone: "0901112233",
        driverId: 5,
        driverName: "Lê Hoàng C",
        orderCode: "TRK-X99B12",
        createdAt: "2026-11-03 16:30",
        isViolating: true,
    },
    {
        id: 102,
        stars: 2,
        comment: "Kiện hàng bị móp một góc nhẹ, tài xế không gọi điện trước khi đến.",
        customerName: "Trần Thị B",
        customerPhone: "0904445566",
        driverId: 5,
        driverName: "Lê Hoàng C",
        orderCode: "TRK-Y88C34",
        createdAt: "2026-11-04 10:15",
    },
    {
        id: 103,
        stars: 5,
        comment: "Giao hàng cực kỳ nhanh chóng, tài xế thân thiện và cẩn thận với đồ dễ vỡ.",
        customerName: "Lê Minh K",
        customerPhone: "0918889900",
        driverId: 4,
        driverName: "Vũ Minh Tuấn",
        orderCode: "TRK-E11F99",
        createdAt: "2026-11-04 14:20",
    },
    {
        id: 104,
        stars: 5,
        comment: "Dịch vụ tuyệt vời, 5 sao cho tài xế Long nhiệt tình!",
        customerName: "Phạm Hoàng M",
        customerPhone: "0977223344",
        driverId: 2,
        driverName: "Phạm Hoàng Long",
        orderCode: "TRK-C77D88",
        createdAt: "2026-11-04 15:00",
    },
];

export function useAdminReviews() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [searchTerm, setSearchTerm] = useState("");
    const [starFilter, setStarFilter] = useState<string>("ALL"); // ALL, 1, 2, 3, 4, 5, NEGATIVE
    const [selectedReview, setSelectedReview] = useState<ReviewListItem | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [deleteReason, setDeleteReason] = useState<string>("");

    const { data: reviews = MOCK_REVIEWS_LIST, isLoading } = useQuery({
        queryKey: ["admin_reviews_list"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_REVIEWS_LIST;
        },
    });

    // Mutation Xóa đánh giá (kèm lý do bắt buộc)
    const deleteMutation = useMutation({
        mutationFn: async ({ id, reason }: { id: number; reason: string }) => {
            await new Promise((r) => setTimeout(r, 400));
            const index = MOCK_REVIEWS_LIST.findIndex((rev) => rev.id === id);
            if (index !== -1) {
                MOCK_REVIEWS_LIST.splice(index, 1);
            }
            return { id, reason };
        },
        onSuccess: () => {
            toast.success("Đã xóa đánh giá vi phạm thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin_reviews_list"] });
            setIsDeleteModalOpen(false);
            setSelectedReview(null);
            setDeleteReason("");
        },
    });

    const handleOpenDeleteModal = (review: ReviewListItem) => {
        setSelectedReview(review);
        setDeleteReason("");
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!selectedReview) return;
        if (!deleteReason.trim()) {
            toast.error("Vui lòng nhập lý do xóa đánh giá!");
            return;
        }
        deleteMutation.mutate({ id: selectedReview.id, reason: deleteReason });
    };

    const goToDetail = (id: number) => navigate(`/manager/reviews/${id}`);

    const filteredReviews = reviews.filter((rev) => {
        const matchesSearch =
            rev.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rev.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rev.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rev.orderCode.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (starFilter === "NEGATIVE") {
            return rev.stars <= 2;
        }
        if (starFilter !== "ALL") {
            return rev.stars === Number(starFilter);
        }

        return true;
    });

    return {
        reviews: filteredReviews,
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
        isDeleting: deleteMutation.isPending,
    };
}