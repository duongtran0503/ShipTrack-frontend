import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import type { ColumnDef, Row } from "@tanstack/react-table"
import { Ban, CheckCircle2, Clock, Eye, MapPin, Trash2, Truck, type LucideIcon } from "lucide-react"
import type { CustomerOrderType } from "./type"

interface ActionCellProps {
    row: Row<CustomerOrderType>
    onView: (order: CustomerOrderType) => void
    onCancel: (order: CustomerOrderType) => void
}

export const ActionCell = ({ row, onView, onCancel }: ActionCellProps) => {
    const order = row.original
    const canCancel = order.status === "PENDING" || order.status === "SEARCHING_DRIVER"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger >
                <Button variant="ghost" className="size-8 p-0 cursor-pointer">
                    <DotsHorizontalIcon className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl">
                <DropdownMenuItem
                    className="cursor-pointer font-medium"
                    onClick={() => onView(order)}
                >
                    <Eye className="mr-2 size-4 text-muted-foreground" />
                    Xem chi tiết
                </DropdownMenuItem>

                {canCancel && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 font-medium"
                            onClick={() => onCancel(order)}
                        >
                            <Trash2 className="mr-2 size-4" />
                            Hủy đơn hàng
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const STATUS_CONFIG: Record<
    CustomerOrderType["status"],
    { label: string; className: string; icon: unknown }
> = {
    PENDING: {
        label: "Chờ xử lý",
        className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
        icon: Clock,
    },
    SEARCHING_DRIVER: {
        label: "Đang tìm tài xế",
        className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
        icon: Clock,
    },
    DELIVERING: {
        label: "Đang giao hàng",
        className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
        icon: Truck,
    },
    COMPLETED: {
        label: "Hoàn thành",
        className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
        icon: CheckCircle2,
    },
    CANCELLED: {
        label: "Đã hủy",
        className: "bg-destructive/10 text-destructive border-destructive/20",
        icon: Ban,
    },
}

// eslint-disable-next-line react-refresh/only-export-components
export const getOrderColumns = (
    onView: (order: CustomerOrderType) => void,
    onCancel: (order: CustomerOrderType) => void
): ColumnDef<CustomerOrderType>[] => [
        {
            id: "select",
            header: ({ table }) => {
                const isAllSelected = table.getIsAllPageRowsSelected()
                const isSomeSelected = table.getIsSomePageRowsSelected()
                return (
                    <Checkbox
                        checked={isAllSelected}
                        indeterminate={isSomeSelected && !isAllSelected}
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                        className="translate-y-0.5 border-gray-300"
                    />
                )
            },
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="translate-y-0.5 border-gray-300"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "trackingCode",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Mã đơn" />
            ),
            cell: ({ row }) => (
                <div className="font-bold text-primary font-mono text-xs">
                    {row.getValue("trackingCode")}
                </div>
            ),
        },
        {
            accessorKey: "packageName",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Hàng hóa" />
            ),
            cell: ({ row }) => (
                <div className="font-semibold text-foreground max-w-[200px] truncate">
                    {row.getValue("packageName")}
                </div>
            ),
        },
        {
            accessorKey: "receiverAddress",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Địa chỉ giao" />
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground max-w-[250px] truncate">
                    <MapPin className="size-3.5 text-primary shrink-0" />
                    <span className="truncate">{row.getValue("receiverAddress")}</span>
                </div>
            ),
        },
        {
            accessorKey: "shippingFee",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Cước phí" />
            ),
            cell: ({ row }) => {
                const fee: number = row.getValue("shippingFee")
                return (
                    <div className="font-bold text-shiptrack-price text-xs">
                        {fee.toLocaleString("vi-VN")} đ
                    </div>
                )
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Trạng thái" />
            ),
            cell: ({ row }) => {
                const status: CustomerOrderType["status"] = row.getValue("status")
                const config = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING
                const Icon = config.icon as LucideIcon

                return (
                    <Badge
                        className={`${config.className} shadow-none font-bold text-[11px] rounded-full px-2.5 py-0.5 border inline-flex items-center gap-1`}
                    >
                        <Icon className="size-3" />
                        <span>{config.label}</span>
                    </Badge>
                )
            },
            filterFn: (row, id, value: string[]) => {
                return value.includes(row.getValue(id))
            },
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Ngày tạo" />
            ),
            cell: ({ row }) => (
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {row.getValue("createdAt")}
                </div>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <ActionCell row={row} onView={onView} onCancel={onCancel} />
            ),
        },
    ]