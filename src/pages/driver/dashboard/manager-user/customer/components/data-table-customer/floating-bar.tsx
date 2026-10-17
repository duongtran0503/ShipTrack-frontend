import { Button } from "@/components/ui/button"
import type { UserType } from "@/pages/manager/dashboard/manager-user/customer/components/data-table-customer/type"
import type { Table } from "@tanstack/react-table"
import { CircleX, Trash2 } from "lucide-react"

interface Props {
    table: Table<UserType>
}

export default function DataTableFloatingBar({ table }: Props) {
    const selectedCount = table.getFilteredSelectedRowModel().rows.length

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white p-3 rounded-xl px-6 shadow-2xl border border-gray-400">
            <div className="flex items-center gap-x-2">
                <p className="text-sm font-medium border-r pr-4 bg-gray-100">
                    Đã chọn {selectedCount}
                </p>
                <Button
                    variant={"outline"}
                    className="flex justify-center items-center bg-gray-100"
                    onClick={() => table.toggleAllRowsSelected(false)}
                >
                    <CircleX />
                </Button>
            </div>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        const ids = table
                            .getFilteredSelectedRowModel()
                            .rows.map((r) => r.original.id)
                        console.log("Selected IDs:", ids)
                    }}
                >
                    Xem chi tiết
                </Button>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                        const ids = table
                            .getFilteredSelectedRowModel()
                            .rows.map((r) => r.original.id)
                        console.log("Delete IDs:", ids)
                    }}
                >
                    <Trash2 className="mr-1 size-4" />
                    Xóa {selectedCount} user
                </Button>
            </div>
        </div>
    )
}