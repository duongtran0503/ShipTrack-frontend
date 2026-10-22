// src/pages/customer/orders/components/table-orders.tsx
import { DataTable } from "@/components/common/data-table"
import { DataTableColumnsVisibility } from "@/components/common/data-table/data-table-columns-visibility"
import { DataTableFacetedFilter } from "@/components/common/data-table/data-table-faceted-filter"
import DataTableInputSearch from "@/components/common/data-table/data-table-input-search"
import { TableInstanceProvider } from "@/components/common/data-table/table-instance-provider"
import { Button } from "@/components/ui/button"
import { useDataTable } from "@/lib/hooks/use-data-table"
import { Package, Plus } from "lucide-react"
import { useNavigate } from "react-router"
import { getOrderColumns } from "./columns"
import DataTableFloatingBar from "./floating-bar"
import type { CustomerOrderType } from "./type"

interface Props {
    data: CustomerOrderType[]
    pageCount: number
}

export default function TableOrders({ data, pageCount }: Props) {
    const navigate = useNavigate()

    const handleView = (order: CustomerOrderType) => {
        navigate(`/customer/orders/${order.id}`)
    }

    const handleCancel = (order: CustomerOrderType) => {
        console.log("Hủy đơn:", order.id)
    }

    const columns = getOrderColumns(handleView, handleCancel)

    const { table } = useDataTable({
        data,
        columns,
        pageCount,
        defaultPerPage: 10,
        filterFields: [
            {
                label: "Mã đơn",
                value: "trackingCode",
                placeholder: "Tìm theo mã đơn...",
            },
            {
                label: "Trạng thái",
                value: "status",
                options: [
                    { label: "Chờ xử lý", value: "PENDING" },
                    { label: "Đang tìm tài xế", value: "SEARCHING_DRIVER" },
                    { label: "Đang giao hàng", value: "DELIVERING" },
                    { label: "Hoàn thành", value: "COMPLETED" },
                    { label: "Đã hủy", value: "CANCELLED" },
                ],
            },
        ],
    })

    return (
        <div className="space-y-6">
            {/* Header tiêu đề & Nút tạo mới */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
                        <Package className="size-6 text-primary" />
                        <span>Quản lý đơn hàng của tôi</span>
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Tra cứu, lọc theo trạng thái và theo dõi lịch sử tất cả các đơn vận
                        chuyển.
                    </p>
                </div>

                <Button
                    onClick={() => navigate("/customer/orders/create")}
                    className="gap-2 text-white animate-btn-gradient btn-shine font-bold rounded-2xl cursor-pointer border-none py-5 px-5"
                >
                    <Plus className="size-4" />
                    <span>Tạo đơn hàng mới</span>
                </Button>
            </div>

            <TableInstanceProvider table={table}>
                <div className="space-y-4 rounded-xl border border-gray-300 p-2">
                    {/* Toolbar — filter + search + visibility */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex flex-1 items-center space-x-2 w-full">
                            <DataTableInputSearch
                                handleParamKeyword={(value: string) =>
                                    table.getColumn("trackingCode")?.setFilterValue(value)
                                }
                            />

                            {table.getColumn("status") && (
                                <DataTableFacetedFilter
                                    column={table.getColumn("status")}
                                    title="Trạng thái"
                                    options={[
                                        { label: "Chờ xử lý", value: "PENDING" },
                                        { label: "Đang tìm tài xế", value: "SEARCHING_DRIVER" },
                                        { label: "Đang giao hàng", value: "DELIVERING" },
                                        { label: "Hoàn thành", value: "COMPLETED" },
                                        { label: "Đã hủy", value: "CANCELLED" },
                                    ]}
                                />
                            )}
                        </div>

                        <DataTableColumnsVisibility />
                    </div>

                    {/* Bảng có viền mờ để phân tách khối */}
                    <div className="rounded-2xl  overflow-hidden">
                        <DataTable
                            table={table}
                            floatingBar={<DataTableFloatingBar table={table} />}
                        />
                    </div>
                </div>
            </TableInstanceProvider>
        </div>
    )
}