export interface CalculationResult {
    distanceKm: number
    estimatedMinutes: number
    fee: number
}

const EMPTY_RESULT: CalculationResult = {
    distanceKm: 0,
    estimatedMinutes: 0,
    fee: 0,
}

interface CalculateParams {
    senderAddress?: string
    receiverAddress?: string
    vehicleType: "MOTORBIKE" | "VAN" | "TRUCK"
    weightKg: number
}

/**
 * Tính phí vận chuyển (giả lập OSRM)
 * - Khoảng cách dựa vào độ dài địa chỉ (mock)
 * - Đơn giá theo loại xe
 * - Phụ phí theo khối lượng > 5kg
 */
export function calculateShippingFee({
    senderAddress,
    receiverAddress,
    vehicleType,
    weightKg,
}: CalculateParams): CalculationResult {
    if (!senderAddress || !receiverAddress) {
        return EMPTY_RESULT
    }

    // Giả lập khoảng cách
    const mockDistance = Math.max(
        3.5,
        Number(
            (
                ((senderAddress.length + receiverAddress.length) % 18) + 2.5
            ).toFixed(1)
        )
    )

    // Đơn giá theo loại xe
    let baseFee = 20000
    let pricePerKm = 5000

    if (vehicleType === "VAN") {
        baseFee = 50000
        pricePerKm = 10000
    } else if (vehicleType === "TRUCK") {
        baseFee = 120000
        pricePerKm = 180000
    }

    // Phụ phí khối lượng
    const weightExtra = weightKg > 5 ? (weightKg - 5) * 3000 : 0
    const totalFee = Math.round(baseFee + mockDistance * pricePerKm + weightExtra)
    const estimatedMinutes = Math.round(mockDistance * 3.5 + 10)

    return {
        distanceKm: mockDistance,
        estimatedMinutes,
        fee: totalFee,
    }
}