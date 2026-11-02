import polyline from "@mapbox/polyline"
import { useQuery } from "@tanstack/react-query"

export interface LatLng {
    lat: number
    lng: number
}

export function useRoutePolyline(waypoints: LatLng[]) {
    const API_KEY = import.meta.env.VITE_VIETMAP_API_KEY

    return useQuery({
        queryKey: ["vietmap-route-polyline", waypoints],
        queryFn: async () => {
            // Nối các điểm thành chuỗi point=lat,lng&point=lat,lng...
            const pointsQuery = waypoints.map(p => `point=${p.lat},${p.lng}`).join("&")
            const url = `https://maps.vietmap.vn/api/route?apikey=${API_KEY}&${pointsQuery}&vehicle=bike&points_encoded=true`

            const res = await fetch(url)
            const data = await res.json()

            if (data && data.paths && data.paths.length > 0) {
                const route = data.paths[0]
                // Giải mã chuỗi polyline thành mảng [lat, lng]
                const decodedCoords = polyline.decode(route.points).map((coord: any[]) => ({
                    lat: coord[0],
                    lng: coord[1]
                }))

                return {
                    distanceKm: Number((route.distance / 1000).toFixed(1)),
                    durationMinutes: Math.round(route.time / 60000), // ms -> phút
                    coordinates: decodedCoords
                }
            }
            return null
        },
        enabled: waypoints.length >= 2
    })
}