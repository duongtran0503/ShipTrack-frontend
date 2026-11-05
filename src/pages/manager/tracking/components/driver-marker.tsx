import type { LiveDriverMarker } from "../hooks/use-live-tracking-map";

interface Props {
    driver: LiveDriverMarker;
    onClick: () => void;
}

export function DriverMarker({ driver, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className="pointer-events-auto group relative flex items-center gap-2 p-2 rounded-2xl bg-card border border-border/80 shadow-xl hover:scale-105 hover:border-primary/50 transition-all z-10"
        >
            <img
                src={driver.avatar || "https://github.com/shadcn.png"}
                alt={driver.name}
                className="size-8 rounded-full object-cover border border-border"
            />
            <div className="text-left pr-2">
                <p className="text-xs font-bold truncate max-w-[100px] text-foreground">{driver.name}</p>
                <span
                    className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${driver.status === "DELIVERING"
                        ? "bg-amber-500/10 text-amber-600"
                        : "bg-emerald-500/10 text-emerald-600"
                        }`}
                >
                    {driver.status === "DELIVERING" ? "Đang giao" : "Online"}
                </span>
            </div>
            {/* Hiệu ứng nhấp nháy cho tài xế đang giao hàng */}
            {driver.status === "DELIVERING" && (
                <span className="absolute -top-1 -right-1 flex size-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full size-3 bg-amber-500"></span>
                </span>
            )}
        </button>
    );
}