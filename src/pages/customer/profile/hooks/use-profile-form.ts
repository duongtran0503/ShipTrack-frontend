import { profileSchema, type ProfileSchemaType } from "@/lib/schemas/user/profile";
import { userApi } from "@/services/user/user-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useProfileForm = () => {
    const queryClient = useQueryClient();

    const { data: responseData, isLoading } = useQuery({
        queryKey: ["user_profile"],
        queryFn: userApi.getProfile,
    });

    const profile = responseData?.data;

    const form = useForm<ProfileSchemaType>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            licenseNumber: "",
            vehicleType: "",
            licensePlate: "",
        },
    });

    // Map dữ liệu từ API (name) sang form (fullName)
    useEffect(() => {
        if (profile) {
            form.reset({
                fullName: profile.name || "",
                email: profile.email || "",
                phone: profile.phone || "",
                licensePlate: profile.licensePlate || "",
                licenseNumber: "",
                vehicleType: "",
            });
        }
    }, [profile, form]);

    const updateMutation = useMutation({
        mutationFn: (data: ProfileSchemaType) => userApi.updateProfile(data),
        onSuccess: (res) => {
            toast.success(res?.message || "Cập nhật thông tin thành công!");
            queryClient.invalidateQueries({ queryKey: ["user_profile"] });
        },
        onError: (err: any) => {
            const msg = err?.response?.data?.message || err?.message || "Cập nhật thất bại!";
            toast.error(msg);
        },
    });

    const onSubmit = form.handleSubmit((data) => {
        updateMutation.mutate(data);
    });

    return {
        form,
        isLoading,
        isUpdating: updateMutation.isPending,
        onSubmit,
    };
};