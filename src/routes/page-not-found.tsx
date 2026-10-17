import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, PackageX } from "lucide-react";
import { useNavigate } from "react-router";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 text-foreground relative overflow-hidden">
            {/* Nền hiệu ứng đốm mờ Brand Shiptrack */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/40 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-lg w-full text-center space-y-8 bg-card border border-border/80 p-8 sm:p-12 rounded-3xl shadow-xl backdrop-blur-sm">
                {/* Visual 404 x Logo Brand Shiptrack */}
                <div className="relative flex justify-center items-center py-2 select-none">
                    {/* Con số 404 lớn mang màu sắc thương hiệu */}
                    <span className="text-8xl sm:text-9xl font-black text-muted/80 tracking-widest">
                        404
                    </span>

                    {/* Icon gói hàng/vận chuyển bị thất lạc ở trung tâm */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-5 rounded-2xl bg-accent text-primary border border-primary/20 shadow-lg animate-bounce">
                            <PackageX className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                        </div>
                    </div>
                </div>

                {/* Thông điệp chính */}
                <div className="space-y-3">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                        Tuyến đường không tồn tại!
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                        Đơn hàng hoặc liên kết bạn đang tìm kiếm đã bị thất lạc, chuyển hướng hoặc chưa từng xuất hiện trên hệ thống{" "}
                        <span className="font-bold text-primary">ShipTrack</span>.
                    </p>
                </div>

                {/* Nút thao tác tối ưu Brand Utility */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    {/* Nút quay lại style Outline */}
                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto gap-2 border-border hover:bg-accent hover:text-accent-foreground font-semibold rounded-xl"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Quay lại
                    </Button>

                    {/* Nút về trang chủ sở hữu hiệu ứng Gradient & Shine lướt sáng của Shiptrack */}
                    <Button
                        size="lg"
                        className="w-full sm:w-auto gap-2 text-white animate-btn-gradient btn-shine font-semibold rounded-xl border-none"
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