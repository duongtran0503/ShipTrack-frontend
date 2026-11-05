import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { AdminOrderType } from "@/pages/manager/order/hooks/use-admin-orders";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, Clock, Eye, Truck, XCircle } from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; className: string; icon: any }> = {
    SEARCHING_DRIVER: { label: "Chờ tài xế", className: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: Clock },
    DELIVERING: { label: "Đang giao", className: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Truck },
    DRIVER_ASSIGNED: { label: "Đang giao", className: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Truck },
    PICKED_UP: { label: "Đang giao", className: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Truck },
    COMPLETED: { label: "Hoàn thành", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckCircle2 },
    CANCELLED: { label: "Đã hủy", className: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle },
    FAILED: { label: "Đã hủy", className: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle },
};

export const getOrderColumns = (
    onView: (order: AdminOrderType) => void,
    onCancel: (order: AdminOrderType) => void
): ColumnDef<AdminOrderType>[] => [
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
            accessorKey: "trackingCode",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Mã đơn" />,
            cell: ({ row }) => (
                <div className="font-bold text-primary font-mono text-xs">
                    #{row.getValue("trackingCode")}
                </div>
            ),
        },
        {
            accessorKey: "senderName",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Khách hàng (Gửi)" />,
            cell: ({ row }) => (
                <div>
                    <p className="font-bold text-foreground text-xs">{row.original.senderName}</p>
                    <p className="text-[10px] text-muted-foreground">{row.original.senderPhone}</p>
                </div>
            ),
        },
        {
            accessorKey: "driverName",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Tài xế" />,
            cell: ({ row }) => {
                const driverName = row.original.driverName;
                return driverName ? (
                    <div>
                        <p className="font-bold text-foreground text-xs">{driverName}</p>
                        <p className="text-[10px] text-muted-foreground">{row.original.driverPhone}</p>
                    </div>
                ) : (
                    <span className="text-muted-foreground italic text-[11px]">Chưa có tài xế</span>
                );
            },
        },
        {
            accessorKey: "receiverAddress",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Lộ trình" />,
            cell: ({ row }) => (
                <div className="max-w-[250px] space-y-1">
                    <p className="truncate text-[11px] text-foreground flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" /> {row.original.senderAddress}
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-primary shrink-0" /> {row.original.receiverAddress}
                    </p>
                </div>
            ),
        },
        {
            accessorKey: "shippingFee",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Cước phí" />,
            cell: ({ row }) => {
                const fee = row.getValue("shippingFee") as number;
                return <div className="font-bold text-shiptrack-price text-xs">{fee.toLocaleString("vi-VN")} đ</div>;
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                const config = STATUS_CONFIG[status] || STATUS_CONFIG.SEARCHING_DRIVER;
                const Icon = config.icon;
                return (
                    <Badge className={`${config.className} shadow-none font-bold text-[11px] rounded-full px-2.5 py-0.5 border inline-flex items-center gap-1`}>
                        <Icon className="size-3" />
                        <span>{config.label}</span>
                    </Badge>
                );
            },
            filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const order = row.original;
                return (
                    <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost" onClick={() => onView(order)} className="h-8 w-8 p-0 rounded-xl hover:bg-primary/10 hover:text-primary">
                            <Eye className="size-4" />
                        </Button>
                        {order.status !== "COMPLETED" && order.status !== "CANCELLED" && order.status !== "FAILED" && (
                            <Button size="sm" variant="ghost" onClick={() => onCancel(order)} className="h-8 w-8 p-0 rounded-xl text-destructive hover:bg-destructive/10">
                                <XCircle className="size-4" />
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];