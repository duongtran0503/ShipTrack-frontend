import { DataTable } from "@/components/common/data-table";
import { DataTableColumnsVisibility } from "@/components/common/data-table/data-table-columns-visibility";
import { DataTableFacetedFilter } from "@/components/common/data-table/data-table-faceted-filter";
import DataTableInputSearch from "@/components/common/data-table/data-table-input-search";
import { TableInstanceProvider } from "@/components/common/data-table/table-instance-provider";
import { Button } from "@/components/ui/button";
import { useDataTable } from "@/lib/hooks/use-data-table";
import { getOnlineDriverColumns } from "@/pages/manager/driver/components/data-table-driver-online/column";
import type { OnlineDriverResponse } from "@/pages/manager/driver/hooks/use-online-drivers";
import { Radio } from "lucide-react";
import { useSearchParams } from "react-router";

interface Props {
    drivers: OnlineDriverResponse[];
    onViewMap: (id?: number) => void;
    onViewDetail: (id: number) => void;
    onViewOrder: (id: string) => void;
}

export function OnlineDriversTable({ drivers, onViewMap, onViewDetail, onViewOrder }: Props) {
    const [, setSearchParams] = useSearchParams();

    const columns = getOnlineDriverColumns({ onViewMap, onViewDetail, onViewOrder });

    const { table } = useDataTable({
        data: drivers,
        columns,
        pageCount: 1,
        defaultPerPage: 10,
        filterFields: [
            {
                label: "Tìm kiếm",
                value: "Name",
                placeholder: "Tìm theo tên, SĐT, biển số...",
            },
            {
                label: "Trạng thái",
                value: "DeliveryStatus",
                options: [
                    { label: "Sẵn sàng nhận đơn", value: "ONLINE" },
                    { label: "Đang giao hàng", value: "DELIVERING" },
                ],
            },
        ],
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-foreground flex items-center gap-2">
                        <Radio className="size-6 text-emerald-500 animate-pulse" />
                        <span>Tài xế đang online (Real-time)</span>
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Theo dõi định vị và tình trạng hoạt động của {drivers.length} tài xế đang có mặt trên hệ thống.
                    </p>
                </div>

                <Button
                    onClick={() => onViewMap()}
                    className="rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-4 shrink-0"
                >
                    Xem tất cả trên bản đồ
                </Button>
            </div>

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
                                        { label: "Sẵn sàng nhận đơn", value: "ONLINE" },
                                        { label: "Đang giao hàng", value: "DELIVERING" },
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