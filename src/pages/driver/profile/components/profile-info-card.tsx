import { Card } from "@/components/ui/card";
import { Calendar, Star, Truck } from "lucide-react";
import type { DriverProfileData } from "../types";

interface Props {
    profile: DriverProfileData;
}

export function ProfileInfoCard({ profile }: Props) {
    return (
        <Card className="rounded-[24px] border-border/50 shadow-sm bg-card p-6 space-y-4">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Thông tin tài khoản</h4>

            <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                    <span className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="size-4 text-primary" /> Ngày tham gia
                    </span>
                    <span className="font-bold text-foreground">{profile.joinedDate}</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                    <span className="text-muted-foreground flex items-center gap-2">
                        <Truck className="size-4 text-primary" /> Tổng chuyến đi
                    </span>
                    <span className="font-bold text-foreground">{profile.totalTrips} chuyến</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                        <Star className="size-4 text-amber-500 fill-amber-500" /> Đánh giá
                    </span>
                    <span className="font-bold text-amber-600">{profile.averageRating.toFixed(1)} / 5.0</span>
                </div>
            </div>
        </Card>
    );
}