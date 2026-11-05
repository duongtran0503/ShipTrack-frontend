import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DriverApprovalResponse } from "@/pages/manager/driver/hooks/use-driver-approvals";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, Eye, Truck, XCircle } from "lucide-react";

const VEHICLE_TYPE_CONFIG: Record<string, { label: string; className: string }> = {
    MOTORBIKE: { label: "Xe máy", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
    VAN: { label: "Xe Van", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
    TRUCK: { label: "Xe tải", className: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
    CONTAINER: { label: "Container", className: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
};

interface ColumnActions {
    onViewDetail: (driver: DriverApprovalResponse) => void;
    onApprove: (id: number) => void;
    onReject: (driver: DriverApprovalResponse) => void;
    isApproving: boolean;
}

export const getApprovalColumns = ({
    onViewDetail,
    onApprove,
    onReject,
    isApproving,
}: ColumnActions): ColumnDef<DriverApprovalResponse>[] => [
        {
            accessorKey: "Name",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Họ và tên / Liên hệ" />,
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
                            <span className="text-[10px] text-muted-foreground">{driver.Email} • {driver.Phone}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "VehicleType", // Cột mới thêm để filter
            header: ({ column }) => <DataTableColumnHeader column={column} title="Loại xe" />,
            cell: ({ row }) => {
                const type = row.getValue("VehicleType") as string;
                const config = VEHICLE_TYPE_CONFIG[type] || { label: type || "Chưa rõ", className: "bg-muted text-muted-foreground" };
                return (
                    <Badge className={`${config.className} shadow-none font-bold text-[10px] rounded-md px-2 py-0.5 border w-fit flex items-center gap-1`}>
                        <Truck className="size-3" />
                        {config.label}
                    </Badge>
                );
            },
            filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
        },
        {
            accessorKey: "LicenseNumber",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Thông tin bằng lái" />,
            cell: ({ row }) => {
                const driver = row.original;
                return (
                    <div className="flex flex-col">
                        <span className="font-semibold text-foreground text-xs">{driver.LicenseNumber || "---"}</span>
                        <span className="text-[10px] text-muted-foreground">Hạn: {driver.LicenseExpiryDate || "---"}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "VehicleBrand",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Hãng xe / Biển số" />,
            cell: ({ row }) => {
                const driver = row.original;
                return (
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold text-foreground text-xs">{driver.VehicleBrand} ({driver.VehicleModel})</span>
                        <span className="font-mono text-[10px] bg-muted/60 px-1.5 py-0.5 rounded border border-border/40 w-fit">
                            {driver.LicensePlate}
                        </span>
                    </div>
                );
            },
        },
        {
            accessorKey: "RegisteredAt",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày đăng ký" />,
            cell: ({ row }) => (
                <span className="text-xs text-muted-foreground">{row.getValue("RegisteredAt") || "---"}</span>
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
                            onClick={() => onViewDetail(driver)}
                            className="h-8 px-3 rounded-xl text-xs font-bold border-border/60 hover:bg-accent"
                        >
                            <Eye className="size-3.5 mr-1" /> Xem
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => onApprove(driver.Id)}
                            disabled={isApproving}
                            className="h-8 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            <CheckCircle2 className="size-3.5 mr-1" /> Duyệt
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onReject(driver)}
                            className="h-8 px-3 rounded-xl text-xs font-bold"
                        >
                            <XCircle className="size-3.5 mr-1" /> Từ chối
                        </Button>
                    </div>
                );
            },
        },
    ];