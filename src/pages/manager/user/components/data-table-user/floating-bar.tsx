import { Button } from "@/components/ui/button";
import type { UserResponse } from "@/pages/manager/user/hooks/use-admin-users";
import type { Table } from "@tanstack/react-table";
import { CircleX, Lock, Unlock } from "lucide-react";

interface Props {
    table: Table<UserResponse>;
    onBulkBan?: (users: UserResponse[], isBan: boolean) => void;
}

export default function DataTableFloatingBar({ table, onBulkBan }: Props) {
    const selectedCount = table.getFilteredSelectedRowModel().rows.length;

    if (selectedCount === 0) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-card p-3 rounded-2xl px-6 shadow-2xl border border-border/80 z-40 animate-in fade-in-50">
            <div className="flex items-center gap-x-2">
                <p className="text-xs font-bold border-r border-border pr-4 text-foreground">
                    Đã chọn {selectedCount} người dùng
                </p>
                <Button variant="ghost" size="sm" className="size-7 p-0 rounded-lg" onClick={() => table.toggleAllRowsSelected(false)}>
                    <CircleX className="size-4" />
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl font-semibold text-xs h-8 text-destructive border-destructive/30 hover:bg-destructive/10"
                    onClick={() => {
                        const selected = table.getFilteredSelectedRowModel().rows.map((r) => r.original);
                        if (onBulkBan) onBulkBan(selected, true); // Khóa
                    }}
                >
                    <Lock className="mr-1.5 size-3.5" />
                    Khóa hàng loạt
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl font-semibold text-xs h-8 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/10"
                    onClick={() => {
                        const selected = table.getFilteredSelectedRowModel().rows.map((r) => r.original);
                        if (onBulkBan) onBulkBan(selected, false); // Mở khóa
                    }}
                >
                    <Unlock className="mr-1.5 size-3.5" />
                    Mở khóa
                </Button>
            </div>
        </div>
    );
}