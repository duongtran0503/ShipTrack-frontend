import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageSquare, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

// Import Shadcn UI Components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { mockOrderService, type OrderItem } from "@/demo_data_services/mockOrderService";
import { driverRatingSchema, type DriverRatingSchemaType } from "@/lib/schemas/order/ratingSchema";
;

interface Props {
    order: OrderItem;
    triggerBtn?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export default function DriverRatingDialog({
    order,
    triggerBtn,
    open: externalOpen,
    onOpenChange: externalOnOpenChange,
}: Props) {
    const queryClient = useQueryClient();
    const [internalOpen, setInternalOpen] = useState(false);
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);

    const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
    const setIsOpen = externalOnOpenChange || setInternalOpen;

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<DriverRatingSchemaType>({
        resolver: zodResolver(driverRatingSchema),
        defaultValues: {
            ratingStars: 5,
            comment: "",
            attitudeRating: 5,
            speedRating: 5,
            packagingRating: 5,
        },
    });

    const selectedStars = watch("ratingStars");

    // Mutation gửi đánh giá
    const ratingMutation = useMutation({
        mutationFn: (data: DriverRatingSchemaType) =>
            mockOrderService.submitDriverRating({
                orderId: order.id,
                ratingStars: data.ratingStars,
                comment: data.comment,
                ratingCategories: {
                    attitudeRating: data.attitudeRating,
                    speedRating: data.speedRating,
                    packagingRating: data.packagingRating,
                },
            }),
        onSuccess: (res) => {
            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["customer_recent_orders"] });
            queryClient.invalidateQueries({ queryKey: ["customer_order_detail", order.id] });
            setIsOpen(false);
            reset();
        },
        onError: () => {
            toast.error("Gửi đánh giá thất bại. Vui lòng thử lại!");
        },
    });

    const onSubmit = (data: DriverRatingSchemaType) => {
        ratingMutation.mutate(data);
    };

    // Nhãn cảm xúc theo số sao chọn
    const getRatingLabel = (stars: number) => {
        switch (stars) {
            case 1:
                return "Rất không hài lòng 😞";
            case 2:
                return "Chưa hài lòng 😐";
            case 3:
                return "Bình thường 🙂";
            case 4:
                return "Hài lòng 😊";
            case 5:
                return "Rất tuyệt vời! 🌟";
            default:
                return "";
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {triggerBtn && <DialogTrigger >{triggerBtn}</DialogTrigger>}

            <DialogContent className="rounded-3xl max-w-lg border-border/80 shadow-2xl p-6">
                <DialogHeader className="text-center space-y-2">
                    <Badge className="w-fit mx-auto bg-amber-500/10 text-amber-600 border-amber-500/20 font-bold px-3 py-1 rounded-full">
                        <Sparkles className="size-3.5 mr-1" /> Đánh Giá Dịch Vụ
                    </Badge>
                    <DialogTitle className="text-xl font-black text-foreground">
                        Đánh giá Tài xế giao hàng
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                        Đơn hàng <strong className="text-foreground font-mono">{order.trackingCode}</strong> đã hoàn thành. Hãy chia sẻ trải nghiệm của bạn!
                    </DialogDescription>
                </DialogHeader>

                {/* Thông tin tài xế */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/40 border border-border/60">
                    <Avatar className="size-11 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary text-white font-black">
                            {order.driverName ? order.driverName.charAt(0) : "T"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-foreground">
                            {order.driverName || "Nguyễn Văn A (Tài xế)"}
                        </h4>
                        <p className="text-[11px] text-muted-foreground">
                            Kiện hàng: <span className="font-semibold text-foreground">{order.packageName}</span>
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-1">
                    {/* CHỌN SỐ SAO (1-5 SAO INTERACTIVE) */}
                    <div className="space-y-2 text-center">
                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            Chất lượng tổng thể
                        </Label>

                        <Controller
                            name="ratingStars"
                            control={control}
                            render={({ field }) => (
                                <Field data-invalid={!!errors.ratingStars}>
                                    <div className="flex items-center justify-center gap-2 py-2">
                                        {[1, 2, 3, 4, 5].map((star) => {
                                            const isFilled =
                                                (hoveredStar !== null ? hoveredStar : field.value) >= star;
                                            return (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => field.onChange(star)}
                                                    onMouseEnter={() => setHoveredStar(star)}
                                                    onMouseLeave={() => setHoveredStar(null)}
                                                    className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                                                >
                                                    <Star
                                                        className={`size-8 transition-colors ${isFilled
                                                            ? "fill-amber-400 text-amber-400 drop-shadow-md"
                                                            : "fill-muted text-muted-foreground/40"
                                                            }`}
                                                    />
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <p className="text-xs font-bold text-primary min-h-[20px] transition-all">
                                        {getRatingLabel(hoveredStar !== null ? hoveredStar : selectedStars)}
                                    </p>

                                    {errors.ratingStars && (
                                        <FieldError className="text-xs text-destructive text-center">
                                            {errors.ratingStars.message}
                                        </FieldError>
                                    )}
                                </Field>
                            )}
                        />
                    </div>

                    <Separator />

                    {/* NHẬN XÉT CHI TIẾT */}
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold flex items-center gap-1.5">
                            <MessageSquare className="size-3.5 text-primary" />
                            <span>Nhận xét chuyến đi (Tùy chọn)</span>
                        </Label>

                        <Controller
                            name="comment"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    placeholder="Ví dụ: Tài xế thân thiện, giao hàng nhanh chóng, cẩn thận..."
                                    className="rounded-2xl bg-muted/30 border-border/80 text-xs resize-none min-h-[90px]"
                                />
                            )}
                        />
                    </div>

                    {/* GỢI Ý ĐÁNH GIÁ NHANH */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {[
                            "Giao hàng siêu tốc ⚡",
                            "Thái độ thân thiện 😊",
                            "Bảo quản hàng tốt 📦",
                            "Đúng hẹn ⏰",
                        ].map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => {
                                    const current = watch("comment") || "";
                                    setValue("comment", current ? `${current}, ${tag}` : tag);
                                }}
                                className="text-[11px] font-semibold bg-muted/60 hover:bg-accent text-muted-foreground hover:text-foreground px-3 py-1 rounded-full border border-border/60 transition-colors cursor-pointer"
                            >
                                + {tag}
                            </button>
                        ))}
                    </div>

                    <DialogFooter className="gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            className="rounded-xl font-bold text-xs"
                        >
                            Để sau
                        </Button>

                        <Button
                            type="submit"
                            disabled={ratingMutation.isPending}
                            className="animate-btn-gradient btn-shine text-white font-bold rounded-xl border-none shadow-md cursor-pointer text-xs px-6"
                        >
                            {ratingMutation.isPending ? "Đang gửi..." : "Gửi Đánh Giá"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}