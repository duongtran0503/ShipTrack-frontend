import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { OnlineDriverResponse } from "@/pages/manager/driver/hooks/use-online-drivers";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight, Eye, Map, MapPin } from "lucide-react";

interface ColumnActions {
    onViewMap: (id: number) => void;
    onViewDetail: (id: number) => void;
    onViewOrder: (id: string) => void;
}

export const getOnlineDriverColumns = ({
    onViewMap,
    onViewDetail,
    onViewOrder,
}: ColumnActions): ColumnDef<OnlineDriverResponse>[] => [
        {
            accessorKey: "Name",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Tài xế & Biển số" />,
            cell: ({ row }) => {
                const driver = row.original;
                return (
                    <div className="flex items-center gap-3">
                        <img
                            src={driver.AvatarUrl || "https://github.com/shadcn.png"}
                            alt={driver.Name}
                            className="size-9 rounded-full object-cover border border-border"
                        />
                        <div className="flex flex-col">
                            <span className="font-bold text-foreground text-xs">{driver.Name}</span>
                            <span className="text-[10px] text-muted-foreground">
                                {driver.Phone} • <span className="font-mono font-semibold">{driver.LicensePlate}</span>
                            </span>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "CurrentLocationName",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Vị trí hiện tại" />,
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5 font-medium text-foreground text-xs">
                    <MapPin className="size-3.5 text-rose-500 shrink-0" />
                    <span>{row.getValue("CurrentLocationName")}</span>
                </div>
            ),
        },
        {
            accessorKey: "DeliveryStatus",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
            cell: ({ row }) => {
                const status = row.getValue("DeliveryStatus") as string;
                if (status === "DELIVERING") {
                    return (
                        <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 shadow-none font-bold text-[10px] px-2.5 py-0.5 rounded-md flex items-center gap-1 w-fit">
                            <span className="size-2 rounded-full bg-amber-500 animate-pulse" /> Đang giao hàng
                        </Badge>
                    );
                }
                return (
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-none font-bold text-[10px] px-2.5 py-0.5 rounded-md flex items-center gap-1 w-fit">
                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" /> Sẵn sàng
                    </Badge>
                );
            },
            filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
        },
        {
            id: "ActiveOrder",
            header: "Đơn hàng hiện tại",
            cell: ({ row }) => {
                const order = row.original.ActiveOrder;
                if (!order) return <span className="text-muted-foreground italic text-[11px]">Không có</span>;
                return (
                    <button
                        onClick={() => onViewOrder(order.id)}
                        className="group text-left hover:underline max-w-[200px]"
                    >
                        <p className="font-bold text-primary flex items-center gap-1 text-xs">
                            #{order.trackingCode}
                            <ArrowUpRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate" title={order.deliveryAddress}>
                            Đến: {order.deliveryAddress}
                        </p>
                    </button>
                );
            },
        },
        {
            accessorKey: "LastUpdated",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Cập nhật GPS" />,
            cell: ({ row }) => (
                <span className="text-xs text-muted-foreground">{row.getValue("LastUpdated")}</span>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const driver = row.original;
                return (
                    <div className="flex items-center justify-end gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onViewMap(driver.Id)}
                            className="h-8 px-2.5 rounded-xl text-xs font-semibold border-border/60 hover:bg-accent"
                            title="Xem bản đồ"
                        >
                            <Map className="size-3.5 mr-1" /> Bản đồ
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onViewDetail(driver.Id)}
                            className="h-8 w-8 p-0 rounded-xl hover:bg-primary/10 hover:text-primary"
                            title="Xem hồ sơ"
                        >
                            <Eye className="size-4" />
                        </Button>
                    </div>
                );
            },
        },
    ];