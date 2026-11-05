import { UserTable } from "@/pages/manager/user/components/data-table-user";
import { Loader2 } from "lucide-react";
import { BanUserDialog } from "./components/ban-user-dialog";
import { useAdminUsers, type UserResponse } from "./hooks/use-admin-users";

export default function AdminUsersPage() {
    const {
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
        isPending,
    } = useAdminUsers();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải danh sách người dùng...
            </div>
        );
    }

    // Bulk action tạm thời chưa xử lý logic (bạn có thể cập nhật sau)
    const handleBulkBan = (selectedUsers: UserResponse[], isBan: boolean) => {
        console.log("Bulk action:", selectedUsers, isBan);
    };

    return (
        <div className="w-full space-y-6 pb-12">
            <UserTable
                users={users}
                onView={(user) => goToUserDetail(user.Id)}
                onBanToggle={(user) => handleOpenBanModal(user)}
                onBulkBan={handleBulkBan}
            />

            <BanUserDialog
                isOpen={isBanModalOpen}
                onOpenChange={setIsBanModalOpen}
                user={selectedUser}
                reason={banReason}
                setReason={setBanReason}
                onConfirm={handleToggleUserStatus}
                isPending={isPending}
            />
        </div>
    );
}