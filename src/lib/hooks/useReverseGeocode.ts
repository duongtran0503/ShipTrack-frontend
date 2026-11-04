import { useEffect, useRef, useState } from "react";

/**
 * VietMap Reverse v4 — boundary type là SỐ, không phải string:
 *   0 = Thành phố / Tỉnh
 *   1 = Quận / Huyện        (suy ra, xem ghi chú cuối)
 *   2 = Phường / Xã
 *   3.. = khác (tuỳ response)
 */
interface VietMapBoundary {
    type: number;
    id: number;
    name: string;
    prefix?: string;
    full_name?: string;
}

interface VietMapPlace {
    lat: number;
    lng: number;
    distance?: number;
    address?: string;        // "Phường An Đông,Thành phố Hồ Chí Minh"
    name?: string;           // "336 Trần Phú"  ← số nhà + đường
    display?: string;        // chuỗi đầy đủ ghép sẵn
    boundaries?: VietMapBoundary[];
}

interface UseReverseGeocodeResult {
    addressText: string;
    loading: boolean;
    error: string | null;
}

// Cache toàn cục — tránh gọi lại cùng tọa độ
const globalCache = new Map<string, string>();

// Throttle 1 request / 1.1s
let lastCallAt = 0;
async function throttledFetch(url: string, options?: RequestInit) {
    const now = Date.now();
    const wait = Math.max(0, 1100 - (now - lastCallAt));
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    lastCallAt = Date.now();
    return fetch(url, options);
}

/**
 * Dựng địa chỉ tiếng Việt từ response VietMap v4.
 *
 * Ưu tiên:
 *   1. Ghép "name, phường, thành phố" từ boundaries
 *   2. Nếu thiếu → dùng `display`
 *   3. Nếu `display` rỗng → dùng `address`
 */
function formatVietMapAddress(place: VietMapPlace | undefined): string {
    if (!place) return "";

    const boundaries = place.boundaries ?? [];
    const pickByType = (t: number) =>
        boundaries.find((b) => b.type === t)?.full_name?.trim() ??
        boundaries.find((b) => b.type === t)?.name?.trim() ??
        "";

    const ward = pickByType(2);          // Phường / Xã
    const city = pickByType(0);          // Thành phố / Tỉnh

    // `name` = "336 Trần Phú" (số nhà + đường). Đây là phần "đường".
    const streetPart = place.name?.trim() ?? "";

    const parts = [streetPart, ward, city].filter(Boolean);
    if (parts.length > 0) return parts.join(", ");

    // Fallback: `display` đã ghép sẵn
    if (place.display?.trim()) return place.display.trim();

    // Fallback cuối: `address`
    if (place.address?.trim()) return place.address.trim();

    return "";
}

export function useReverseGeocode(
    lat?: number,
    lng?: number
): UseReverseGeocodeResult {
    const [addressText, setAddressText] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (!lat || !lng) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setAddressText("");
            return;
        }

        const apiKey = import.meta.env.VITE_VIETMAP_API_KEY as string | undefined;
        if (!apiKey) {
            setError("Thiếu VITE_VIETMAP_API_KEY trong .env");
            setAddressText(`Vị trí GPS [${lat.toFixed(4)}, ${lng.toFixed(4)}]`);
            return;
        }

        const key = `${lat.toFixed(4)},${lng.toFixed(4)}`;
        const cached = globalCache.get(key);
        if (cached) {
            setAddressText(cached);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        // ⚠️ KHÔNG truyền display_type — đây là lý do 400 trước đó
        const url =
            `https://maps.vietmap.vn/api/reverse/v4` +
            `?apikey=${encodeURIComponent(apiKey)}` +
            `&lat=${lat}&lng=${lng}`;

        throttledFetch(url, { signal: controller.signal })
            .then(async (res) => {
                if (!res.ok) {
                    let msg = `HTTP ${res.status}`;
                    try {
                        const body = await res.json();
                        msg = `${res.status}: ${body?.message ?? JSON.stringify(body)
                            }`;
                    } catch {
                        /* body không phải JSON */
                    }
                    throw new Error(msg);
                }
                return res.json() as Promise<VietMapPlace[] | VietMapPlace>;
            })
            .then((data) => {
                if (!isMounted.current) return;

                const place = Array.isArray(data) ? data[0] : data;
                const formatted = formatVietMapAddress(place);

                const finalText =
                    formatted ||
                    `Vị trí GPS [${lat.toFixed(4)}, ${lng.toFixed(4)}]`;

                globalCache.set(key, finalText);
                setAddressText(finalText);
            })
            .catch((err) => {
                if (!isMounted.current) return;

                const fallback = `Vị trí GPS [${lat.toFixed(4)}, ${lng.toFixed(4)}]`;
                setAddressText(fallback);
                if (err?.name !== "AbortError") {
                    setError(err?.message ?? "Lỗi không xác định");
                }
            })
            .finally(() => {
                clearTimeout(timeoutId);
                if (isMounted.current) setLoading(false);
            });

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [lat, lng]);

    return { addressText, loading, error };
}