import { MapPin } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useVietmap, type LatLng, type VietmapPrediction } from "@/lib/hooks/use-vietmap"
import { cn } from "cn"

interface Props {
    label: string
    placeholder?: string
    value: string
    onChange: (value: string) => void
    onSelectLocation?: (location: LatLng) => void
    badgeColor?: "primary" | "emerald" | "blue"
    userLocation?: LatLng
}

export function AddressSearchInput({
    label, placeholder = "Nhập địa chỉ...", value, onChange,
    onSelectLocation, badgeColor = "primary", userLocation,
}: Props) {
    // State nội bộ để gõ mượt không bị kẹt (không dính dáng tới Form cha)
    const [inputValue, setInputValue] = useState(value || "")
    const [showDropdown, setShowDropdown] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    // Gọi hook với inputValue (hook sẽ tự lo việc debounce)
    const { results, isLoading, getPlaceDetails, clearResults } = useVietmap(inputValue, userLocation)

    // Đồng bộ ngược từ Form cha (VD: chọn từ sổ địa chỉ)
    useEffect(() => {
        if (value !== inputValue) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setInputValue(value || "")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const handleInputChange = (text: string) => {
        setInputValue(text)
        setShowDropdown(true)
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSelect = async (item: VietmapPrediction) => {
        setInputValue(item.display)
        onChange(item.display)

        setShowDropdown(false)
        clearResults()

        const location = await getPlaceDetails(item.ref_id)
        if (location && onSelectLocation) {
            onSelectLocation(location)
        }
    }

    const labelColorMap = {
        primary: "text-primary",
        emerald: "text-emerald-600",
        blue: "text-blue-600",
    }

    // Chỉ hiển thị dropdown khi đang có text và đang focus
    const shouldShowDropdown = showDropdown && inputValue.trim().length > 0

    return (
        <Field>
            <FieldLabel className={cn("text-xs font-semibold", labelColorMap[badgeColor])}>
                {label}
            </FieldLabel>

            <div className="relative" ref={wrapperRef}>
                <Input
                    type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onBlur={() => onChange(inputValue)} // Đồng bộ ra ngoài khi blur
                    onFocus={() => {
                        if (inputValue.trim().length > 0) setShowDropdown(true)
                    }}
                    className="h-11 rounded-xl bg-muted/30"
                />

                {shouldShowDropdown && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border/60 rounded-xl shadow-lg max-h-[300px] overflow-y-auto">
                        {isLoading ? (
                            <LoadingSkeleton />
                        ) : results.length > 0 ? (
                            results.map((item) => (
                                <ResultItem
                                    key={item.ref_id}
                                    item={item}
                                    onSelect={() => handleSelect(item)}
                                />
                            ))
                        ) : (
                            <div className="py-6 text-center text-xs text-muted-foreground">
                                Không tìm thấy địa điểm...
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Field>
    )
}

function LoadingSkeleton() {
    return (
        <div className="p-3 space-y-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-1.5">
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                    <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
                </div>
            ))}
        </div>
    )
}

function ResultItem({
    item, onSelect,
}: {
    item: VietmapPrediction
    onSelect: () => void
}) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className="w-full flex items-start gap-3 px-4 py-3 hover:bg-accent/50 transition-colors text-left border-b border-border/30 last:border-b-0"
        >
            <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0 space-y-0.5">
                <div className="text-sm font-bold text-foreground truncate">
                    {item.name}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                    {item.address}
                </div>
            </div>
        </button>
    )
}