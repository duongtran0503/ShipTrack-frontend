import logo from "@/assets/logo.png";

export default function LogoBrand() {
    return <div className="flex items-center gap-2 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white">
            <img src={logo} className="w-8 h-8 object-contain" alt="Logo" />
        </div>

        {/* Sử dụng class animation vừa tạo, bỏ hoàn toàn style inline */}
        <span className="text-2xl font-black tracking-tight animate-shiptrack-text">
            ShipTrack
        </span>
    </div>
}