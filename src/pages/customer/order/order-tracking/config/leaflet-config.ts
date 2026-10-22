import L from "leaflet"

// Tọa độ giả lập khu vực TP.HCM (Quận 1 -> Quận 3)
export const START_COORDINATES: [number, number] = [10.7769, 106.7009]
export const END_COORDINATES: [number, number] = [10.7829, 106.6852]

// Custom icon cho các marker
export const START_ICON = L.divIcon({
    html: `<div style="background-color: #710105; color: white; padding: 6px; border-radius: 50%; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">📍</div>`,
    className: "",
    iconSize: [30, 30],
})

export const END_ICON = L.divIcon({
    html: `<div style="background-color: #10b981; color: white; padding: 6px; border-radius: 50%; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">🏁</div>`,
    className: "",
    iconSize: [30, 30],
})

export const DRIVER_ICON = L.divIcon({
    html: `<div style="background-color: #2563eb; color: white; padding: 8px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(37,99,235,0.5);">🛵</div>`,
    className: "",
    iconSize: [36, 36],
})

export const OSM_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
export const OSM_ATTRIBUTION = "&copy; OpenStreetMap contributors"