import { BannedUsersTable } from "@/pages/manager/user/components/data-table-user-banned";
import { UnbanUserDialog } from "@/pages/manager/user/components/un-ban-dialog";
import { useAdminBannedUsers } from "@/pages/manager/user/hooks/use-admin-banned-users";
import { Loader2 } from "lucide-react";

export default function AdminBannedUsersPage() {
    const {
        bannedUsers,
        isLoading,
        goToUserDetail,
        isUnbanModalOpen,
        setIsUnbanModalOpen,
        selectedUser,
        handleOpenUnbanModal,
        handleConfirmUnban,
        isUnbanPending,
    } = useAdminBannedUsers();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải danh sách tài khoản bị khóa...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            <BannedUsersTable
                users={bannedUsers}
                onView={(user) => goToUserDetail(user.Id)}
                onUnban={(user) => handleOpenUnbanModal(user)}
            />

            <UnbanUserDialog
                isOpen={isUnbanModalOpen}
                onOpenChange={setIsUnbanModalOpen}
                user={selectedUser}
                onConfirm={handleConfirmUnban}
                isPending={isUnbanPending}
            />
        </div>
    );
}