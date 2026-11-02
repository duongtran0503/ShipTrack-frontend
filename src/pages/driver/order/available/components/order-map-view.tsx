import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect } from "react"
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet"

import { useRoutePolyline } from "@/lib/hooks/use-route-polyline"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

// Tạo Icon cho Tài xế (Màu xanh lá)
const driverIcon = L.divIcon({
    html: `<div style="background-color: #10b981; color: white; padding: 8px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(16,185,129,0.5); font-size: 18px;">🛵</div>`,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 20]
})

// Tạo Icon cho Điểm lấy hàng (Màu xanh dương)
const pickupIcon = L.divIcon({
    html: `<div style="background-color: #3b82f6; color: white; padding: 6px; border-radius: 50%; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); font-size: 16px;">📦</div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16]
})

// Tạo Icon cho Điểm giao hàng (Màu đỏ)
const dropoffIcon = L.divIcon({
    html: `<div style="background-color: #ef4444; color: white; padding: 6px; border-radius: 50%; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); font-size: 16px;">🏁</div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16]
})

interface OrderMapViewProps {
    driverCoords: [number, number];
    pickupCoords: [number, number];
    dropoffCoords: [number, number];
    pickupAddress: string;
    dropoffAddress: string;
}

// Component tự động căn chỉnh bản đồ bao trọn 3 điểm
function FitBounds({ coords }: { coords: [number, number][] }) {
    const map = useMap()
    useEffect(() => {
        if (coords.length > 0) {
            map.fitBounds(coords, { padding: [50, 50] })
        }
    }, [coords, map])
    return null
}

export function OrderMapView({
    driverCoords,
    pickupCoords,
    dropoffCoords,
    pickupAddress,
    dropoffAddress
}: OrderMapViewProps) {
    // 1. Gọi API lấy đường đi cho 2 chặng
    const route1 = useRoutePolyline([
        { lat: driverCoords[0], lng: driverCoords[1] },
        { lat: pickupCoords[0], lng: pickupCoords[1] }
    ])

    const route2 = useRoutePolyline([
        { lat: pickupCoords[0], lng: pickupCoords[1] },
        { lat: dropoffCoords[0], lng: dropoffCoords[1] }
    ])

    // Tâm bản đồ mặc định (Điểm lấy hàng)
    const defaultCenter = pickupCoords

    return (
        <div className="w-full h-96 rounded-[24px] overflow-hidden border border-border/60 shadow-sm relative z-0">
            {/* Hiển thị tổng khoảng cách */}
            <div className="absolute top-4 left-4 z-[400] bg-white p-3 rounded-xl shadow-lg border border-border/50 text-xs">
                <p className="font-bold text-foreground mb-1">Lộ trình dự kiến:</p>
                <p className="text-muted-foreground">Chặng 1 (Đón hàng): <span className="font-bold text-blue-600">{route1.data?.distanceKm || 0} km</span></p>
                <p className="text-muted-foreground">Chặng 2 (Giao hàng): <span className="font-bold text-red-600">{route2.data?.distanceKm || 0} km</span></p>
                <p className="text-primary font-bold mt-1 border-t pt-1">Tổng cộng: {(route1.data?.distanceKm || 0) + (route2.data?.distanceKm || 0)} km</p>
            </div>

            <MapContainer
                center={defaultCenter}
                zoom={13}
                scrollWheelZoom={false}
                style={{ width: "100%", height: "100%", zIndex: 1 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                <ResizeMap />
                {/* Marker Tài xế */}
                <Marker position={driverCoords} icon={driverIcon}>
                    <Popup>Tài xế đang ở đây</Popup>
                </Marker>

                {/* Marker Điểm lấy hàng */}
                <Marker position={pickupCoords} icon={pickupIcon}>
                    <Popup>
                        <strong className="block text-blue-600 font-bold">Điểm lấy hàng:</strong>
                        <span>{pickupAddress}</span>
                    </Popup>
                </Marker>

                {/* Marker Điểm giao hàng */}
                <Marker position={dropoffCoords} icon={dropoffIcon}>
                    <Popup>
                        <strong className="block text-red-600 font-bold">Điểm giao hàng:</strong>
                        <span>{dropoffAddress}</span>
                    </Popup>
                </Marker>

                {/* Vẽ đường đi thực tế (Chặng 1: Tài xế -> Lấy hàng) */}
                {route1.data?.coordinates && (
                    <Polyline
                        positions={route1.data.coordinates.map(c => [c.lat, c.lng])}
                        color="#3b82f6" // Màu xanh dương
                        weight={5}
                        dashArray="5, 10"
                    />
                )}

                {/* Vẽ đường đi thực tế (Chặng 2: Lấy hàng -> Giao hàng) */}
                {route2.data?.coordinates && (
                    <Polyline
                        positions={route2.data.coordinates.map(c => [c.lat, c.lng])}
                        color="#ef4444" // Màu đỏ
                        weight={5}
                    />
                )}

                {/* Tự động căn góc nhìn bao quát cả 3 điểm */}
                <FitBounds coords={[driverCoords, pickupCoords, dropoffCoords]} />
            </MapContainer>
        </div>
    )
}
function ResizeMap() {
    const map = useMap()
    useEffect(() => {
        // Ép Leaflet tính toán lại kích thước sau khi DOM render xong
        setTimeout(() => {
            map.invalidateSize()
        }, 400)
    }, [map])
    return null
}
