import { z } from "zod";

export const driverRatingSchema = z.object({
    ratingStars: z
        .number()
        .min(1, "Vui lòng chọn số sao đánh giá (từ 1 đến 5 sao)")
        .max(5),
    comment: z.string().max(500, "Nhận xét không được vượt quá 500 ký tự").optional(),
    attitudeRating: z.number().min(1).max(5),
    speedRating: z.number().min(1).max(5),
    packagingRating: z.number().min(1).max(5),
});

export type DriverRatingSchemaType = z.infer<typeof driverRatingSchema>;