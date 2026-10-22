import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"

import { mockAddressService } from "@/demo_data_services/mockAddressService"
import { mockOrderService } from "@/demo_data_services/mockOrderService"
import { createOrderSchema, type CreateOrderSchemaType } from "@/lib/schemas/order"
import { calculateShippingFee } from "@/pages/customer/order/create/helpers/order-calculation"


export function useCreateOrder() {
    const navigate = useNavigate()

    // ==================== QUERY ====================
    const { data: addresses } = useQuery({
        queryKey: ["customer_addresses"],
        queryFn: mockAddressService.getAddresses,
    })

    // ==================== FORM ====================
    const form = useForm<CreateOrderSchemaType>({
        resolver: zodResolver(createOrderSchema),
        defaultValues: {
            senderAddress: "",
            senderName: "",
            senderPhone: "",
            receiverAddress: "",
            receiverName: "",
            receiverPhone: "",
            packageName: "",
            weightKg: 1,
            vehicleType: "MOTORBIKE",
            note: "",
            codAmount: 0,
        },
    })

    const {
        watch,
        setValue,
    } = form

    // Watch values để tính phí realtime
    const selectedVehicle = watch("vehicleType")
    const senderAddressWatch = watch("senderAddress")
    const receiverAddressWatch = watch("receiverAddress")
    const weightWatch = watch("weightKg")

    // ==================== CALCULATION ====================
    const calculationResult = useMemo(
        () =>
            calculateShippingFee({
                senderAddress: senderAddressWatch,
                receiverAddress: receiverAddressWatch,
                vehicleType: selectedVehicle,
                weightKg: weightWatch || 1,
            }),
        [senderAddressWatch, receiverAddressWatch, selectedVehicle, weightWatch]
    )

    // ==================== MUTATION ====================
    const createOrderMutation = useMutation({
        mutationFn: (data: CreateOrderSchemaType) =>
            mockOrderService.createOrder({
                ...data,
                distanceKm: calculationResult.distanceKm,
                shippingFee: calculationResult.fee,
            }),
        onSuccess: (newOrder) => {
            toast.success(
                `Tạo đơn hàng ${newOrder.trackingCode} thành công! Hệ thống đang tìm tài xế gần nhất.`
            )
            navigate("/customer/dashboard")
        },
        onError: (err: Error) => {
            toast.error(err.message || "Không thể tạo đơn hàng. Vui lòng thử lại!")
        },
    })

    // ==================== HANDLERS ====================
    const onSubmit = form.handleSubmit((data) => {
        createOrderMutation.mutate(data)
    })

    const goBack = () => navigate("/customer/dashboard")

    const selectAddressFromBook = (
        type: "sender" | "receiver",
        addrId: string
    ) => {
        const found = addresses?.find((a) => a.id === addrId)
        if (!found) return

        if (type === "sender") {
            setValue("senderAddress", found.fullAddress)
            setValue("senderName", found.contactName)
            setValue("senderPhone", found.contactPhone)
        } else {
            setValue("receiverAddress", found.fullAddress)
            setValue("receiverName", found.contactName)
            setValue("receiverPhone", found.contactPhone)
        }
    }

    // ==================== RETURN ====================
    return {
        // Form
        form,
        onSubmit,

        // Data
        addresses,
        selectedVehicle,
        weightWatch,
        calculationResult,

        // Actions
        goBack,
        selectAddressFromBook,

        // Loading
        isCreating: createOrderMutation.isPending,
        canSubmit: calculationResult.fee > 0 && !createOrderMutation.isPending,
    }
}