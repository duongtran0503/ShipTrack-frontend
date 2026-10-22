import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
    mockAddressService,
    type CustomerAddress,
} from "@/demo_data_services/mockAddressService"
import {
    addressSchema,
    type AddressSchemaType,
} from "@/lib/schemas/address"

const DEFAULT_VALUES: AddressSchemaType = {
    label: "Nhà riêng",
    contactName: "",
    contactPhone: "",
    fullAddress: "",
    isDefault: false,
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
        queryFn: mockAddressService.getAddresses,
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
                return mockAddressService.updateAddress(editingAddress.id, data)
            }
            return mockAddressService.addAddress(data)
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
        onError: (err: Error) => {
            toast.error(err.message || "Xảy ra lỗi khi lưu địa chỉ!")
        },
    })

    const deleteMutation = useMutation({
        mutationFn: mockAddressService.deleteAddress,
        onSuccess: () => {
            toast.success("Đã xóa địa chỉ!")
            queryClient.invalidateQueries({ queryKey: ["customer_addresses"] })
        },
        onError: (err: Error) => {
            toast.error(err.message || "Xóa địa chỉ thất bại!")
        },
    })

    const setDefaultMutation = useMutation({
        mutationFn: mockAddressService.setDefaultAddress,
        onSuccess: () => {
            toast.success("Đã cập nhật địa chỉ mặc định!")
            queryClient.invalidateQueries({ queryKey: ["customer_addresses"] })
        },
        onError: (err: Error) => {
            toast.error(err.message || "Cập nhật mặc định thất bại!")
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

    const onDelete = (id: string) => deleteMutation.mutate(id)
    const onSetDefault = (id: string) => setDefaultMutation.mutate(id)

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