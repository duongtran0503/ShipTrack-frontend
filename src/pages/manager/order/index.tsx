import { OrderTable } from "@/pages/manager/order/components/data-table-order";
import { CancelOrderDialog } from "@/pages/manager/order/components/data-table-order/cancel-order-dialog";
import { useAdminOrders } from "./hooks/use-admin-orders";

export default function AdminOrdersPage() {
    const {
        orders,
        goToOrderDetail,
        isCancelModalOpen,
        setIsCancelModalOpen,
        cancelReason,
        setCancelReason,
        handleOpenCancelModal,
        handleConfirmCancelOrder,
    } = useAdminOrders();

    return (
        <div className="w-full space-y-6 pb-12">
            <OrderTable
                orders={orders}
                onView={(order) => goToOrderDetail(order.id)}
                onCancel={(order) => handleOpenCancelModal(order.id)}
            />

            <CancelOrderDialog
                isOpen={isCancelModalOpen}
                onOpenChange={setIsCancelModalOpen}
                reason={cancelReason}
                setReason={setCancelReason}
                onConfirm={handleConfirmCancelOrder}
            />
        </div>
    );
}