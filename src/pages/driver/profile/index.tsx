import { Loader2 } from "lucide-react";
import { ProfileAvatarCard } from "./components/profile-avatar-card";
import { ProfileForm } from "./components/profile-form";
import { ProfileInfoCard } from "./components/profile-info-card";
import { useDriverProfile } from "./hooks/use-driver-profile";

export default function DriverProfilePage() {
    const {
        profile,
        isLoading,
        form,
        onSubmit,
        avatarPreview,
        handleAvatarChange,
        isSaving,
    } = useDriverProfile();

    if (isLoading || !profile) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải thông tin tài xế...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-10">

            {/* <ProfileHeader /> */}

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                {/* Cột trái: Form cập nhật thông tin */}
                <div className="lg:col-span-2 w-full">
                    <ProfileForm
                        form={form}
                        onSubmit={onSubmit}
                        isSaving={isSaving}
                        avatarPreview={avatarPreview}
                    />
                </div>

                {/* Cột phải: Avatar & Thông tin phụ */}
                <div className="lg:col-span-1 space-y-6 w-full">
                    <ProfileAvatarCard
                        profile={profile}
                        avatarPreview={avatarPreview}
                        handleAvatarChange={handleAvatarChange}
                    />
                    <ProfileInfoCard profile={profile} />
                </div>
            </div>
        </div>
    );
}