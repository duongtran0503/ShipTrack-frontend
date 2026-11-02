// src/lib/hooks/use-vietmap.ts
import { useEffect, useState } from "react";
import { useDebounce } from "./use-debounce"; // Đảm bảo đúng đường dẫn tới hook debounce của bạn

// ==================== TYPES ====================
export interface LatLng {
    lat: number
    lng: number
}

// Cấu trúc trả về của Vietmap Autocomplete v4
export interface VietmapPrediction {
    ref_id: string
    name: string           // "99 An Dương Vương"
    address: string        // "Phường 8, Quận 5, TP. Hồ Chí Minh"
    display: string        // "99 An Dương Vương, Phường 8, Quận 5, TP. Hồ Chí Minh"
}

// Cấu trúc trả về của Vietmap Routing v2
export interface VietmapRouteResult {
    distanceKm: number
    durationMinutes: number
}

// ==================== HOOK ====================
export function useVietmap(inputValue: string = "", userLocation?: LatLng) {
    const [results, setResults] = useState<VietmapPrediction[]>([])
    const [isLoading, setIsLoading] = useState(false)

    // 1. Debounce giá trị input (chờ 500ms sau khi ngừng gõ mới bắt đầu search)
    const debouncedInput = useDebounce(inputValue, 2000)
    const API_KEY = import.meta.env.VITE_VIETMAP_API_KEY

    // ==================== 1. AUTOCOMPLETE ====================
    // Tự động gọi API mỗi khi debouncedInput thay đổi
    useEffect(() => {
        const fetchPlaces = async () => {
            if (!debouncedInput || debouncedInput.trim().length < 5) {
                setResults([])
                return
            }

            setIsLoading(true)
            try {
                // Nếu có userLocation, Vietmap sẽ ưu tiên trả về địa chỉ gần bạn
                const locationParam = userLocation
                    ? `&location=${userLocation.lat},${userLocation.lng}`
                    : ""

                const url = `https://maps.vietmap.vn/api/autocomplete/v4?apikey=${API_KEY}&text=${encodeURIComponent(debouncedInput)}${locationParam}&display=5`

                const res = await fetch(url)
                const data = await res.json()

                // Vietmap trả về mảng các địa chỉ
                if (Array.isArray(data)) {
                    setResults(data)
                } else {
                    setResults([])
                }
            } catch (error) {
                console.error("Vietmap Autocomplete error:", error)
                setResults([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchPlaces()
    }, [debouncedInput, userLocation?.lat, userLocation?.lng, API_KEY])

    // ==================== 2. GET PLACE DETAIL ====================
    // Vietmap Autocomplete không trả về lat/lng trực tiếp, nên phải gọi API Detail
    const getPlaceDetails = async (refId: string): Promise<LatLng | null> => {
        try {
            const url = `https://maps.vietmap.vn/api/place/v4?apikey=${API_KEY}&refid=${refId}`
            const res = await fetch(url)
            const data = await res.json()

            if (data && data.lat && data.lng) {
                return { lat: data.lat, lng: data.lng }
            }
            return null
        } catch (error) {
            console.error("Lỗi lấy toạ độ Vietmap:", error)
            return null
        }
    }

    // ==================== 3. GET ROUTING (KHOẢNG CÁCH ĐƯỜNG BỘ) ====================
    const getRoute = async (
        origin: LatLng,
        destination: LatLng,
        vehicle: "car" | "bike" | "truck" = "bike"
    ): Promise<VietmapRouteResult | null> => {
        try {
            // Vietmap Routing API v2
            const url = `https://maps.vietmap.vn/api/route?apikey=${API_KEY}&point=${origin.lat},${origin.lng}&point=${destination.lat},${destination.lng}&vehicle=${vehicle ?? "bike"}`

            const res = await fetch(url)
            const data = await res.json()

            // Kiểm tra cấu trúc trả về
            if (data && data.paths && data.paths.length > 0) {
                const route = data.paths[0]
                return {
                    distanceKm: Number((route.distance / 1000).toFixed(1)), // Đổi mét sang km
                    durationMinutes: Math.round(route.time / 60), // Đổi giây sang phút
                }
            }
            return null
        } catch (error) {
            console.error("Lỗi lấy lộ trình Vietmap:", error)
            return null
        }
    }

    // ==================== RETURN ====================
    return {
        results,
        isLoading,
        getPlaceDetails,
        getRoute,
        clearResults: () => setResults([]),
    }
}