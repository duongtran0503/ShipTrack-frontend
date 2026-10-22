import { DataTable } from "@/components/common/data-table"
import { TableInstanceProvider } from "@/components/common/data-table/table-instance-provider"
import { useDataTable } from "@/lib/hooks/use-data-table"
import { useNavigate } from "react-router"

import { getOrderColumns } from "@/pages/customer/dashboard/components/data-table/column"
import type { CustomerOrderType } from "@/pages/customer/order/manager/components/data-table-orders/type"

interface Props {
    data: CustomerOrderType[]
    pageCount: number
}

const STATUS_OPTIONS = [
    { label: "Chờ xử lý", value: "PENDING" },
    { label: "Đang tìm tài xế", value: "SEARCHING_DRIVER" },
    { label: "Đang giao hàng", value: "DELIVERING" },
    { label: "Hoàn thành", value: "COMPLETED" },
    { label: "Đã hủy", value: "CANCELLED" },
]

export default function TableOrders({ data, pageCount }: Props) {
    const navigate = useNavigate()

    const handleView = (order: CustomerOrderType) => {
        navigate(`/customer/orders/${order.id}`)
    }

    const handleCancel = (order: CustomerOrderType) => {
        console.log("Hủy đơn:", order.id)
    }

    const handleTrack = (order: CustomerOrderType) => {
        navigate(`/customer/orders/${order.id}/tracking`)
    }

    const columns = getOrderColumns(handleView, handleCancel, handleTrack)

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
                options: STATUS_OPTIONS,
            },
        ],
    })

    return (
        <div className="space-y-2">


            {/* Table */}
            <TableInstanceProvider table={table}>
                <div className="space-y-2 ">
                    {/* Toolbar */}

                    {/* Bảng có viền */}
                    <div className="">
                        <DataTable
                            table={table}
                            floatingBar={<></>}
                        />
                    </div>
                </div>
            </TableInstanceProvider>
        </div>
    )
}