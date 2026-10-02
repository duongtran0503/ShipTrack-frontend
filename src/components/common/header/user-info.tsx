import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserInfo() {
    return (
        <div className="flex items-center gap-3 border-l border-slate-200 pl-3">
            <div className="hidden text-right sm:block">
                <p className="text-sm font-bold leading-none text-slate-900">
                    Admin ShipTrack
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    Super Admin
                </p>
            </div>
            <Avatar className="size-10 border-2 border-white shadow-sm">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
            </Avatar>
        </div>
    );
}