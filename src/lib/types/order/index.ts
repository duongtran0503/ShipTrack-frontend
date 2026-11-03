import type { OrderItem } from "@/services/order/type";

export type DriverOrderStatus =
    | "SEARCHING_DRIVER"
    | "ACCEPTED_TO_PICKUP"
    | "PICKED_UP"
    | "DELIVERING"
    | "COMPLETED"
    | "CANCELLED";

export interface DriverOrderItem extends OrderItem {
    acceptedAt?: string;
    driverStatusLabel?: string;
}