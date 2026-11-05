import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
export interface UserResponse {
    Id: number;
    UserId: number;
    Name: string;
    Email: string;
    Role: string; // "Customer", "Driver", "Admin"
    Phone: string;
    LicensePlate?: string | null;
    Balance: number;
    IsActive: boolean;
    BanReason?: string | null;
    Online: boolean;
    CreatedAt?: string; // Bổ sung hiển thị ngày tạo
}
const MOCK_USERS: UserResponse[] = [
    { Id: 1, UserId: 1, Name: "Nguyễn Văn A", Email: "nguyenvana@gmail.com", Role: "Customer", Phone: "0901112223", Balance: 500000, IsActive: true, Online: false, CreatedAt: "2026-10-01" },
    { Id: 2, UserId: 2, Name: "Phạm Hoàng Long", Email: "long.pham@gmail.com", Role: "Driver", Phone: "0912345678", LicensePlate: "59-G1 123.45", Balance: 1250000, IsActive: true, Online: true, CreatedAt: "2026-10-05" },
    { Id: 3, UserId: 3, Name: "Trần Thị B", Email: "tranthib@gmail.com", Role: "Customer", Phone: "0904445556", Balance: 120000, IsActive: false, BanReason: "Vi phạm chính sách", Online: false, CreatedAt: "2026-10-10" },
    { Id: 4, UserId: 4, Name: "Vũ Minh Tuấn", Email: "tuan.vu@gmail.com", Role: "Driver", Phone: "0987654321", LicensePlate: "59-C2 678.90", Balance: 3400000, IsActive: true, Online: false, CreatedAt: "2026-10-15" },
];

export function useAdminUsers() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [isBanModalOpen, setIsBanModalOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
    const [banReason, setBanReason] = useState<string>("");

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["admin_users_list"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_USERS;
        },
    });

    const toggleActiveMutation = useMutation({
        mutationFn: async ({ id, isActive, reason }: { id: number; isActive: boolean; reason?: string }) => {
            await new Promise((r) => setTimeout(r, 500));
            const target = MOCK_USERS.find((u) => u.Id === id);
            if (target) {
                target.IsActive = isActive;
                target.BanReason = reason || null;
            }
            return target;
        },
        onSuccess: (_data, variables) => {
            toast.success(variables.isActive ? "Đã mở khóa tài khoản thành công!" : "Đã khóa tài khoản thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin_users_list"] });
            setIsBanModalOpen(false);
            setSelectedUser(null);
            setBanReason("");
        },
    });

    const goToUserDetail = (id: number) => navigate(`/manager/users/${id}`);

    const handleOpenBanModal = (user: UserResponse) => {
        setSelectedUser(user);
        setIsBanModalOpen(true);
    };

    const handleToggleUserStatus = () => {
        if (!selectedUser) return;
        const nextActiveState = !selectedUser.IsActive;
        if (!nextActiveState && !banReason.trim()) {
            toast.error("Vui lòng nhập lý do khóa tài khoản!");
            return;
        }

        toggleActiveMutation.mutate({
            id: selectedUser.Id,
            isActive: nextActiveState,
            reason: banReason,
        });
    };

    return {
        users,
        isLoading,
        goToUserDetail,
        isBanModalOpen,
        setIsBanModalOpen,
        selectedUser,
        banReason,
        setBanReason,
        handleOpenBanModal,
        handleToggleUserStatus,
        isPending: toggleActiveMutation.isPending,
    };
}