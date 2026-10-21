import { Bike, ShieldCheck, User } from "lucide-react"

import type { MockUser } from "@/demo_data_services/mockAuthService"

interface Props {
    role?: MockUser["role"]
}

export function ProfileRoleBadge({ role }: Props) {
    switch (role) {
        case "SUPER_ADMIN":
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
                    <ShieldCheck className="size-3.5" /> Super Admin
                </span>
            )
        case "DRIVER":
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20">
                    <Bike className="size-3.5" /> Đối Tác Tài Xế
                </span>
            )
        default:
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    <User className="size-3.5" /> Khách Hàng
                </span>
            )
    }
}