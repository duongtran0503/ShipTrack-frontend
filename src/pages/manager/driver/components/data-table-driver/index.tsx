import { DataTable } from "@/components/common/data-table";
import { DataTableColumnsVisibility } from "@/components/common/data-table/data-table-columns-visibility";
import { DataTableFacetedFilter } from "@/components/common/data-table/data-table-faceted-filter";
import DataTableInputSearch from "@/components/common/data-table/data-table-input-search";
import { TableInstanceProvider } from "@/components/common/data-table/table-instance-provider";
import { useDataTable } from "@/lib/hooks/use-data-table";
import { getDriverColumns } from "@/pages/manager/driver/components/data-table-driver/columns";
import type { DriverResponse } from "@/pages/manager/driver/hooks/use-admin-drivers";
import { useSearchParams } from "react-router";

interface Props {
    drivers: DriverResponse[];
    onView: (driver: DriverResponse) => void;
    onBanToggle: (driver: DriverResponse) => void;
}

export function DriverTable({ drivers, onView, onBanToggle }: Props) {
    const [, setSearchParams] = useSearchParams();

    const columns = getDriverColumns(onView, onBanToggle);

    const { table } = useDataTable({
        data: drivers,
        columns,
        pageCount: 1,
        defaultPerPage: 10,
        filterFields: [
            {
                label: "Tìm kiếm",
                value: "Name",
                placeholder: "Tìm theo tên, email, SĐT...",
            },
            {
                label: "Trạng thái",
                value: "DeliveryStatus",
                options: [
                    { label: "Online (Sẵn sàng)", value: "ONLINE" },
                    { label: "Đang giao hàng", value: "DELIVERING" },
                    { label: "Offline", value: "OFFLINE" },
                    { label: "Bị khóa", value: "BANNED" },
                    { label: "Chờ duyệt", value: "PENDING" },
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
                            {table.getColumn("DeliveryStatus") && (
                                <DataTableFacetedFilter
                                    column={table.getColumn("DeliveryStatus")}
                                    title="Trạng thái"
                                    options={[
                                        { label: "Online (Sẵn sàng)", value: "ONLINE" },
                                        { label: "Đang giao", value: "DELIVERING" },
                                        { label: "Offline", value: "OFFLINE" },
                                        { label: "Bị khóa", value: "BANNED" },
                                        { label: "Chờ duyệt", value: "PENDING" },
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