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
import type { UserType } from "@/pages/manager/dashboard/manager-user/customer/components/data-table-customer/type"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import type { ColumnDef, Row } from "@tanstack/react-table"
import { Eye, Pencil, Trash2 } from "lucide-react"

interface ActionCellProps {
    row: Row<UserType>
    onEdit: (user: UserType) => void
    onDelete: (user: UserType) => void
}

// eslint-disable-next-line react-refresh/only-export-components
const ActionCell = ({ row, onEdit, onDelete }: ActionCellProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger >
                <Button variant="ghost" className="size-8 p-0">
                    <DotsHorizontalIcon className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem className="cursor-pointer">
                    <Eye className="mr-2 size-4 text-slate-500" />
                    Xem chi tiết
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50"
                    onClick={() => onEdit(row.original)}
                >
                    <Pencil className="mr-2 size-4" />
                    Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    onClick={() => onDelete(row.original)}
                >
                    <Trash2 className="mr-2 size-4" />
                    Xóa
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const ROLE_LABEL: Record<UserType["role"], string> = {
    admin: "Quản trị viên",
    editor: "Biên tập viên",
    user: "Người dùng",
}

export const getColumns = (
    onEdit: (user: UserType) => void,
    onDelete: (user: UserType) => void
): ColumnDef<UserType>[] => [
        {
            id: "select",
            header: ({ table }) => {
                const isAllSelected = table.getIsAllPageRowsSelected()
                const isSomeSelected = table.getIsSomePageRowsSelected()
                return (
                    <Checkbox

                        checked={
                            isAllSelected
                                ? true
                                : isSomeSelected


                        }
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
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Họ tên" />
            ),
            cell: ({ row }) => {
                const name: string = row.getValue("name")
                return (
                    <div className="font-medium text-gray-900 max-w-62.5 truncate">
                        {name}
                    </div>
                )
            },
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Email" />
            ),
            cell: ({ row }) => {
                const email: string = row.getValue("email")
                return (
                    <div className="text-sm text-gray-600 max-w-62.5 truncate">
                        {email}
                    </div>
                )
            },
        },
        {
            accessorKey: "phone",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Số điện thoại" />
            ),
            cell: ({ row }) => {
                const phone: string = row.getValue("phone")
                return <div className="font-mono text-xs text-gray-600">{phone}</div>
            },
        },
        {
            accessorKey: "address",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Địa chỉ" />
            ),
            cell: ({ row }) => {
                const address: string = row.getValue("address")
                return (
                    <div className="text-xs text-gray-500 max-w-75 truncate">
                        {address}
                    </div>
                )
            },
        },
        {
            accessorKey: "role",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Vai trò" />
            ),
            cell: ({ row }) => {
                const role: UserType["role"] = row.getValue("role")
                const colorMap: Record<UserType["role"], string> = {
                    admin: "bg-purple-50 text-purple-600 border-purple-200",
                    editor: "bg-blue-50 text-blue-600 border-blue-200",
                    user: "bg-gray-50 text-gray-600 border-gray-200",
                }
                return (
                    <Badge
                        className={`${colorMap[role]} shadow-none font-medium text-xs rounded-md px-2.5 py-0.5`}
                    >
                        {ROLE_LABEL[role]}
                    </Badge>
                )
            },
            // Faceted filter sẽ dùng các option này
            filterFn: (row, id, value: string[]) => {
                return value.includes(row.getValue(id))
            },
        },
        {
            accessorKey: "active",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Trạng thái" />
            ),
            cell: ({ row }) => {
                const isActive: boolean = row.getValue("active")
                return isActive ? (
                    <Badge className="bg-emerald-50 hover:bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-none font-medium text-xs rounded-md px-2.5 py-0.5">
                        Hoạt động
                    </Badge>
                ) : (
                    <Badge className="bg-gray-50 hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-none font-medium text-xs rounded-md px-2.5 py-0.5">
                        Ngưng hoạt động
                    </Badge>
                )
            },
            filterFn: (row, id, value: string[]) => {
                return value.includes(String(row.getValue(id)))
            },
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Ngày tạo" />
            ),
            cell: ({ row }) => {
                const createdAt: string = row.getValue("createdAt")
                return (
                    <div className="text-xs text-gray-500 whitespace-nowrap">
                        {createdAt}
                    </div>
                )
            },
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <ActionCell row={row} onEdit={onEdit} onDelete={onDelete} />
            ),
        },
    ]