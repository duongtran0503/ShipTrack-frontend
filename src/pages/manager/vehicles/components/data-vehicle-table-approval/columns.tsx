import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { VehicleApprovalItem } from "@/pages/manager/vehicles/hooks/use-vehicle-approvals";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, Eye, XCircle } from "lucide-react";

interface ColumnActions {
    onViewDetail: (vehicle: VehicleApprovalItem) => void;
    onApprove: (id: number) => void;
    onReject: (vehicle: VehicleApprovalItem) => void;
    isApproving: boolean;
}

export const getApprovalColumns = ({
    onViewDetail,
    onApprove,
    onReject,
    isApproving,
}: ColumnActions): ColumnDef<VehicleApprovalItem>[] => [
        {
            accessorKey: "licensePlate",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Hình ảnh & Biển số" />,
            cell: ({ row }) => {
                const vehicle = row.original;
                return (
                    <div className="flex items-center gap-3">
                        <img
                            src={vehicle.vehicleImageUrl}
                            alt={vehicle.licensePlate}
                            className="size-12 rounded-xl object-cover border border-border/60"
                        />
                        <div className="flex flex-col">
                            <span className="font-mono font-bold text-foreground text-sm">{vehicle.licensePlate}</span>
                            <span className="text-[10px] text-muted-foreground mt-0.5">Tải trọng: {vehicle.maxWeightKg} kg</span>
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
                        <span className="font-semibold text-foreground text-xs">{vehicle.brand} ({vehicle.color})</span>
                    </div>
                );
            },
            filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
        },
        {
            accessorKey: "driverName",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Tài xế đăng ký" />,
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
            accessorKey: "registeredAt",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày đăng ký" />,
            cell: ({ row }) => (
                <span className="text-xs text-muted-foreground">{row.getValue("registeredAt")}</span>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const vehicle = row.original;
                return (
                    <div className="flex items-center justify-end gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onViewDetail(vehicle)}
                            className="h-8 px-3 rounded-xl text-xs font-bold border-border/60 hover:bg-accent"
                        >
                            <Eye className="size-3.5 mr-1" /> Xem
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => onApprove(vehicle.id)}
                            disabled={isApproving}
                            className="h-8 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            <CheckCircle2 className="size-3.5 mr-1" /> Duyệt
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onReject(vehicle)}
                            className="h-8 px-3 rounded-xl text-xs font-bold"
                        >
                            <XCircle className="size-3.5 mr-1" /> Từ chối
                        </Button>
                    </div>
                );
            },
        },
    ];