import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction, Home } from "lucide-react";
import { useNavigate } from "react-router";

interface UnderDevelopmentProps {
    title?: string;
    description?: string;
}

export default function UnderDevelopment({
    title = "Chức năng đang phát triển",
    description = "Tính năng này đang được đội ngũ kỹ thuật của ShipTrack xây dựng và cập nhật trong thời gian sớm nhất. Vui lòng quay lại sau!",
}: UnderDevelopmentProps) {
    const navigate = useNavigate();

    return (
        <div className="min-h-[70vh] w-full flex items-center justify-center p-4 text-foreground relative overflow-hidden">
            {/* Nền hiệu ứng đốm mờ Brand Shiptrack */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/30 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-md w-full text-center space-y-6 bg-card border border-border/80 p-8 sm:p-10 rounded-3xl shadow-lg backdrop-blur-sm">
                {/* Visual Icon Công trình / Đang phát triển */}
                <div className="relative flex justify-center items-center py-2 select-none">
                    <div className="relative flex items-center justify-center">
                        {/* Vòng tròn hiệu ứng phát sáng */}
                        <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md animate-pulse" />
                        <div className="relative p-5 rounded-2xl bg-accent text-primary border border-primary/20 shadow-md">
                            <Construction className="h-12 w-12 text-primary animate-bounce" />
                        </div>
                    </div>
                </div>

                {/* Thông điệp chính */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                        {title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Các nút điều hướng */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto gap-2 border-border hover:bg-accent hover:text-accent-foreground font-semibold rounded-xl"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Quay lại
                    </Button>

                    <Button
                        size="lg"
                        className="w-full sm:w-auto gap-2 text-white animate-btn-gradient btn-shine font-semibold rounded-xl border-none"
                        onClick={() => navigate("/")}
                    >
                        <Home className="h-4 w-4" />
                        Về Trang chủ
                    </Button>
                </div>
            </div>
        </div>
    );
}