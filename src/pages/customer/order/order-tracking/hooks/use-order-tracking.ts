import { useQuery } from "@tanstack/react-query"
import L from "leaflet"
import { useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router"

import { mockOrderService } from "@/demo_data_services/mockOrderService"
import { useSignalRTracking } from "@/lib/hooks/use-signalr-tracking"
import { DRIVER_ICON, END_COORDINATES, END_ICON, OSM_ATTRIBUTION, OSM_TILE_URL, START_COORDINATES, START_ICON } from "@/pages/customer/order/order-tracking/config/leaflet-config"


export function useOrderTracking() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const mapRef = useRef<L.Map | null>(null)
    const driverMarkerRef = useRef<L.Marker | null>(null)

    // ==================== SIGNALR ====================
    const { driverLoc, isConnected } = useSignalRTracking(
        START_COORDINATES,
        END_COORDINATES
    )

    // ==================== QUERY ====================
    const { data: order } = useQuery({
        queryKey: ["customer_order_detail", id],
        queryFn: async () => {
            const orders = await mockOrderService.getRecentOrders()
            return (
                orders.find((o) => o.id === id || o.trackingCode === id) ?? orders[0]
            )
        },
    })

    // ==================== MAP INIT ====================
    useEffect(() => {
        if (mapRef.current) return

        const map = L.map("leaflet-tracking-map").setView(START_COORDINATES, 14)
        mapRef.current = map

        L.tileLayer(OSM_TILE_URL, { attribution: OSM_ATTRIBUTION }).addTo(map)

        // Markers
        L.marker(START_COORDINATES, { icon: START_ICON })
            .addTo(map)
            .bindPopup("Điểm lấy hàng")
        L.marker(END_COORDINATES, { icon: END_ICON })
            .addTo(map)
            .bindPopup("Điểm giao hàng")

        // Route line
        L.polyline([START_COORDINATES, END_COORDINATES], {
            color: "#710105",
            weight: 4,
            dashArray: "6, 8",
        }).addTo(map)

        // Driver marker
        driverMarkerRef.current = L.marker([driverLoc.lat, driverLoc.lng], {
            icon: DRIVER_ICON,
        }).addTo(map)

        return () => {
            map.remove()
            mapRef.current = null
        }
    }, [])

    // ==================== UPDATE DRIVER POSITION ====================
    useEffect(() => {
        if (driverMarkerRef.current) {
            driverMarkerRef.current.setLatLng([driverLoc.lat, driverLoc.lng])
        }
    }, [driverLoc])

    // ==================== HANDLERS ====================
    const goBackToDetail = () => navigate(`/customer/orders/${id}`)
    const goToDashboard = () => navigate("/customer/dashboard")

    // ==================== RETURN ====================
    return {
        // Data
        order,
        driverLoc,
        isConnected,

        // Navigation
        goBackToDetail,
        goToDashboard,
    }
}