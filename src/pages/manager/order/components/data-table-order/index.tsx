// src/pages/manager/order/components/order-table.tsx
import { DataTable } from "@/components/common/data-table";
import { DataTableColumnsVisibility } from "@/components/common/data-table/data-table-columns-visibility";
import { DataTableFacetedFilter } from "@/components/common/data-table/data-table-faceted-filter";
import DataTableInputSearch from "@/components/common/data-table/data-table-input-search";
import { TableInstanceProvider } from "@/components/common/data-table/table-instance-provider";
import { useDataTable } from "@/lib/hooks/use-data-table";
import { getOrderColumns } from "@/pages/manager/order/components/data-table-order/columns";
import DataTableFloatingBar from "@/pages/manager/order/components/data-table-order/floating-bar";
import type { AdminOrderType } from "@/pages/manager/order/hooks/use-admin-orders";
import { useSearchParams } from "react-router";

interface Props {
    orders: AdminOrderType[];
    onView: (order: AdminOrderType) => void;
    onCancel: (order: AdminOrderType) => void;
}

export function OrderTable({ orders, onView, onCancel }: Props) {
    const [, setSearchParams] = useSearchParams();

    const columns = getOrderColumns(onView, onCancel);

    const { table } = useDataTable({
        data: orders,
        columns,
        pageCount: 1, // Vì mock data client-side
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
                    { label: "Chờ tài xế", value: "SEARCHING_DRIVER" },
                    { label: "Đang giao", value: "DELIVERING" },
                    { label: "Hoàn thành", value: "COMPLETED" },
                    { label: "Đã hủy", value: "CANCELLED" },
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
                            {table.getColumn("status") && (
                                <DataTableFacetedFilter
                                    column={table.getColumn("status")}
                                    title="Trạng thái"
                                    options={[
                                        { label: "Chờ tài xế", value: "SEARCHING_DRIVER" },
                                        { label: "Đang giao", value: "DELIVERING" },
                                        { label: "Hoàn thành", value: "COMPLETED" },
                                        { label: "Đã hủy", value: "CANCELLED" },
                                    ]}
                                />
                            )}
                        </div>
                        <DataTableColumnsVisibility />
                    </div>

                    {/* Table */}
                    <div className="rounded-2xl overflow-hidden">
                        <DataTable
                            table={table}
                            floatingBar={<DataTableFloatingBar table={table} />}
                        />
                    </div>
                </div>
            </TableInstanceProvider>
        </div>
    );
}