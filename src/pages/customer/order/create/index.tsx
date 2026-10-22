import { AddressSection } from "@/pages/customer/order/create/components/address-section"
import { CreateOrderHeader } from "@/pages/customer/order/create/components/create-order-header"
import { OrderFeeSummary } from "@/pages/customer/order/create/components/order-fee-summary"
import { PackageInfoSection } from "@/pages/customer/order/create/components/package-info-section"
import { useCreateOrder } from "@/pages/customer/order/create/hooks/use-create-order"


export default function CreateOrderPage() {
    const {
        form,
        onSubmit,
        addresses,
        weightWatch,
        calculationResult,
        goBack,
        selectAddressFromBook,
        isCreating,
        canSubmit,
    } = useCreateOrder()

    return (
        <div className="bg-muted/30 text-foreground">
            <div className=" mx-auto space-y-6">
                <CreateOrderHeader onBack={goBack} />

                <form
                    onSubmit={onSubmit}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    <div className="lg:col-span-2 space-y-6">
                        {/* Bước 1 */}
                        <AddressSection
                            type="sender"
                            stepNumber={1}
                            title="Điểm lấy hàng (Người gửi)"
                            form={form}
                            addresses={addresses}
                            onSelectAddress={(id) => selectAddressFromBook("sender", id)}
                        />

                        {/* Bước 2 */}
                        <AddressSection
                            type="receiver"
                            stepNumber={2}
                            title="Điểm giao hàng (Người nhận)"
                            form={form}
                            addresses={addresses}
                            onSelectAddress={(id) => selectAddressFromBook("receiver", id)}
                        />

                        {/* Bước 3 */}
                        <PackageInfoSection form={form} />
                    </div>

                    <div>
                        <OrderFeeSummary
                            calculationResult={calculationResult}
                            weight={weightWatch}
                            isCreating={isCreating}
                            canSubmit={canSubmit}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}