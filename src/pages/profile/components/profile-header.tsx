import { Mail } from "lucide-react"

import type { MockUser } from "@/demo_data_services/mockAuthService"
import { ProfileRoleBadge } from "./profile-role-badge"

interface Props {
    currentUser: MockUser | null
    displayName: string
    avatarInitial: string
}

export function ProfileHeader({ currentUser, displayName, avatarInitial }: Props) {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-3xl bg-card border border-border/60 shadow-lg">
            <div className="flex items-center gap-4">
                {/* Avatar chữ cái đầu */}
                <div className="size-16 rounded-2xl bg-(image:--background-image-shiptrack-gradient) text-white font-black text-2xl flex items-center justify-center shadow-md">
                    {avatarInitial}
                </div>
                <div className="space-y-1">
                    <h1 className="text-xl md:text-2xl font-extrabold text-foreground">
                        {displayName}
                    </h1>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Mail className="size-3.5" /> {currentUser?.email}
                    </p>
                </div>
            </div>
            <div>
                <ProfileRoleBadge role={currentUser?.role} />
            </div>
        </div>
    )
}