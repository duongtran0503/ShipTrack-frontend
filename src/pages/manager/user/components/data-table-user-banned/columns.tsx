import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BannedUserResponse } from "@/pages/manager/user/hooks/use-admin-banned-users";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Unlock } from "lucide-react";

const ROLE_CONFIG: Record<string, { label: string; className: string }> = {
    Customer: { label: "Khách hàng", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
    Driver: { label: "Tài xế", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
    Admin: { label: "Quản trị viên", className: "bg-primary/10 text-primary border-primary/20" },
};

export const getBannedUserColumns = (
    onView: (user: BannedUserResponse) => void,
    onUnban: (user: BannedUserResponse) => void
): ColumnDef<BannedUserResponse>[] => [
        {
            accessorKey: "Name",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Họ và tên / Email" />,
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="flex flex-col">
                        <span className="font-bold text-foreground text-xs">{user.Name}</span>
                        <span className="text-[10px] text-muted-foreground">{user.Email}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "Role",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Vai trò" />,
            cell: ({ row }) => {
                const role = row.getValue("Role") as string;
                const config = ROLE_CONFIG[role] || ROLE_CONFIG.Customer;
                return (
                    <Badge className={`${config.className} shadow-none font-bold text-[10px] rounded-full px-2.5 py-0.5 border`}>
                        {config.label}
                    </Badge>
                );
            },
            filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
        },
        {
            accessorKey: "BanReason",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Lý do khóa" />,
            cell: ({ row }) => {
                const reason = row.getValue("BanReason") as string | null;
                return (
                    <div className="max-w-[250px] truncate text-xs text-destructive font-medium" title={reason || undefined}>
                        {reason || "Không có lý do"}
                    </div>
                );
            },
        },
        {
            accessorKey: "BannedAt",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Thời gian khóa" />,
            cell: ({ row }) => (
                <span className="text-xs text-muted-foreground">{row.getValue("BannedAt") || "---"}</span>
            ),
        },
        {
            accessorKey: "BannedBy",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Người thực hiện" />,
            cell: ({ row }) => (
                <span className="text-xs text-foreground font-medium">{row.getValue("BannedBy") || "Admin"}</span>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="flex items-center justify-end gap-2">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onView(user)}
                            className="h-8 w-8 p-0 rounded-xl hover:bg-primary/10 hover:text-primary"
                            title="Xem chi tiết"
                        >
                            <Eye className="size-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onUnban(user)}
                            className="h-8 w-8 p-0 rounded-xl text-emerald-600 hover:bg-emerald-500/10"
                            title="Mở khóa tài khoản"
                        >
                            <Unlock className="size-4" />
                        </Button>
                    </div>
                );
            },
        },
    ];