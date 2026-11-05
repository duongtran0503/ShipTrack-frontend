import { DataTable } from "@/components/common/data-table";
import { DataTableColumnsVisibility } from "@/components/common/data-table/data-table-columns-visibility";
import { DataTableFacetedFilter } from "@/components/common/data-table/data-table-faceted-filter";
import DataTableInputSearch from "@/components/common/data-table/data-table-input-search";
import { TableInstanceProvider } from "@/components/common/data-table/table-instance-provider";
import { useDataTable } from "@/lib/hooks/use-data-table";
import { getVehicleColumns } from "@/pages/manager/vehicles/components/data-vehicle-table/column";
import type { VehicleListItem } from "@/pages/manager/vehicles/hooks/use-admin-vehicles";
import { useSearchParams } from "react-router";

interface Props {
    vehicles: VehicleListItem[];
    onViewDetail: (id: number) => void;
}

export function VehicleTable({ vehicles, onViewDetail }: Props) {
    const [, setSearchParams] = useSearchParams();

    const columns = getVehicleColumns(onViewDetail);

    const { table } = useDataTable({
        data: vehicles,
        columns,
        pageCount: 1,
        defaultPerPage: 10,
        filterFields: [
            {
                label: "Tìm kiếm",
                value: "licensePlate",
                placeholder: "Tìm theo biển số, hãng xe...",
            },
            {
                label: "Loại xe",
                value: "vehicleType",
                options: [
                    { label: "Xe máy", value: "MOTORBIKE" },
                    { label: "Xe Van", value: "VAN" },
                    { label: "Xe tải", value: "TRUCK" },
                    { label: "Container", value: "CONTAINER" },
                ],
            },
            {
                label: "Trạng thái",
                value: "isVerified", // Tận dụng key này để filter, nhưng options là chuỗi logic
                options: [
                    { label: "Đã duyệt", value: "VERIFIED" },
                    { label: "Chờ duyệt", value: "PENDING" },
                    { label: "Xe Active chính", value: "ACTIVE" },
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
                        <div className="flex flex-1 items-center space-x-2 w-full overflow-x-auto pb-1">
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
                            {table.getColumn("vehicleType") && (
                                <DataTableFacetedFilter
                                    column={table.getColumn("vehicleType")}
                                    title="Loại xe"
                                    options={[
                                        { label: "Xe máy", value: "MOTORBIKE" },
                                        { label: "Xe Van", value: "VAN" },
                                        { label: "Xe tải", value: "TRUCK" },
                                        { label: "Container", value: "CONTAINER" },
                                    ]}
                                />
                            )}
                            {table.getColumn("isVerified") && (
                                <DataTableFacetedFilter
                                    column={table.getColumn("isVerified")}
                                    title="Trạng thái"
                                    options={[
                                        { label: "Đã duyệt", value: "VERIFIED" },
                                        { label: "Chờ duyệt", value: "PENDING" },
                                        { label: "Xe Active chính", value: "ACTIVE" },
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