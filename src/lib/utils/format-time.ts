// src/lib/utils/format-time.ts
export function formatDeliveryTime(minutes: number): string {
    if (!minutes || minutes <= 0) return "--"

    // Dưới 60 phút
    if (minutes < 60) {
        return `~ ${minutes} phút`
    }

    // Trên 60 phút và dưới 24h (1440 phút)
    if (minutes < 1440) {
        const hours = Math.floor(minutes / 60)
        const remainingMinutes = minutes % 60
        if (remainingMinutes === 0) {
            return `~ ${hours} giờ`
        }
        return `~ ${hours} giờ ${remainingMinutes} phút`
    }

    // Trên 24h
    const days = Math.floor(minutes / 1440)
    const remainingAfterDays = minutes % 1440
    const hours = Math.floor(remainingAfterDays / 60)
    const remainingMinutes = remainingAfterDays % 60

    let result = `~ ${days} ngày`
    if (hours > 0) result += ` ${hours} giờ`
    if (remainingMinutes > 0) result += ` ${remainingMinutes} phút`

    return result
}