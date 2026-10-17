import { DataTable } from "@/components/common/data-table"
import { DataTableColumnsVisibility } from "@/components/common/data-table/data-table-columns-visibility"
import { DataTableFacetedFilter } from "@/components/common/data-table/data-table-faceted-filter"
import DataTableInputSearch from "@/components/common/data-table/data-table-input-search"
import { TableInstanceProvider } from "@/components/common/data-table/table-instance-provider"
import { Button } from "@/components/ui/button"
import { useDataTable } from "@/lib/hooks/use-data-table"
import { getColumns } from "@/pages/manager/dashboard/manager-user/customer/components/data-table-customer/columns"
import DataTableFloatingBar from "@/pages/manager/dashboard/manager-user/customer/components/data-table-customer/floating-bar"
import type { UserType } from "@/pages/manager/dashboard/manager-user/customer/components/data-table-customer/type"
import { Plus } from "lucide-react"

interface Props {
    data: UserType[]
    pageCount: number
}

export default function TableUser({ data, pageCount }: Props) {
    const handleEdit = (user: UserType) => {
        console.log("Edit user:", user)
    }

    const handleDelete = (user: UserType) => {
        console.log("Delete user:", user)
    }

    const columns = getColumns(handleEdit, handleDelete)

    const { table } = useDataTable({
        data,
        columns,
        pageCount,
        defaultPerPage: 10,
        filterFields: [
            {
                label: "Họ tên",
                value: "name",
                placeholder: "Tìm theo họ tên...",
            },
            {
                label: "Vai trò",
                value: "role",
                options: [
                    { label: "Quản trị viên", value: "admin" },
                    { label: "Biên tập viên", value: "editor" },
                    { label: "Người dùng", value: "user" },
                ],
            },
            {
                label: "Trạng thái",
                value: "active",
                options: [
                    { label: "Đang hoạt động", value: true },
                    { label: "Ngừng hoạt động", value: false },
                ],
            },
        ],
    })

    return (
        <div className="p-2">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold">Quản lý người dùng</h1>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-x-2"
                    onClick={() => console.log("Add user")}
                >
                    <Plus />
                    Thêm mới
                </Button>
            </div>

            <TableInstanceProvider table={table}>
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex flex-1 items-center space-x-2 w-full">
                            <DataTableInputSearch
                                handleParamKeyword={(value: string) =>
                                    table.getColumn("name")?.setFilterValue(value)
                                }
                            />

                            {table.getColumn("role") && (
                                <DataTableFacetedFilter
                                    column={table.getColumn("role")}
                                    title="Vai trò"
                                    options={[
                                        { label: "Quản trị viên", value: "admin" },
                                        { label: "Biên tập viên", value: "editor" },
                                        { label: "Người dùng", value: "user" },
                                    ]}
                                />
                            )}

                            {table.getColumn("active") && (
                                <DataTableFacetedFilter
                                    column={table.getColumn("active")}
                                    title="Trạng thái"
                                    options={[
                                        { label: "Đang hoạt động", value: true },
                                        { label: "Ngừng hoạt động", value: false },
                                    ]}
                                />
                            )}
                        </div>

                        <DataTableColumnsVisibility />
                    </div>

                    <DataTable
                        table={table}
                        floatingBar={<DataTableFloatingBar table={table} />}
                    />
                </div>
            </TableInstanceProvider>
        </div>
    )
}