import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
    addressSchema,
    type AddressSchemaType,
} from "@/lib/schemas/address"
import { addressApi } from "@/services/user/address-api"
import type { CustomerAddress } from "@/services/user/type"

const DEFAULT_VALUES: AddressSchemaType = {
    label: "Nhà riêng",
    contactName: "",
    contactPhone: "",
    fullAddress: "",
    isDefault: false,
    lat: 0,
    lng: 0,
}

export function useAddresses() {
    const queryClient = useQueryClient()

    // ==================== STATE ====================
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingAddress, setEditingAddress] = useState<CustomerAddress | null>(
        null
    )

    // ==================== QUERY ====================
    const { data: addresses, isLoading } = useQuery({
        queryKey: ["customer_addresses"],
        queryFn: addressApi.getAddresses,
    })

    // ==================== FORM ====================
    const form = useForm<AddressSchemaType>({
        resolver: zodResolver(addressSchema),
        defaultValues: DEFAULT_VALUES,
    })

    const { reset } = form

    // ==================== MUTATIONS ====================
    const saveMutation = useMutation({
        mutationFn: (data: AddressSchemaType) => {
            if (editingAddress) {
                return addressApi.updateAddress(editingAddress.id, data)
            }
            return addressApi.addAddress(data)
        },
        onSuccess: () => {
            toast.success(
                editingAddress
                    ? "Cập nhật địa chỉ thành công!"
                    : "Thêm địa chỉ mới thành công!"
            )
            queryClient.invalidateQueries({ queryKey: ["customer_addresses"] })
            closeModal()
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err?.message || "Xảy ra lỗi khi lưu địa chỉ!"
            toast.error(errorMessage)
        },
    })

    const deleteMutation = useMutation({
        mutationFn: (id: string | number) => addressApi.deleteAddress(id),
        onSuccess: () => {
            toast.success("Đã xóa địa chỉ!")
            queryClient.invalidateQueries({ queryKey: ["customer_addresses"] })
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err?.message || "Xóa địa chỉ thất bại!"
            toast.error(errorMessage)
        },
    })

    const setDefaultMutation = useMutation({
        mutationFn: (addr: CustomerAddress) => addressApi.setDefaultAddress(addr),
        onSuccess: () => {
            toast.success("Đã cập nhật địa chỉ mặc định!")
            queryClient.invalidateQueries({ queryKey: ["customer_addresses"] })
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err?.message || "Cập nhật mặc định thất bại!"
            toast.error(errorMessage)
        },
    })

    // ==================== HANDLERS ====================
    const openCreateModal = () => {
        setEditingAddress(null)
        reset(DEFAULT_VALUES)
        setIsModalOpen(true)
    }

    const openEditModal = (addr: CustomerAddress) => {
        setEditingAddress(addr)
        reset({
            label: addr.label,
            contactName: addr.contactName,
            contactPhone: addr.contactPhone,
            fullAddress: addr.fullAddress,
            isDefault: addr.isDefault,
            lat: addr.lat || 0,
            lng: addr.lng || 0,
        })
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingAddress(null)
    }

    const onSubmit = form.handleSubmit((data) => {
        saveMutation.mutate(data)
    })

    const onDelete = (id: string | number) => deleteMutation.mutate(id)

    // Nhận trực tiếp đối tượng CustomerAddress từ UI để gọi API PUT đặt mặc định
    const onSetDefault = (addr: CustomerAddress) => setDefaultMutation.mutate(addr)

    // ==================== RETURN ====================
    return {
        // Data
        addresses,
        isLoading,

        // Modal state
        isModalOpen,
        editingAddress,
        openCreateModal,
        openEditModal,
        closeModal,

        // Form
        form,
        onSubmit,

        // Actions
        onDelete,
        onSetDefault,

        // Loading
        isSaving: saveMutation.isPending,
        isDeleting: deleteMutation.isPending,
        isSettingDefault: setDefaultMutation.isPending,
    }
}