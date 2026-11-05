import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { UserResponse } from "@/pages/manager/user/hooks/use-admin-users";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, Eye, Lock, Unlock, XCircle } from "lucide-react";

const ROLE_CONFIG: Record<string, { label: string; className: string }> = {
    Customer: { label: "Khách hàng", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
    Driver: { label: "Tài xế", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
    Admin: { label: "Quản trị viên", className: "bg-primary/10 text-primary border-primary/20" },
};

export const getUserColumns = (
    onView: (user: UserResponse) => void,
    onBanToggle: (user: UserResponse) => void
): ColumnDef<UserResponse>[] => [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="translate-y-0.5"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="translate-y-0.5"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "Name",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Họ và tên" />,
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
            accessorKey: "Phone",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Liên hệ" />,
            cell: ({ row }) => (
                <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold">{row.getValue("Phone")}</span>
                    {row.original.LicensePlate && (
                        <span className="text-[10px] text-muted-foreground font-mono bg-muted/50 px-1 rounded w-fit">
                            {row.original.LicensePlate}
                        </span>
                    )}
                </div>
            ),
        },

        {
            accessorKey: "IsActive",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
            cell: ({ row }) => {
                const isActive = row.getValue("IsActive") as boolean;
                const isOnline = row.original.Online;
                return (
                    <div className="flex items-center gap-2">
                        {isActive ? (
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-none font-bold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                                <CheckCircle2 className="size-3" /> Hoạt động
                            </Badge>
                        ) : (
                            <Badge className="bg-destructive/10 text-destructive border-destructive/20 shadow-none font-bold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                                <XCircle className="size-3" /> Đã khóa
                            </Badge>
                        )}
                        {isActive && isOnline && (
                            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" title="Đang online" />
                        )}
                    </div>
                );
            },
            filterFn: (row, id, value: string[]) => {
                const isActive = row.getValue(id);
                if (value.includes("ALL")) return true;
                if (value.includes("ACTIVE") && isActive) return true;
                if (value.includes("BANNED") && !isActive) return true;
                return false;
            },
        },
        {
            accessorKey: "CreatedAt",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày tham gia" />,
            cell: ({ row }) => (
                <span className="text-xs text-muted-foreground">{row.getValue("CreatedAt") || "---"}</span>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost" onClick={() => onView(user)} className="h-8 w-8 p-0 rounded-xl hover:bg-primary/10 hover:text-primary" title="Xem chi tiết">
                            <Eye className="size-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onBanToggle(user)}
                            className={`h-8 w-8 p-0 rounded-xl ${user.IsActive ? "text-destructive hover:bg-destructive/10" : "text-emerald-600 hover:bg-emerald-500/10"}`}
                            title={user.IsActive ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                        >
                            {user.IsActive ? <Lock className="size-4" /> : <Unlock className="size-4" />}
                        </Button>
                    </div>
                );
            },
        },
    ];