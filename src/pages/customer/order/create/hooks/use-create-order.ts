import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"

import { useVietmap } from "@/lib/hooks/use-vietmap"
import { createOrderSchema, type CreateOrderSchemaType } from "@/lib/schemas/order"
import { orderApi } from "@/services/order/order-api"
import { addressApi } from "@/services/user/address-api"

// ==================== CẤU HÌNH GIÁ & PHỤ PHÍ ====================
const PRICING = {
    MOTORBIKE: { base: 20000, perKm: 5000, extraWeightLimit: 5, extraWeightFee: 3000 },
    VAN: { base: 50000, perKm: 10000, extraWeightLimit: 20, extraWeightFee: 5000 },
    TRUCK: { base: 150000, perKm: 25000, extraWeightLimit: 100, extraWeightFee: 10000 },
}

const BULKY_FEE = 30000         // Phụ phí hàng cồng kềnh
const DOOR_DELIVERY_FEE = 15000 // Phụ phí giao tận cửa
const EXPRESS_MULTIPLIER = 1.5  // Hệ số nhân cho dịch vụ Hỏa tốc (Express)

export interface CalculationResult {
    distanceKm: number
    estimatedMinutes: number
    fee: number
}

export function useCreateOrder() {
    const navigate = useNavigate()
    const { getRoute } = useVietmap()

    // ==================== QUERY ĐỊA CHỈ (DÙNG API THẬT) ====================
    const { data: addresses } = useQuery({
        queryKey: ["customer_addresses"],
        queryFn: addressApi.getAddresses, // 👈 Gọi API lấy danh sách địa chỉ thật
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
            weightKg: 1,
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

    // Watch values để tính phí realtime
    // eslint-disable-next-line react-hooks/incompatible-library
    const selectedVehicle = watch("vehicleType")
    const weightWatch = watch("weightKg")
    const pickupLat = watch("pickupLat")
    const pickupLng = watch("pickupLng")
    const dropoffLat = watch("dropoffLat")
    const dropoffLng = watch("dropoffLng")

    // Watch các trường ảnh hưởng đến giá
    const serviceTypeWatch = watch("serviceType")
    const isBulkyWatch = watch("isBulky")
    const isDoorDeliveryWatch = watch("isDoorDelivery")
    const promotionCodeWatch = watch("promotionCode")

    const hasCoordinates = !!(pickupLat && pickupLng && dropoffLat && dropoffLng)

    // Map loại xe của dự án sang loại xe của Vietmap
    const vietmapVehicle = selectedVehicle === "MOTORBIKE" ? "bike" : selectedVehicle === "VAN" ? "car" : "truck"

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

    // ==================== TÍNH TOÁN CHI PHÍ ====================
    const calculationResult = useMemo(() => {
        if (!hasCoordinates || !routeData) {
            return { distanceKm: 0, estimatedMinutes: 0, fee: 0 }
        }

        const distanceKm = routeData.distanceKm

        // 1. TÍNH THỜI GIAN GIAO HÀNG
        // eslint-disable-next-line no-useless-assignment
        let estimatedMinutes = 0
        if (distanceKm <= 10) {
            estimatedMinutes = Math.round(distanceKm * 60 + 120)
        } else if (distanceKm <= 50) {
            estimatedMinutes = 2 * 24 * 60
        } else if (distanceKm <= 200) {
            estimatedMinutes = 3 * 24 * 60
        } else {
            estimatedMinutes = 5 * 24 * 60
        }

        if (serviceTypeWatch === "FAST") {
            estimatedMinutes = Math.round(estimatedMinutes / 2)
        }

        // 2. LẤY CẤU HÌNH GIÁ THEO LOẠI XE
        const config = PRICING[selectedVehicle as keyof typeof PRICING] || PRICING.MOTORBIKE

        let fee = config.base + distanceKm * config.perKm

        // 3. CỘNG PHỤ PHÍ KHỐI LƯỢNG
        if ((weightWatch || 1) > config.extraWeightLimit) {
            fee += ((weightWatch || 1) - config.extraWeightLimit) * config.extraWeightFee
        }

        // 4. CỘNG PHỤ PHÍ HÀNG CỒNG KỀNH
        if (isBulkyWatch) {
            fee += BULKY_FEE
        }

        // 5. CỘNG PHỤ PHÍ GIAO TẬN CỬA
        if (isDoorDeliveryWatch) {
            fee += DOOR_DELIVERY_FEE
        }

        // 6. NHÂN HỆ SỐ NẾU LÀ GIAO NHANH (EXPRESS)
        if (serviceTypeWatch === "FAST") {
            fee = fee * EXPRESS_MULTIPLIER
        }

        // 7. GIẢM GIÁ NẾU CÓ MÃ KHUYẾN MÃI
        if (promotionCodeWatch?.toUpperCase() === "SHIP50") {
            fee = fee - 50000
        } else if (promotionCodeWatch?.toUpperCase() === "FREESHIP") {
            fee = 0
        }

        fee = Math.max(0, Math.round(fee))

        return { distanceKm, estimatedMinutes, fee }
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

    // ==================== MUTATION (DÙNG ORDER API THẬT) ====================
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

    // ==================== HANDLERS ====================
    const onSubmit = form.handleSubmit((data) => {
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

    // ==================== RETURN ====================
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