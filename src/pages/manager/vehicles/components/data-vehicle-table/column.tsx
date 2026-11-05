import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { VehicleListItem } from "@/pages/manager/vehicles/hooks/use-admin-vehicles";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, Clock, Eye } from "lucide-react";

export const getVehicleColumns = (
    onViewDetail: (id: number) => void
): ColumnDef<VehicleListItem>[] => [
        {
            accessorKey: "licensePlate",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Hình ảnh & Biển số" />,
            cell: ({ row }) => {
                const vehicle = row.original;
                return (
                    <div className="flex items-center gap-3">
                        <img
                            src={vehicle.vehicleImageUrl || "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=100&h=100&fit=crop"}
                            alt={vehicle.licensePlate}
                            className="size-12 rounded-xl object-cover border border-border/60"
                        />
                        <div className="flex flex-col">
                            <span className="font-mono font-bold text-foreground text-sm">{vehicle.licensePlate}</span>
                            <span className="text-[10px] text-muted-foreground mt-0.5">Tải trọng: {vehicle.maxWeightKg || 0} kg • {vehicle.color || "N/A"}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "vehicleType",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Loại xe / Hãng" />,
            cell: ({ row }) => {
                const vehicle = row.original;
                return (
                    <div className="flex flex-col gap-1">
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-bold w-fit">
                            {vehicle.vehicleType}
                        </Badge>
                        <span className="font-semibold text-foreground text-xs">{vehicle.brand || "Không rõ hãng"}</span>
                    </div>
                );
            },
            filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
        },
        {
            accessorKey: "driverName",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Tài xế sở hữu" />,
            cell: ({ row }) => {
                const vehicle = row.original;
                return (
                    <div className="flex items-center gap-2">
                        <img
                            src={vehicle.driverAvatar || "https://github.com/shadcn.png"}
                            alt={vehicle.driverName}
                            className="size-7 rounded-full object-cover border border-border"
                        />
                        <div className="flex flex-col">
                            <span className="font-bold text-foreground text-xs">{vehicle.driverName}</span>
                            <span className="text-[10px] text-muted-foreground">{vehicle.driverPhone}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "isDefault",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái Active" />,
            cell: ({ row }) => {
                const isDefault = row.getValue("isDefault") as boolean;
                return isDefault ? (
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] font-bold w-fit">
                        Xe Active chính
                    </Badge>
                ) : (
                    <span className="text-muted-foreground text-[11px]">Xe phụ</span>
                );
            },
            filterFn: (row, id, value: string[]) => {
                if (value.includes("ALL")) return true;
                const isDefault = row.getValue(id);
                if (value.includes("ACTIVE") && isDefault) return true;
                return false;
            },
        },
        {
            accessorKey: "isVerified",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Kiểm duyệt" />,
            cell: ({ row }) => {
                const isVerified = row.getValue("isVerified") as boolean;
                return isVerified ? (
                    <span className="flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                        <CheckCircle2 className="size-3.5" /> Đã duyệt
                    </span>
                ) : (
                    <span className="flex items-center gap-1 text-amber-600 font-bold text-[11px]">
                        <Clock className="size-3.5" /> Chờ duyệt
                    </span>
                );
            },
            filterFn: (row, id, value: string[]) => {
                if (value.includes("ALL")) return true;
                const isVerified = row.getValue(id);
                if (value.includes("VERIFIED") && isVerified) return true;
                if (value.includes("PENDING") && !isVerified) return true;
                return false;
            },
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <div className="flex items-center justify-end">
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onViewDetail(row.original.id)}
                        className="h-8 w-8 p-0 rounded-xl hover:bg-primary/10 hover:text-primary"
                        title="Xem chi tiết phương tiện"
                    >
                        <Eye className="size-4" />
                    </Button>
                </div>
            ),
        },
    ];