import { Button } from "@/components/ui/button"
import type { Table } from "@tanstack/react-table"
import { CircleX, Eye, Trash2 } from "lucide-react"
import type { CustomerOrderType } from "./type"

interface Props {
    table: Table<CustomerOrderType>
}

export default function DataTableFloatingBar({ table }: Props) {
    const selectedCount = table.getFilteredSelectedRowModel().rows.length

    if (selectedCount === 0) return null

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-card p-3 rounded-2xl px-6 shadow-2xl border border-border/80 z-40 animate-in fade-in-50">
            <div className="flex items-center gap-x-2">
                <p className="text-xs font-bold border-r border-border pr-4 text-foreground">
                    Đã chọn {selectedCount} đơn
                </p>
                <Button
                    variant="ghost"
                    size="sm"
                    className="size-7 p-0 rounded-lg"
                    onClick={() => table.toggleAllRowsSelected(false)}
                >
                    <CircleX className="size-4" />
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl font-semibold text-xs h-8"
                    onClick={() => {
                        const selected = table.getFilteredSelectedRowModel().rows.map((r) => r.original)
                        console.log("Xem chi tiết các đơn:", selected)
                    }}
                >
                    <Eye className="mr-1.5 size-3.5" />
                    Xem chi tiết
                </Button>

                <Button
                    variant="destructive"
                    size="sm"
                    className="rounded-xl font-semibold text-xs h-8"
                    onClick={() => {
                        const selected = table.getFilteredSelectedRowModel().rows.map((r) => r.original)
                        console.log("Hủy các đơn đã chọn:", selected)
                    }}
                >
                    <Trash2 className="mr-1.5 size-3.5" />
                    Hủy ({selectedCount})
                </Button>
            </div>
        </div>
    )
}