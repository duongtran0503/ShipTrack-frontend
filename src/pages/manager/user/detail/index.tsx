import { BanUserDialog } from "@/pages/manager/user/components/ban-user-dialog";
import { ResetPasswordDialog } from "@/pages/manager/user/components/reset-password-dialog";
import { UserActivityHistory } from "@/pages/manager/user/components/user-activity-history";
import { UserBanWarning } from "@/pages/manager/user/components/user-ban-warning";
import { UserDetailHeader } from "@/pages/manager/user/components/user-detail-header";
import { UserInfoCards } from "@/pages/manager/user/components/user-info-cards";
import { useAdminUserDetail } from "@/pages/manager/user/hooks/use-admin-user-detail";
import { Loader2 } from "lucide-react";

export default function AdminUserDetailPageRoute() {
    const {
        user,
        isLoading,
        handleBack,
        showSensitiveInfo,
        toggleShowSensitiveInfo,
        isBanModalOpen,
        setIsBanModalOpen,
        banReason,
        setBanReason,
        handleToggleUserStatus,
        isBanPending,
        isResetPasswordModalOpen,
        setIsResetPasswordModalOpen,
        handleResetPassword,
        isResetPending,
        setIsEditModalOpen,
    } = useAdminUserDetail();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải thông tin người dùng...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            {/* 1. Header */}
            <UserDetailHeader
                user={user}
                onBack={handleBack}
                onEdit={() => setIsEditModalOpen(true)}
                onResetPassword={() => setIsResetPasswordModalOpen(true)}
                onBanToggle={() => setIsBanModalOpen(true)}
            />

            {/* 1.1 Cảnh báo nếu tài khoản bị khóa */}
            <UserBanWarning user={user} />

            {/* 2. Thẻ thông tin cơ bản */}
            <UserInfoCards
                user={user}
                showSensitiveInfo={showSensitiveInfo}
                toggleShowSensitiveInfo={toggleShowSensitiveInfo}
            />

            {/* 3. Lịch sử hoạt động */}
            <UserActivityHistory user={user} />

            {/* 4. Modal Khóa/Mở khóa */}
            <BanUserDialog
                isOpen={isBanModalOpen}
                onOpenChange={setIsBanModalOpen}
                user={user}
                reason={banReason}
                setReason={setBanReason}
                onConfirm={handleToggleUserStatus}
                isPending={isBanPending}
            />

            {/* 5. Modal Reset Mật khẩu */}
            <ResetPasswordDialog
                isOpen={isResetPasswordModalOpen}
                onOpenChange={setIsResetPasswordModalOpen}
                email={user.Email}
                onConfirm={handleResetPassword}
                isPending={isResetPending}
            />
        </div>
    );
}