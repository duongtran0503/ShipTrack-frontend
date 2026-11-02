import { Card } from "@/components/ui/card";
import { Camera, ShieldCheck } from "lucide-react";
import type { DriverProfileData } from "../types";

interface Props {
    profile: DriverProfileData;
    avatarPreview: string | null;
    handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileAvatarCard({ profile, avatarPreview, handleAvatarChange }: Props) {
    const currentAvatar = avatarPreview || profile.avatarUrl;

    return (
        <Card className="rounded-[24px] border-border/50 shadow-sm bg-card overflow-hidden text-center p-6 space-y-4">
            <div className="relative size-32 mx-auto group">
                <img
                    src={currentAvatar}
                    alt={profile.fullName}
                    className="size-32 rounded-full object-cover border-4 border-primary/20 bg-muted shadow-md"
                />
                <label className="absolute bottom-0 right-0 size-10 rounded-full bg-[#710105] text-white flex items-center justify-center cursor-pointer shadow-md hover:bg-[#580104] transition-all hover:scale-105">
                    <Camera className="size-5" />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                    />
                </label>
            </div>

            <div>
                <h3 className="text-base font-bold text-foreground">{profile.fullName}</h3>
                <p className="text-xs font-semibold text-primary">Mã TX: #{profile.id}</p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold">
                <ShieldCheck className="size-4" />
                <span>Tài khoản đã xác thực</span>
            </div>
        </Card>
    );
}