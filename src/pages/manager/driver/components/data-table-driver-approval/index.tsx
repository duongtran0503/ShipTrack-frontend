import { DataTable } from "@/components/common/data-table";
import { DataTableColumnsVisibility } from "@/components/common/data-table/data-table-columns-visibility";
import { DataTableFacetedFilter } from "@/components/common/data-table/data-table-faceted-filter";
import DataTableInputSearch from "@/components/common/data-table/data-table-input-search";
import { TableInstanceProvider } from "@/components/common/data-table/table-instance-provider";
import { useDataTable } from "@/lib/hooks/use-data-table";
import { getApprovalColumns } from "@/pages/manager/driver/components/data-table-driver-approval/column";
import type { DriverApprovalResponse } from "@/pages/manager/driver/hooks/use-driver-approvals";
import { useSearchParams } from "react-router-dom";

interface Props {
    drivers: DriverApprovalResponse[];
    onViewDetail: (driver: DriverApprovalResponse) => void;
    onApprove: (id: number) => void;
    onReject: (driver: DriverApprovalResponse) => void;
    isApproving: boolean;
}

export function ApprovalsTable({ drivers, onViewDetail, onApprove, onReject, isApproving }: Props) {
    const columns = getApprovalColumns({ onViewDetail, onApprove, onReject, isApproving });
    const [, setSearchParams] = useSearchParams();

    const { table } = useDataTable({
        data: drivers,
        columns,
        pageCount: 1,
        defaultPerPage: 10,
        filterFields: [
            {
                label: "Tìm kiếm",
                value: "Name",
                placeholder: "Tìm theo tên, email...",
            },
            {
                label: "Loại phương tiện",
                value: "VehicleType", // Liên kết với accessorKey ở columns
                options: [
                    { label: "Xe máy", value: "MOTORBIKE" },
                    { label: "Xe Van", value: "VAN" },
                    { label: "Xe tải", value: "TRUCK" },
                    { label: "Container", value: "CONTAINER" },
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

                            {/* Bộ lọc theo Loại phương tiện */}
                            {table.getColumn("VehicleType") && (
                                <DataTableFacetedFilter
                                    column={table.getColumn("VehicleType")}
                                    title="Loại xe"
                                    options={[
                                        { label: "Xe máy", value: "MOTORBIKE" },
                                        { label: "Xe Van", value: "VAN" },
                                        { label: "Xe tải", value: "TRUCK" },
                                        { label: "Container", value: "CONTAINER" },
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