import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { OrderStatusBadge } from "@/pages/customer/dashboard/components/order-status-badge"
import type { CustomerOrderType } from "@/pages/customer/order/manager/components/data-table-orders/type"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import type { ColumnDef, Row } from "@tanstack/react-table"
import { Eye, MapPin, Navigation, Trash2 } from "lucide-react"

interface ActionCellProps {
    row: Row<CustomerOrderType>
    onView: (order: CustomerOrderType) => void
    onCancel: (order: CustomerOrderType) => void
    onTrack?: (order: CustomerOrderType) => void
}

// eslint-disable-next-line react-refresh/only-export-components
const ActionCell = ({ row, onView, onCancel, onTrack }: ActionCellProps) => {
    const order = row.original

    // Điều kiện hợp lệ để mở trang Tracking Real-time: Đơn đang giao hàng (DELIVERING)
    const isTrackable = order.status === "DELIVERING"

    // Điều kiện được phép hủy đơn: Đơn chưa có tài xế lấy hàng (PENDING hoặc SEARCHING_DRIVER)
    const canCancel = order.status === "PENDING" || order.status === "SEARCHING_DRIVER"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger >
                <Button variant="ghost" className="size-8 p-0 cursor-pointer">
                    <DotsHorizontalIcon className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 rounded-xl">
                {/* 1. Xem chi tiết */}
                <DropdownMenuItem
                    className="cursor-pointer font-medium"
                    onClick={() => onView(order)}
                >
                    <Eye className="mr-2 size-4 text-slate-500" />
                    Xem chi tiết
                </DropdownMenuItem>

                {/* 2. Theo dõi Real-time (Chỉ hiển thị / bấm được khi đơn hàng DELIVERING) */}
                {isTrackable && (
                    <DropdownMenuItem
                        className="cursor-pointer text-primary focus:text-primary focus:bg-primary/10 font-bold"
                        onClick={() => onTrack?.(order)}
                    >
                        <Navigation className="mr-2 size-4 text-primary animate-pulse" />
                        Theo dõi Real-time
                    </DropdownMenuItem>
                )}

                {/* 3. Hủy đơn (Chỉ cho phép khi chưa giao hàng) */}
                {canCancel && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 font-medium"
                            onClick={() => onCancel(order)}
                        >
                            <Trash2 className="mr-2 size-4" />
                            Hủy đơn
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const getOrderColumns = (
    onView: (order: CustomerOrderType) => void,
    onCancel: (order: CustomerOrderType) => void,
    onTrack?: (order: CustomerOrderType) => void
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
            cell: ({ row }) => {
                const code: string = row.getValue("trackingCode")
                return <div className="font-bold text-primary font-mono text-xs">{code}</div>
            },
        },
        {
            accessorKey: "packageName",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tên hàng hóa" />
            ),
            cell: ({ row }) => {
                const name: string = row.getValue("packageName")
                return <div className="font-medium text-foreground max-w-[200px] truncate">{name}</div>
            },
        },
        {
            accessorKey: "receiverAddress",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Địa chỉ nhận" />
            ),
            cell: ({ row }) => {
                const address: string = row.getValue("receiverAddress")
                return (
                    <div className="text-xs text-muted-foreground max-w-xs truncate">
                        <span className="flex items-center gap-1">
                            <MapPin className="size-3.5 shrink-0 text-primary" />
                            <span className="truncate">{address}</span>
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "shippingFee",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Phí vận chuyển" />
            ),
            cell: ({ row }) => {
                const fee: number = row.getValue("shippingFee")
                return (
                    <div className="font-bold text-shiptrack-price">
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
                return <OrderStatusBadge status={status} />
            },
            filterFn: (row, id, value: string[]) => {
                return value.includes(row.getValue(id))
            },
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <ActionCell
                    row={row}
                    onView={onView}
                    onCancel={onCancel}
                    onTrack={onTrack}
                />
            ),
        },
    ]