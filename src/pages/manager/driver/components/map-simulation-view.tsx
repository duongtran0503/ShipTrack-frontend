import type { MapDriverLocation } from "@/pages/manager/driver/hooks/use-drivers-map";

interface Props {
    drivers: MapDriverLocation[];
    selectedDriver: MapDriverLocation | null;
    onSelectDriver: (driver: MapDriverLocation) => void;
}

export function MapSimulationView({ drivers, selectedDriver, onSelectDriver }: Props) {
    return (
        <div className="relative h-[550px] rounded-[24px] overflow-hidden border border-border/60 shadow-sm bg-muted/30 flex flex-col items-center justify-center">
            {/* Background lưới (Grid) */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />

            {/* Cảnh báo kết nối */}
            <div className="absolute top-4 left-4 z-10 bg-card/90 backdrop-blur-md p-3 rounded-2xl border border-border/60 shadow-lg flex items-center gap-3">
                <span className="size-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-foreground">SignalR GPS Stream Active</span>
            </div>

            {/* Vị trí các tài xế (Marker) */}
            <div className="absolute inset-6 pointer-events-none flex flex-wrap items-center justify-around gap-8">
                {drivers.map((driver) => (
                    <button
                        key={driver.Id}
                        onClick={() => onSelectDriver(driver)}
                        className={`pointer-events-auto group relative flex items-center gap-2 p-2 rounded-2xl border shadow-xl transition-all duration-300 hover:scale-105 ${selectedDriver?.Id === driver.Id
                            ? "bg-primary text-primary-foreground border-primary scale-105"
                            : "bg-card text-card-foreground border-border/80"
                            }`}
                    >
                        <img
                            src={driver.AvatarUrl || "https://github.com/shadcn.png"}
                            alt={driver.Name}
                            className="size-8 rounded-full object-cover border border-white/40"
                        />
                        <div className="text-left pr-2">
                            <p className="text-xs font-bold truncate max-w-[100px]">{driver.Name}</p>
                            <span
                                className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${driver.DeliveryStatus === "DELIVERING"
                                    ? "bg-amber-500/20 text-amber-600"
                                    : "bg-emerald-500/20 text-emerald-600"
                                    }`}
                            >
                                {driver.DeliveryStatus === "DELIVERING" ? "Đang giao" : "Sẵn sàng"}
                            </span>
                        </div>
                        {/* Mũi nhọn của bong bóng chat */}
                        <span
                            className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-3 rotate-45 border-r border-b ${selectedDriver?.Id === driver.Id
                                ? "bg-primary border-primary"
                                : "bg-card border-border/80"
                                }`}
                        />
                    </button>
                ))}
            </div>

            {/* Note */}
            <div className="absolute bottom-4 right-4 z-10 bg-card/90 backdrop-blur-md px-3 py-2 rounded-xl border border-border/60 text-[10px] text-muted-foreground shadow">
                💡 Mẹo: Nhấp vào các thẻ ghim trên bản đồ để xem chi tiết điều phối.
            </div>
        </div>
    );
}