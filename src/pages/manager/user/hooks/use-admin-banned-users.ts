import type { UserResponse } from "@/pages/manager/user/hooks/use-admin-users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
export interface BannedUserResponse extends UserResponse {
    BanReason?: string | null;
    BannedAt?: string;
    BannedBy?: string;
}


const MOCK_BANNED_USERS: BannedUserResponse[] = [
    {
        Id: 3,
        UserId: 3,
        Name: "Trần Thị B",
        Email: "tranthib@gmail.com",
        Role: "Customer",
        Phone: "0904445556",
        Balance: 120000,
        IsActive: false,
        Online: false,
        CreatedAt: "2026-10-10",
        BanReason: "Vi phạm chính sách thanh toán và gian lận đơn hàng",
        BannedAt: "2026-11-01 10:30",
        BannedBy: "Admin Hệ Thống",
    },
    {
        Id: 5,
        UserId: 5,
        Name: "Lê Hoàng C",
        Email: "lehoangc@gmail.com",
        Role: "Driver",
        Phone: "0988112233",
        LicensePlate: "59-X1 999.99",
        Balance: 0,
        IsActive: false,
        Online: false,
        CreatedAt: "2026-10-12",
        BanReason: "Hủy đơn hàng quá nhiều lần liên tiếp không có lý do",
        BannedAt: "2026-11-02 14:15",
        BannedBy: "Admin Kiểm Duyệt",
    },
];

export function useAdminBannedUsers() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [isUnbanModalOpen, setIsUnbanModalOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<BannedUserResponse | null>(null);

    const { data: bannedUsers = [], isLoading } = useQuery({
        queryKey: ["admin_banned_users_list"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_BANNED_USERS;
        },
    });

    const unbanMutation = useMutation({
        mutationFn: async ({ id }: { id: number }) => {
            await new Promise((r) => setTimeout(r, 400));
            const target = MOCK_BANNED_USERS.find((u) => u.Id === id);
            if (target) {
                target.IsActive = true;
                target.BanReason = null;
            }
            return target;
        },
        onSuccess: () => {
            toast.success("Đã mở khóa tài khoản thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin_banned_users_list"] });
            setIsUnbanModalOpen(false);
            setSelectedUser(null);
        },
    });

    const goToUserDetail = (id: number) => navigate(`/manager/users/${id}`);

    const handleOpenUnbanModal = (user: BannedUserResponse) => {
        setSelectedUser(user);
        setIsUnbanModalOpen(true);
    };

    const handleConfirmUnban = () => {
        if (!selectedUser) return;
        unbanMutation.mutate({ id: selectedUser.Id });
    };

    return {
        bannedUsers,
        isLoading,
        goToUserDetail,
        isUnbanModalOpen,
        setIsUnbanModalOpen,
        selectedUser,
        handleOpenUnbanModal,
        handleConfirmUnban,
        isUnbanPending: unbanMutation.isPending,
    };
}
