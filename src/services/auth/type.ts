import type { RegisterSchemaType } from "@/lib/schemas/auth/register";

export interface MockUser {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: "SUPER_ADMIN" | "DRIVER" | "CUSTOMER";
    licenseNumber?: string;
    vehicleType?: string;
    licensePlate?: string;
}

export interface LoginResponse {
    user_id: number;
    name: string;
    email: string;
    phone: string;
    license_plate: string;
    role: "admin" | "driver" | "customer" | string;
    balance: number;
    access_token: string;
    refresh_token: string;
    token_type: string;
}

export type { RegisterSchemaType };
