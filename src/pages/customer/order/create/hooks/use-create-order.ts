import { useVietmap } from "@/lib/hooks/use-vietmap"
import { createOrderSchema, type CreateOrderSchemaType } from "@/lib/schemas/order"
import { orderApi } from "@/services/order/order-api"
import { addressApi } from "@/services/user/address-api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"

// ==================== CẤU HÌNH GIÁ & PHỤ PHÍ CHO TỪNG LOẠI XE ====================
const PRICING = {
    MOTORBIKE: { base: 20000, perKm: 5000, extraWeightLimit: 5, extraWeightFee: 3000 },
    VAN: { base: 50000, perKm: 10000, extraWeightLimit: 20, extraWeightFee: 5000 },
    TRUCK: { base: 180000, perKm: 28000, extraWeightLimit: 100, extraWeightFee: 12000 },
}

const BULKY_FEE = 40000         // Phụ phí hàng cồng kềnh
const DOOR_DELIVERY_FEE = 25000 // Phụ phí bốc xếp / giao tận nơi
const EXPRESS_MULTIPLIER = 1.4  // Hệ số dịch vụ hỏa tốc

// 📍 Khung tọa độ ước lượng ranh giới TP. Hồ Chí Minh (Latitude: 10.3 - 11.2, Longitude: 106.3 - 107.0)
const HCMC_BOUNDS = {
    minLat: 10.35,
    maxLat: 11.25,
    minLng: 106.35,
    maxLng: 107.05,
}

// Hàm kiểm tra tọa độ có nằm trong TP.HCM không
function isInsideHCMC(lat: number, lng: number): boolean {
    if (!lat || !lng) return false
    return (
        lat >= HCMC_BOUNDS.minLat &&
        lat <= HCMC_BOUNDS.maxLat &&
        lng >= HCMC_BOUNDS.minLng &&
        lng <= HCMC_BOUNDS.maxLng
    )
}

export interface CalculationResult {
    distanceKm: number
    vietmapMinutes: number      // Thời gian di chuyển thực tế do Vietmap tính
    processingMinutes: number   // Thời gian xử lý & bốc xếp ước tính
    estimatedMinutes: number    // Tổng thời gian giao dự kiến
    fee: number
}

export function useCreateOrder() {
    const navigate = useNavigate()
    const { getRoute } = useVietmap()

    // ==================== QUERY ĐỊA CHỈ (DÙNG API THẬT) ====================
    const { data: addresses } = useQuery({
        queryKey: ["customer_addresses"],
        queryFn: addressApi.getAddresses,
    })

    // ==================== FORM ====================
    const form = useForm<CreateOrderSchemaType>({
        resolver: zodResolver(createOrderSchema),
        defaultValues: {
            senderAddress: "",
            pickupLat: 0,
            pickupLng: 0,
            senderName: "",
            senderPhone: "",
            dropoffAddress: "",
            dropoffLat: 0,
            dropoffLng: 0,
            receiverName: "",
            receiverPhone: "",
            serviceType: "STANDARD",
            packageDetails: "",
            weightKg: 10,
            vehicleType: "MOTORBIKE",
            paymentMethod: "CASH",
            isBulky: false,
            isDoorDelivery: true,
            promotionCode: "",
            note: "",
            codAmount: 0,
        },
    })

    const { watch, setValue } = form

    const selectedVehicle = watch("vehicleType")
    const weightWatch = watch("weightKg")
    const pickupLat = watch("pickupLat")
    const pickupLng = watch("pickupLng")
    const dropoffLat = watch("dropoffLat")
    const dropoffLng = watch("dropoffLng")

    const serviceTypeWatch = watch("serviceType")
    const isBulkyWatch = watch("isBulky")
    const isDoorDeliveryWatch = watch("isDoorDelivery")
    const promotionCodeWatch = watch("promotionCode")

    const hasCoordinates = !!(pickupLat && pickupLng && dropoffLat && dropoffLng)

    // Dùng profile "car" cho Vietmap để luôn lấy được quãng đường và thời gian chuẩn xác
    const vietmapVehicle = selectedVehicle === "MOTORBIKE" ? "bike" : "car"

    // ==================== TÍNH PHÍ QUA VIETMAP ROUTING ====================
    const { data: routeData, isLoading: isCalculating } = useQuery({
        queryKey: ["vietmap-route", pickupLat, pickupLng, dropoffLat, dropoffLng, vietmapVehicle],
        queryFn: () => getRoute(
            { lat: pickupLat, lng: pickupLng },
            { lat: dropoffLat, lng: dropoffLng },
            vietmapVehicle
        ),
        enabled: hasCoordinates,
        staleTime: 1000 * 60 * 5,
    })

    // ==================== TÍNH TOÁN CHI PHÍ & THỜI GIAN ====================
    const calculationResult = useMemo<CalculationResult>(() => {
        if (!hasCoordinates || !routeData) {
            return { distanceKm: 0, vietmapMinutes: 0, processingMinutes: 0, estimatedMinutes: 0, fee: 0 }
        }

        const distanceKm = routeData.distanceKm

        const routeAny = routeData as any
        const rawDurationSec = routeAny.duration || routeAny.durationSeconds || routeAny.time || 0
        const vietmapMinutes = rawDurationSec > 0
            ? Math.round(rawDurationSec / 60)
            : Math.round((distanceKm / (selectedVehicle === "MOTORBIKE" ? 30 : 35)) * 60)

        const processingMinutes = selectedVehicle === "TRUCK" ? 45 : selectedVehicle === "VAN" ? 30 : 15
        let estimatedMinutes = processingMinutes + vietmapMinutes

        if (serviceTypeWatch === "FAST") {
            estimatedMinutes = Math.round(estimatedMinutes / 1.5)
        }

        const config = PRICING[selectedVehicle as keyof typeof PRICING] || PRICING.MOTORBIKE
        let fee = config.base + distanceKm * config.perKm

        const currentWeight = Number(weightWatch) || 1
        if (currentWeight > config.extraWeightLimit) {
            fee += (currentWeight - config.extraWeightLimit) * config.extraWeightFee
        }

        if (isBulkyWatch) {
            fee += selectedVehicle === "TRUCK" ? BULKY_FEE * 1.5 : BULKY_FEE
        }

        if (isDoorDeliveryWatch) {
            fee += selectedVehicle === "TRUCK" ? DOOR_DELIVERY_FEE * 2 : DOOR_DELIVERY_FEE
        }

        if (serviceTypeWatch === "FAST") {
            fee = fee * EXPRESS_MULTIPLIER
        }

        if (promotionCodeWatch?.toUpperCase() === "SHIP50") {
            fee = fee - 50000
        } else if (promotionCodeWatch?.toUpperCase() === "FREESHIP") {
            fee = 0
        }

        fee = Math.max(0, Math.round(fee))

        return {
            distanceKm,
            vietmapMinutes,
            processingMinutes,
            estimatedMinutes,
            fee
        }
    }, [
        hasCoordinates,
        routeData,
        selectedVehicle,
        weightWatch,
        serviceTypeWatch,
        isBulkyWatch,
        isDoorDeliveryWatch,
        promotionCodeWatch
    ])

    // ==================== MUTATION (TẠO ĐƠN HÀNG) ====================
    const createOrderMutation = useMutation({
        mutationFn: (data: CreateOrderSchemaType) =>
            orderApi.createOrder({
                ...data,
                distanceKm: calculationResult.distanceKm,
                shippingFee: calculationResult.fee,
            }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (response: any) => {
            const trackingCode = response?.data?.trackingCode || response?.trackingCode || "ST-XXXX";
            toast.success(
                `Tạo đơn hàng ${trackingCode} thành công! Hệ thống đang tìm tài xế gần nhất.`
            )
            navigate("/customer/dashboard")
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err?.message || "Không thể tạo đơn hàng. Vui lòng thử lại!";
            toast.error(errorMessage)
        },
    })

    // ==================== SUBMIT & VALIDATION ====================
    const onSubmit = form.handleSubmit((data) => {
        // 1. Validate: Không được để địa chỉ lấy hàng và nhận hàng trùng nhau
        const isSameLatLon = data.pickupLat === data.dropoffLat && data.pickupLng === data.dropoffLng
        const isSameAddressString = data.senderAddress.trim().toLowerCase() === data.dropoffAddress.trim().toLowerCase()

        if (isSameLatLon || isSameAddressString) {
            toast.error("Địa chỉ lấy hàng và địa chỉ giao hàng không được trùng nhau!")
            return
        }

        // 2. Validate: Chỉ phục vụ trong khu vực Thành phố Hồ Chí Minh
        const isPickupInHCMC = isInsideHCMC(data.pickupLat, data.pickupLng) || data.senderAddress.toLowerCase().includes("hồ chí minh") || data.senderAddress.toLowerCase().includes("tp.hcm") || data.senderAddress.toLowerCase().includes("hcm")
        const isDropoffInHCMC = isInsideHCMC(data.dropoffLat, data.dropoffLng) || data.dropoffAddress.toLowerCase().includes("hồ chí minh") || data.dropoffAddress.toLowerCase().includes("tp.hcm") || data.dropoffAddress.toLowerCase().includes("hcm")

        if (!isPickupInHCMC || !isDropoffInHCMC) {
            toast.error("Hệ thống chỉ hỗ trợ vận chuyển trong khu vực Thành phố Hồ Chí Minh!")
            return
        }

        createOrderMutation.mutate(data)
    })

    const goBack = () => navigate("/customer/dashboard")

    const selectAddressFromBook = (
        type: "sender" | "receiver",
        addrId: string | number
    ) => {
        const found = addresses?.find((a) => String(a.id) === String(addrId))
        if (!found) return

        if (type === "sender") {
            setValue("senderAddress", found.fullAddress)
            setValue("senderName", found.contactName)
            setValue("senderPhone", found.contactPhone)
            if (found.lat) setValue("pickupLat", found.lat)
            if (found.lng) setValue("pickupLng", found.lng)
        } else {
            setValue("dropoffAddress", found.fullAddress)
            setValue("receiverName", found.contactName)
            setValue("receiverPhone", found.contactPhone)
            if (found.lat) setValue("dropoffLat", found.lat)
            if (found.lng) setValue("dropoffLng", found.lng)
        }
    }

    return {
        form,
        onSubmit,
        addresses,
        selectedVehicle,
        weightWatch,
        calculationResult,
        isCalculating,
        goBack,
        selectAddressFromBook,
        isCreating: createOrderMutation.isPending,
        canSubmit: calculationResult.fee > 0 && !createOrderMutation.isPending && !isCalculating,
    }
} 