import { Package } from "lucide-react";
import type { LiveOrderMarker } from "../hooks/use-live-tracking-map";

interface Props {
    order: LiveOrderMarker;
    onClick: () => void;
}

export function OrderMarker({ order, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground shadow-lg hover:scale-105 hover:bg-primary/90 transition-all font-bold text-xs z-10"
        >
            <Package className="size-3.5" />
            <span>#{order.trackingCode}</span>
        </button>
    );
}