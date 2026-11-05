import { DataTable } from "@/components/common/data-table";
import { DataTableColumnsVisibility } from "@/components/common/data-table/data-table-columns-visibility";
import { DataTableFacetedFilter } from "@/components/common/data-table/data-table-faceted-filter";
import DataTableInputSearch from "@/components/common/data-table/data-table-input-search";
import { TableInstanceProvider } from "@/components/common/data-table/table-instance-provider";
import { useDataTable } from "@/lib/hooks/use-data-table";
import { getUserColumns } from "@/pages/manager/user/components/data-table-user/columns";
import DataTableFloatingBar from "@/pages/manager/user/components/data-table-user/floating-bar";
import type { UserResponse } from "@/pages/manager/user/hooks/use-admin-users";
import { useSearchParams } from "react-router";

interface Props {
    users: UserResponse[];
    onView: (user: UserResponse) => void;
    onBanToggle: (user: UserResponse) => void;
    onBulkBan: (users: UserResponse[], isBan: boolean) => void;
}

export function UserTable({ users, onView, onBanToggle, onBulkBan }: Props) {
    const [, setSearchParams] = useSearchParams();

    const columns = getUserColumns(onView, onBanToggle);

    const { table } = useDataTable({
        data: users,
        columns,
        pageCount: 1,
        defaultPerPage: 10,
        filterFields: [
            {
                label: "Tìm kiếm",
                value: "Name", // Tên cột dùng để search chung
                placeholder: "Tìm theo tên, email, SĐT...",
            },
            {
                label: "Vai trò",
                value: "Role",
                options: [
                    { label: "Khách hàng", value: "Customer" },
                    { label: "Tài xế", value: "Driver" },
                    { label: "Quản trị viên", value: "Admin" },
                ],
            },
            {
                label: "Trạng thái",
                value: "IsActive",
                options: [
                    { label: "Hoạt động", value: "ACTIVE" },
                    { label: "Đã khóa", value: "BANNED" },
                ],
            },
        ],
    });

    return (
        <div className="space-y-4">


            <TableInstanceProvider table={table}>
                <div className="space-y-4 rounded-xl border border-border/60 p-2 bg-card shadow-sm">
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2 pt-2">
                        <div className="flex flex-1 items-center space-x-2 w-full">
                            <DataTableInputSearch
                                handleParamKeyword={(value: string) => {
                                    setSearchParams((prev) => {
                                        if (value) prev.set("search", value);
                                        else prev.delete("search");
                                        prev.set("page", "1");
                                        return prev;
                                    });
                                }}
                            />
                            {table.getColumn("Role") && (
                                <DataTableFacetedFilter
                                    column={table.getColumn("Role")}
                                    title="Vai trò"
                                    options={[
                                        { label: "Khách hàng", value: "Customer" },
                                        { label: "Tài xế", value: "Driver" },
                                        { label: "Quản trị viên", value: "Admin" },
                                    ]}
                                />
                            )}
                            {table.getColumn("IsActive") && (
                                <DataTableFacetedFilter
                                    column={table.getColumn("IsActive")}
                                    title="Trạng thái"
                                    options={[
                                        { label: "Hoạt động", value: "ACTIVE" },
                                        { label: "Đã khóa", value: "BANNED" },
                                    ]}
                                />
                            )}
                        </div>
                        <DataTableColumnsVisibility />
                    </div>

                    {/* DataTable */}
                    <div className="rounded-2xl overflow-hidden">
                        <DataTable
                            table={table}
                            floatingBar={<DataTableFloatingBar table={table} onBulkBan={onBulkBan} />}
                        />
                    </div>
                </div>
            </TableInstanceProvider>
        </div>
    );
}