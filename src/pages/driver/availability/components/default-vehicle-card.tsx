import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Truck } from "lucide-react";
import { useNavigate } from "react-router";
import type { DriverAvailabilityState } from "../hooks/use-driver-availability";

interface Props {
    vehicle: DriverAvailabilityState["defaultVehicle"];
}

export function DefaultVehicleCard({ vehicle }: Props) {
    const navigate = useNavigate();

    return (
        <Card className="rounded-[24px] border-border/50 shadow-sm bg-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Truck className="size-4 text-primary" />
                    <span>Phương tiện hoạt động mặc định</span>
                </h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/driver/vehicles")}
                    className="text-xs font-bold text-primary hover:bg-accent cursor-pointer"
                >
                    Quản lý xe <ArrowRight className="size-3.5 ml-1" />
                </Button>
            </div>

            {vehicle ? (
                <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-foreground">{vehicle.model}</p>
                            <p className="text-xs font-mono text-primary font-bold mt-0.5">
                                Biển số: {vehicle.plateNumber}
                            </p>
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full text-[10px] font-bold">
                            {vehicle.vehicleType}
                        </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                        Phương tiện này sẽ được sử dụng để ghép đơn và tính toán cước phí vận chuyển phù hợp.
                    </p>
                </div>
            ) : (
                <div className="text-center py-6 space-y-3">
                    <p className="text-xs text-muted-foreground">Bạn chưa thiết lập phương tiện mặc định.</p>
                    <Button
                        size="sm"
                        onClick={() => navigate("/driver/vehicles/create")}
                        className="rounded-full bg-primary text-white font-bold text-xs px-5"
                    >
                        Thêm phương tiện ngay
                    </Button>
                </div>
            )}
        </Card>
    );
}