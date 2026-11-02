
import type { UseFormReturn } from "react-hook-form";

export interface DriverProfileData {
    id: string | number;
    fullName: string;
    email: string;
    phone: string;
    avatarUrl: string;
    joinedDate: string;
    totalTrips: number;
    averageRating: number;
}

// Định nghĩa type cho form data
export interface ProfileFormData {
    fullName: string;
    email: string;
    phone: string;
}

// Type cho form object trả về từ useForm
export type ProfileFormInstance = UseFormReturn<ProfileFormData>;