import { useAddresses } from "@/pages/customer/manager-address/hooks/use-addresses"
import { AddressFormModal } from "./components/address-form-modal"
import { AddressHeader } from "./components/address-header"
import { AddressList } from "./components/address-list"

export default function AddressManagementPage() {
    const {
        addresses,
        isLoading,
        isModalOpen,
        editingAddress,
        openCreateModal,
        openEditModal,
        closeModal,
        form,
        onSubmit,
        onDelete,
        onSetDefault,
        isSaving,
    } = useAddresses()

    return (
        <div className=" bg-muted/30  text-foreground">
            <div className=" mx-auto space-y-6">
                <AddressHeader onCreate={openCreateModal} />

                <AddressList
                    addresses={addresses}
                    isLoading={isLoading}
                    onEdit={openEditModal}
                    onDelete={onDelete}
                    onSetDefault={onSetDefault}
                    onCreate={openCreateModal}
                />

                <AddressFormModal
                    isOpen={isModalOpen}
                    editingAddress={editingAddress}
                    form={form}
                    onSubmit={onSubmit}
                    onClose={closeModal}
                    isSaving={isSaving}
                />
            </div>
        </div>
    )
}