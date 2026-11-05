import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DriverResponse } from "@/pages/manager/driver/hooks/use-admin-drivers";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, Eye, Lock, Star, Unlock, XCircle } from "lucide-react";

export const getDriverColumns = (
    onView: (driver: DriverResponse) => void,
    onBanToggle: (driver: DriverResponse) => void
): ColumnDef<DriverResponse>[] => [
        {
            accessorKey: "Name",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Tài xế & Liên hệ" />,
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
            accessorKey: "LicensePlate",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Phương tiện / Biển số" />,
            cell: ({ row }) => {
                const plate = row.getValue("LicensePlate") as string | null;
                return (
                    <span className="font-mono text-xs font-semibold bg-muted/60 px-2 py-1 rounded-lg border border-border/40">
                        {plate || "Chưa cập nhật"}
                    </span>
                );
            },
        },
        {
            accessorKey: "DeliveryStatus",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
            cell: ({ row }) => {
                const driver = row.original;
                if (!driver.IsActive) {
                    return (
                        <Badge className="bg-destructive/10 text-destructive border-destructive/20 shadow-none font-bold text-[10px] px-2.5 py-0.5 rounded-md flex items-center gap-1 w-fit">
                            <XCircle className="size-3" /> Đã khóa
                        </Badge>
                    );
                }
                if (driver.DeliveryStatus === "DELIVERING") {
                    return (
                        <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 shadow-none font-bold text-[10px] px-2.5 py-0.5 rounded-md flex items-center gap-1 w-fit">
                            <span className="size-2 rounded-full bg-amber-500 animate-pulse" /> Đang giao
                        </Badge>
                    );
                }
                if (driver.DeliveryStatus === "ONLINE") {
                    return (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-none font-bold text-[10px] px-2.5 py-0.5 rounded-md flex items-center gap-1 w-fit">
                            <CheckCircle2 className="size-3" /> Online
                        </Badge>
                    );
                }
                return (
                    <Badge className="bg-muted text-muted-foreground border-border shadow-none font-bold text-[10px] px-2.5 py-0.5 rounded-md flex items-center gap-1 w-fit">
                        Offline
                    </Badge>
                );
            },
            filterFn: (row, id, value: string[]) => {
                const driver = row.original;
                if (value.includes("ALL")) return true;
                if (value.includes("ONLINE") && driver.IsActive && driver.DeliveryStatus === "ONLINE") return true;
                if (value.includes("DELIVERING") && driver.IsActive && driver.DeliveryStatus === "DELIVERING") return true;
                if (value.includes("OFFLINE") && driver.IsActive && driver.DeliveryStatus === "OFFLINE") return true;
                if (value.includes("BANNED") && !driver.IsActive) return true;
                if (value.includes("PENDING") && driver.ApprovalStatus === "PENDING") return true;
                return false;
            },
        },
        {
            accessorKey: "RatingAvg",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Đánh giá TB" />,
            cell: ({ row }) => {
                const rating = row.getValue("RatingAvg") as number;
                return (
                    <div className="flex items-center gap-1 font-bold text-foreground">
                        <Star className="size-3.5 text-amber-500 fill-amber-500" />
                        {rating ? rating.toFixed(2) : "---"}
                    </div>
                );
            },
        },
        {
            accessorKey: "TotalTrips",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Số chuyến" />,
            cell: ({ row }) => (
                <span className="text-xs font-semibold text-foreground">{row.getValue("TotalTrips") || 0} chuyến</span>
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
                            variant="ghost"
                            onClick={() => onView(driver)}
                            className="h-8 w-8 p-0 rounded-xl hover:bg-primary/10 hover:text-primary"
                            title="Xem chi tiết"
                        >
                            <Eye className="size-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onBanToggle(driver)}
                            className={`h-8 w-8 p-0 rounded-xl ${driver.IsActive ? "text-destructive hover:bg-destructive/10" : "text-emerald-600 hover:bg-emerald-500/10"}`}
                            title={driver.IsActive ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                        >
                            {driver.IsActive ? <Lock className="size-4" /> : <Unlock className="size-4" />}
                        </Button>
                    </div>
                );
            },
        },
    ];