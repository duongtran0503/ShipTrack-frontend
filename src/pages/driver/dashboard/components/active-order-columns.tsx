// src/pages/driver/dashboard/components/active-order-columns.tsx
import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ActiveOrderSummary } from "@/pages/driver/dashboard/hooks/use-driver-dashboard";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, MapPin, MoreHorizontal, Navigation } from "lucide-react";

interface ColumnActions {
    onProcess: (order: ActiveOrderSummary) => void;
    onViewDetail: (order: ActiveOrderSummary) => void;
}

export const getActiveOrderColumns = (
    { onProcess, onViewDetail }: ColumnActions
): ColumnDef<ActiveOrderSummary>[] => [
        {
            accessorKey: "trackingCode",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Mã đơn" />
            ),
            // Cố định chiều rộng cột
            size: 100,
            maxSize: 120,
            cell: ({ row }) => (
                <span className="font-bold text-primary font-mono text-xs whitespace-nowrap">
                    #{row.getValue("trackingCode")}
                </span>
            ),
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Trạng thái" />
            ),
            size: 140,
            maxSize: 160,
            cell: ({ row }) => {
                const status = row.getValue<string>("status");
                return (
                    <Badge
                        variant="outline"
                        className="bg-amber-500/10 text-amber-600 border-amber-200 font-semibold whitespace-nowrap"
                    >
                        {status}
                    </Badge>
                );
            },
        },
        {
            id: "route",
            header: "Lộ trình",
            // Cho phép lộ trình co giãn tối đa
            minSize: 200,
            cell: ({ row }) => {
                const o = row.original;
                return (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground max-w-[280px]">
                        <MapPin className="size-3.5 text-destructive shrink-0" />
                        <span className="truncate" title={`${o.pickupAddress} → ${o.dropoffAddress}`}>
                            {o.pickupAddress} → {o.dropoffAddress}
                        </span>
                    </div>
                );
            },
        },
        {
            accessorKey: "shippingFee",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Phí giao" />
            ),
            size: 100,
            maxSize: 120,
            cell: ({ row }) => {
                const fee = row.getValue<number | undefined>("shippingFee");
                return (
                    <span className="font-bold text-shiptrack-price whitespace-nowrap">
                        {fee?.toLocaleString("vi-VN")} đ
                    </span>
                );
            },
        },
        {
            id: "actions",
            size: 80,
            cell: ({ row }) => {
                const order = row.original;
                return (
                    // Dùng Dropdown Menu thay vì 2 nút ngang để tiết kiệm diện tích
                    <DropdownMenu>
                        <DropdownMenuTrigger >
                            <Button variant="ghost" className="size-8 p-0 cursor-pointer">
                                <span className="sr-only">Mở menu</span>
                                <MoreHorizontal className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-xl">
                            <DropdownMenuItem onClick={() => onProcess(order)} className="font-bold text-primary">
                                <Navigation className="mr-2 size-4" />
                                Xử lý đơn
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onViewDetail(order)}>
                                <Eye className="mr-2 size-4 text-slate-500" />
                                Xem chi tiết
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];