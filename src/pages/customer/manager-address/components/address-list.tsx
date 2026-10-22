import type { CustomerAddress } from "@/demo_data_services/mockAddressService"
import { AddressCard } from "./address-card"
import { AddressEmptyState } from "./address-empty-state"

interface Props {
    addresses: CustomerAddress[] | undefined
    isLoading: boolean
    onEdit: (addr: CustomerAddress) => void
    onDelete: (id: string) => void
    onSetDefault: (id: string) => void
    onCreate: () => void
}

export function AddressList({
    addresses,
    isLoading,
    onEdit,
    onDelete,
    onSetDefault,
    onCreate,
}: Props) {
    if (isLoading) {
        return (
            <div className="py-12 text-center text-sm text-muted-foreground">
                Đang tải danh sách địa chỉ...
            </div>
        )
    }

    if (!addresses || addresses.length === 0) {
        return <AddressEmptyState onCreate={onCreate} />
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
                <AddressCard
                    key={addr.id}
                    address={addr}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onSetDefault={onSetDefault}
                />
            ))}
        </div>
    )
}