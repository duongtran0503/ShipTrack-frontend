import { mockAuthService } from "@/demo_data_services/mockAuthService";
import { registerSchema, type RegisterSchemaType } from "@/lib/schemas/auth/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useRegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            role: "CUSTOMER",
            // BẮT BUỘC: Khởi tạo giá trị mặc định là chuỗi rỗng để khớp với z.string()
            licenseNumber: "",
            vehicleType: "",
            licensePlate: "",
            acceptTerms: false as unknown as true, // Ép kiểu khởi tạo cho checkbox nếu cần
        },
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const selectedRole = watch("role");

    const registerMutation = useMutation({
        mutationFn: (data: RegisterSchemaType) => mockAuthService.register(data),
        onSuccess: (_, variables) => {
            if (variables.role === "DRIVER") {
                toast.success("Đã đăng ký tài khoản Tài xế vào Mock Storage! Đang chờ Admin duyệt.");
            } else {
                toast.success("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
            }
            navigate("/login");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Đăng ký thất bại!");
        },
    });

    const onSubmit = (data: RegisterSchemaType) => {
        registerMutation.mutate(data);
    };

    return {
        control,
        handleSubmit,
        onSubmit,
        errors,
        isPending: registerMutation.isPending,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        selectedRole,
        setValue,
    };
};