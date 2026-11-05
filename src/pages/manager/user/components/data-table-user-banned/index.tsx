// src/pages/manager/user/banned/components/banned-users-table.tsx
import { DataTable } from "@/components/common/data-table";
import { DataTableColumnsVisibility } from "@/components/common/data-table/data-table-columns-visibility";
import { DataTableFacetedFilter } from "@/components/common/data-table/data-table-faceted-filter";
import DataTableInputSearch from "@/components/common/data-table/data-table-input-search";
import { TableInstanceProvider } from "@/components/common/data-table/table-instance-provider";
import { useDataTable } from "@/lib/hooks/use-data-table";
import { getBannedUserColumns } from "@/pages/manager/user/components/data-table-user-banned/columns";
import type { BannedUserResponse } from "@/pages/manager/user/hooks/use-admin-banned-users";
import { useSearchParams } from "react-router";

interface Props {
    users: BannedUserResponse[];
    onView: (user: BannedUserResponse) => void;
    onUnban: (user: BannedUserResponse) => void;
}

export function BannedUsersTable({ users, onView, onUnban }: Props) {
    const [, setSearchParams] = useSearchParams();

    const columns = getBannedUserColumns(onView, onUnban);

    const { table } = useDataTable({
        data: users,
        columns,
        pageCount: 1,
        defaultPerPage: 10,
        filterFields: [
            {
                label: "Tìm kiếm",
                value: "Name",
                placeholder: "Tìm theo tên hoặc email...",
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
        ],
    });

    return (
        <div className="space-y-6">


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
                        </div>
                        <DataTableColumnsVisibility />
                    </div>

                    {/* Table */}
                    <div className="rounded-2xl overflow-hidden">
                        <DataTable table={table} />
                    </div>
                </div>
            </TableInstanceProvider>
        </div>
    );
}