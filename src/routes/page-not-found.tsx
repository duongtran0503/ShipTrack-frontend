import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion, Home } from "lucide-react";
import { useNavigate } from "react-router";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 text-foreground">
            <div className="max-w-md w-full text-center space-y-6">
                {/* Icon & Con số 404 Nổi bật */}
                <div className="relative flex justify-center items-center">
                    <span className="text-9xl font-black text-muted-foreground/15 select-none">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-4 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm animate-bounce">
                            <FileQuestion className="h-12 w-12" />
                        </div>
                    </div>
                </div>

                {/* Nội dung thông báo */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Không tìm thấy trang
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base">
                        Rất tiếc, trang bạn đang truy cập không tồn tại hoặc đã được di
                        chuyển sang đường dẫn khác.
                    </p>
                </div>

                {/* Các nút hành động */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <Button
                        variant="outline"
                        className="w-full sm:w-auto gap-2"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Quay lại
                    </Button>

                    <Button
                        className="w-full sm:w-auto gap-2"
                        onClick={() => navigate("/dashboard")}
                    >
                        <Home className="h-4 w-4" />
                        Về Trang chủ
                    </Button>
                </div>
            </div>
        </div>
    );
}