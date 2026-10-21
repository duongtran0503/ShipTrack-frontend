import { useProfile } from "@/pages/profile/hooks/use-profile"
import { ProfileHeader } from "./components/profile-header"
import { ProfileInfoForm } from "./components/profile-info-form"
import { ProfilePasswordForm } from "./components/profile-password-form"
import { ProfileTabs } from "./components/profile-tabs"

export default function ProfilePage() {
    const {
        // State
        currentUser,
        activeTab,
        setActiveTab,
        // Info form
        infoForm,
        onUpdateInfo,
        isUpdatingProfile,
        // Password form
        passwordForm,
        onChangePassword,
        isChangingPassword,
        // Helpers
        isDriver,
        avatarInitial,
        displayName,
    } = useProfile()

    return (
        <div className="min-h-screen bg-muted/30 p-4 md:p-8 text-foreground">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header hồ sơ */}
                <ProfileHeader
                    currentUser={currentUser}
                    displayName={displayName}
                    avatarInitial={avatarInitial}
                />

                {/* Tab switcher */}
                <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Nội dung tab */}
                {activeTab === "info" && (
                    <ProfileInfoForm
                        form={infoForm}
                        onSubmit={onUpdateInfo}
                        isDriver={isDriver}
                        isPending={isUpdatingProfile}
                    />
                )}

                {activeTab === "password" && (
                    <ProfilePasswordForm
                        form={passwordForm}
                        onSubmit={onChangePassword}
                        isPending={isChangingPassword}
                    />
                )}
            </div>
        </div>
    )
}