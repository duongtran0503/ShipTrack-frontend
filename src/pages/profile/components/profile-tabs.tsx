
import type { ProfileTab } from "@/pages/profile/hooks/use-profile";
import { Lock, User } from "lucide-react";


interface Props {
    activeTab: ProfileTab
    onTabChange: (tab: ProfileTab) => void
}

const TABS: { key: ProfileTab; label: string; icon: typeof User }[] = [
    { key: "info", label: "Thông tin cá nhân", icon: User },
    { key: "password", label: "Đổi mật khẩu", icon: Lock },
]

export function ProfileTabs({ activeTab, onTabChange }: Props) {
    return (
        <div className="flex gap-2 p-1 bg-muted/60 rounded-2xl border border-border/50 max-w-md">
            {TABS.map(({ key, label, icon: Icon }) => (
                <button
                    key={key}
                    type="button"
                    onClick={() => onTabChange(key)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === key
                        ? "bg-card text-primary shadow-md border border-border/50"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Icon className="size-4" />
                    <span>{label}</span>
                </button>
            ))}
        </div>
    )
}