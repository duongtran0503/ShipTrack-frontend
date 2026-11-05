import type { LiveDriverMarker, LiveOrderMarker } from "../hooks/use-live-tracking-map";
import { DriverMarker } from "./driver-marker";
import { OrderMarker } from "./order-marker";

interface Props {
    drivers: LiveDriverMarker[];
    orders: LiveOrderMarker[];
    onSelectEntity: (entity: { type: "DRIVER" | "ORDER"; data: any }) => void;
}

export function MapCanvas({ drivers, orders, onSelectEntity }: Props) {
    return (
        <div className="relative h-[600px] rounded-[24px] overflow-hidden border border-border/60 shadow-sm bg-muted/30 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />

            <div className="absolute top-4 left-4 z-10 bg-card/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-border/60 shadow-lg flex items-center gap-2.5">
                <span className="size-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-foreground">SignalR Stream: Connected</span>
            </div>

            {/* Khu vực hiển thị Marker */}
            <div className="absolute inset-8 pointer-events-none flex flex-wrap items-center justify-around gap-12">
                {drivers.map((driver) => (
                    <DriverMarker
                        key={`driver-${driver.id}`}
                        driver={driver}
                        onClick={() => onSelectEntity({ type: "DRIVER", data: driver })}
                    />
                ))}

                {orders.map((order) => (
                    <OrderMarker
                        key={`order-${order.id}`}
                        order={order}
                        onClick={() => onSelectEntity({ type: "ORDER", data: order })}
                    />
                ))}
            </div>
        </div>
    );
}