import HeroBackground from "@/components/common/hero-background";
import LogoBrand from "@/components/common/logo";
import {
    ArrowRight,
    Check,
    ChevronDown,
    Clock3,
    Menu,
    Package,
    Phone,
    Route,
    Search,
    ShieldCheck,
    Truck,
    X,
    Zap,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const navItems = ["Giải pháp", "Tính năng", "Bảng giá", "Về ShipTrack"]

const benefits = [
    { icon: Zap, title: "Giao nhanh đúng hẹn", text: "Tối ưu tuyến đường, kết nối mạng lưới vận chuyển trên toàn quốc." },
    { icon: Route, title: "Quản lý tập trung", text: "Theo dõi mọi đơn hàng, trạng thái và đối soát trên một nền tảng." },
    { icon: ShieldCheck, title: "An tâm từng kiện hàng", text: "Bảo hiểm minh bạch, hỗ trợ tận tâm trong suốt hành trình." },
    { icon: Clock3, title: "Tiết kiệm thời gian", text: "Tự động hóa quy trình để đội ngũ tập trung vào điều quan trọng." },
]

const steps = [
    { number: "01", title: "Tạo đơn hàng", text: "Nhập thông tin người nhận và chọn dịch vụ phù hợp." },
    { number: "02", title: "ShipTrack lấy hàng", text: "Tài xế đến tận nơi, kiểm tra và nhận kiện hàng nhanh chóng." },
    { number: "03", title: "Theo dõi hành trình", text: "Tra cứu vận đơn theo thời gian thực, cập nhật từng chặng." },
    { number: "04", title: "Giao hàng thành công", text: "Người nhận ký nhận, bạn đối soát ngay trên hệ thống." },
]

export default function AboutPage() {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-background-primary text-shiptrack-text">
            {/* --- Header --- */}
            <header className="sticky top-0 z-50 border-b border-border/60 bg-background-primary/95 backdrop-blur-md">
                <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
                    {/* Logo Brand ShipTrack */}
                    <LogoBrand />

                    <nav className="hidden items-center gap-8 lg:flex" aria-label="Điều hướng chính">
                        {navItems.map((item, index) => (
                            <a
                                key={item}
                                href={`#${["solutions", "features", "pricing", "about"][index]}`}
                                className="group flex items-center gap-1 text-[15px] font-semibold text-shiptrack-subtitle transition-colors hover:text-shiptrack-primary-1"
                            >
                                {item}
                                {index < 3 && (
                                    <ChevronDown className="size-3.5 transition-transform group-hover:translate-y-0.5" />
                                )}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-3 sm:flex">
                        <a
                            href="#tracking"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-shiptrack-primary-1 hover:text-shiptrack-secondary"
                        >
                            <Search className="size-4" /> Tra cứu đơn
                        </a>
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="rounded-full bg-(image:--background-image-shiptrack-gradient) px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 
                             animate-btn-gradient
                            transition-transform hover:-translate-y-0.5"
                        >
                            Bắt đầu ngay <ArrowRight className="ml-1 inline size-4" />
                        </button>
                    </div>
                    <button
                        type="button"
                        className="rounded-lg p-2 lg:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
                    >
                        {menuOpen ? <X /> : <Menu />}
                    </button>
                </div>
                {menuOpen && (
                    <nav className="flex flex-col gap-4 border-t border-border/60 px-5 py-5 lg:hidden" aria-label="Menu mobile">
                        {navItems.map((item, index) => (
                            <a
                                key={item}
                                href={`#${["solutions", "features", "pricing", "about"][index]}`}
                                onClick={() => setMenuOpen(false)}
                                className="font-semibold text-shiptrack-subtitle text-base"
                            >
                                {item}
                            </a>
                        ))}
                        <button onClick={() => navigate("/dashboard")} className="rounded-full bg-primary px-5 py-3 text-center font-bold text-white">
                            Bắt đầu ngay
                        </button>
                    </nav>
                )}
            </header>

            {/* --- Hero Section --- */}
            <HeroBackground>
                <section id="top" className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 lg:px-8 lg:pb-24 lg:pt-20">
                    <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                        <div className="max-w-xl">
                            <div className="mb-5 flex items-center gap-3 text-[13px] font-bold tracking-wider text-shiptrack-secondary">
                                <span className="h-px w-8 bg-shiptrack-secondary" /> GIẢI PHÁP VẬN CHUYỂN HIỆN ĐẠI
                            </div>

                            {/* GIẢM SIZE CHỮ HERO */}
                            <h1 className="text-balance text-4xl font-black leading-[1.1] tracking-[-0.04em] text-shiptrack-text sm:text-5xl lg:text-[3.5rem]">
                                Giao hàng nhanh,
                                <br />
                                <span className="text-shiptrack-primary-1">quản lý thật dễ.</span>
                            </h1>

                            {/* GIẢM SIZE CHỮ ĐOẠN VĂN */}
                            <p className="mt-5 max-w-lg text-base leading-relaxed text-shiptrack-subtitle">
                                ShipTrack giúp doanh nghiệp vận hành đơn hàng mượt mà hơn — từ lúc tạo đơn đến khi giao tận tay khách hàng.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="#contact"
                                    className="rounded-full bg-(image:--background-image-shiptrack-gradient) px-6 py-3.5 text-center text-sm font-bold text-white shadow-xl shadow-primary/20 transition-transform hover:-translate-y-1
                                     animate-btn-gradient
                                    "
                                >
                                    Khám phá giải pháp <ArrowRight className="ml-2 inline size-4" />
                                </a>
                                <a
                                    href="#tracking"
                                    className="rounded-full border border-shiptrack-primary-1/20 bg-white px-6 py-3.5 text-center text-sm font-bold text-shiptrack-primary-1 transition-colors hover:bg-shiptrack-soft"
                                >
                                    Tra cứu vận đơn
                                </a>
                            </div>
                            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-shiptrack-subtitle">
                                <span className="flex items-center gap-2">
                                    <Check className="size-4 text-shiptrack-secondary" /> Không phí khởi tạo
                                </span>
                                <span className="flex items-center gap-2">
                                    <Check className="size-4 text-shiptrack-secondary" /> Hỗ trợ 24/7
                                </span>
                            </div>
                        </div>

                        {/* Cột Dashboard: Giảm nhẹ kích thước padding và font */}
                        <div className="relative mx-auto w-full max-w-[540px] lg:mr-0">
                            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-shiptrack-soft via-transparent to-white" />
                            <div className="relative overflow-hidden rounded-[2rem] bg-shiptrack-primary-1 p-2.5 shadow-2xl shadow-primary/20">
                                <div className="rounded-[1.5rem] bg-[#f8eeee] p-5 sm:p-6">
                                    <div className="mb-6 flex items-center justify-between">
                                        <div>
                                            <p className="text-[11px] font-bold uppercase tracking-widest text-shiptrack-secondary">Bảng điều khiển</p>
                                            <p className="mt-1 text-lg font-black text-shiptrack-text">Đơn hàng hôm nay</p>
                                        </div>
                                        <div className="rounded-xl bg-white p-2.5 text-shiptrack-primary-1 shadow-sm">
                                            <Truck className="size-4" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2.5">
                                        <div className="rounded-xl bg-white p-3">
                                            <p className="text-[11px] text-shiptrack-subtitle">Tổng đơn</p>
                                            <p className="mt-1.5 text-xl font-black text-shiptrack-text">1,284</p>
                                            <p className="mt-0.5 text-[11px] font-bold text-shiptrack-secondary">+18.4%</p>
                                        </div>
                                        <div className="rounded-xl bg-white p-3">
                                            <p className="text-[11px] text-shiptrack-subtitle">Đang giao</p>
                                            <p className="mt-1.5 text-xl font-black text-shiptrack-text">648</p>
                                            <p className="mt-0.5 text-[11px] font-bold text-shiptrack-secondary">Đang xử lý</p>
                                        </div>
                                        <div className="rounded-xl bg-white p-3">
                                            <p className="text-[11px] text-shiptrack-subtitle">Thành công</p>
                                            <p className="mt-1.5 text-xl font-black text-shiptrack-text">96.8%</p>
                                            <p className="mt-0.5 text-[11px] font-bold text-shiptrack-secondary">Rất tốt</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 rounded-xl bg-white p-4">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-bold">Hiệu suất giao hàng</p>
                                            <span className="rounded-full bg-shiptrack-soft px-2.5 py-0.5 text-[11px] font-bold text-shiptrack-primary-1">7 ngày</span>
                                        </div>
                                        <div className="mt-5 flex h-24 items-end gap-1.5 sm:gap-2">
                                            {[42, 60, 48, 77, 63, 88, 96, 80, 100, 85, 92, 100].map((height, i) => (
                                                <div
                                                    key={i}
                                                    className="flex-1 rounded-t-sm bg-gradient-to-t from-shiptrack-primary-1 to-shiptrack-secondary/70"
                                                    style={{ height: `${height}%`, opacity: i === 8 ? 1 : 0.55 }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -bottom-4 -left-3 flex items-center gap-2.5 rounded-2xl bg-white p-3 shadow-xl sm:-left-6">
                                <span className="flex size-9 items-center justify-center rounded-full bg-shiptrack-soft text-shiptrack-secondary">
                                    <Package className="size-4" />
                                </span>
                                <div>
                                    <p className="text-[11px] text-shiptrack-subtitle">Đơn hàng #ST28491</p>
                                    <p className="text-[13px] font-bold text-shiptrack-text">Đã giao thành công</p>
                                </div>
                                <Check className="size-4 text-shiptrack-secondary" />
                            </div>
                        </div>
                    </div>
                </section>
            </HeroBackground>

            {/* --- Trust Strip --- */}
            <div className="border-y border-border/70 bg-white/60 relative z-10">
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-6 text-center sm:grid-cols-4 lg:px-8">
                    <div>
                        <p className="text-2xl font-black text-shiptrack-primary-1">63</p>
                        <p className="mt-1 text-sm text-shiptrack-subtitle">Tỉnh thành phục vụ</p>
                    </div>
                    <div>
                        <p className="text-2xl font-black text-shiptrack-primary-1">2.5M+</p>
                        <p className="mt-1 text-sm text-shiptrack-subtitle">Đơn hàng mỗi tháng</p>
                    </div>
                    <div>
                        <p className="text-2xl font-black text-shiptrack-primary-1">98.6%</p>
                        <p className="mt-1 text-sm text-shiptrack-subtitle">Tỷ lệ giao thành công</p>
                    </div>
                    <div>
                        <p className="text-2xl font-black text-shiptrack-primary-1">24/7</p>
                        <p className="mt-1 text-sm text-shiptrack-subtitle">Đội ngũ hỗ trợ</p>
                    </div>
                </div>
            </div>

            {/* --- Benefits Section --- */}
            <section id="solutions" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24 relative z-10">
                <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-shiptrack-secondary">Vì sao ShipTrack?</p>

                        {/* GIẢM SIZE HEADING SECTION */}
                        <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
                            Vận chuyển đơn giản hơn,
                            <br />
                            <span className="text-shiptrack-primary-1">tăng trưởng nhanh hơn.</span>
                        </h2>

                        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-shiptrack-subtitle">
                            Một nền tảng duy nhất cho mọi nhu cầu giao nhận của bạn. Minh bạch, linh hoạt và luôn đồng hành.
                        </p>
                    </div>
                    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
                        {benefits.map(({ icon: Icon, title, text }) => (
                            <article key={title} className="group">
                                <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-shiptrack-soft text-shiptrack-primary-1 transition-colors group-hover:bg-primary group-hover:text-white">
                                    <Icon className="size-5" />
                                </div>
                                <h3 className="text-[17px] font-extrabold">{title}</h3>
                                <p className="mt-1.5 text-[14.5px] leading-relaxed text-shiptrack-subtitle">{text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Tracking CTA --- */}
            <section id="tracking" className="mx-5 rounded-[2rem] bg-shiptrack-primary-1 px-6 py-12 text-white sm:px-10 lg:mx-auto lg:max-w-7xl lg:px-16 lg:py-14 relative z-10">
                <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                    <div>
                        <p className="text-[13px] font-bold uppercase tracking-widest text-white/60">Tra cứu nhanh</p>
                        <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                            Biết đơn hàng đang ở đâu,
                            <br />
                            an tâm trên mọi hành trình.
                        </h2>
                    </div>
                    <div className="w-full max-w-md">
                        <label htmlFor="tracking-code" className="sr-only">Nhập mã vận đơn</label>
                        <div className="flex rounded-full bg-white p-1">
                            <input
                                id="tracking-code"
                                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-shiptrack-text outline-none placeholder:text-shiptrack-subtitle"
                                placeholder="Nhập mã vận đơn của bạn"
                            />
                            <button
                                type="button"
                                className="shrink-0 rounded-full bg-(image:--background-image-shiptrack-gradient) px-5 py-2.5 text-sm font-bold text-white"
                            >
                                Tra cứu
                            </button>
                        </div>
                        <p className="mt-2.5 flex items-center gap-1.5 px-3 text-xs text-white/60">
                            <Search className="size-3.5" /> Tra cứu miễn phí, cập nhật theo thời gian thực
                        </p>
                    </div>
                </div>
            </section>

            {/* --- Process Section --- */}
            <section id="features" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24 relative z-10">
                <div className="max-w-2xl">
                    <p className="text-sm font-bold uppercase tracking-widest text-shiptrack-secondary">Quy trình minh bạch</p>

                    {/* GIẢM SIZE HEADING SECTION */}
                    <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                        Từ kho hàng đến tay khách,
                        <br />
                        <span className="text-shiptrack-primary-1">chỉ vài bước đơn giản.</span>
                    </h2>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-4">
                    {steps.map((step, index) => (
                        <article key={step.number} className="relative border-t border-shiptrack-primary-1/20 pt-5">
                            <p className="text-sm font-black text-shiptrack-secondary">{step.number}</p>
                            <h3 className="mt-4 text-lg font-extrabold">{step.title}</h3>
                            <p className="mt-2 text-[14.5px] leading-relaxed text-shiptrack-subtitle">{step.text}</p>
                            {index < 3 && (
                                <ArrowRight className="absolute right-0 top-5 hidden size-4 text-shiptrack-secondary/50 md:block" />
                            )}
                        </article>
                    ))}
                </div>
            </section>

            {/* --- Final CTA --- */}
            <section id="contact" className="relative mx-auto max-w-7xl px-5 pb-20 lg:px-8 lg:pb-24 relative z-10">
                <div className="relative overflow-hidden rounded-[2rem] bg-shiptrack-soft px-6 py-14 text-center sm:px-10">
                    <div className="absolute -right-20 -top-24 size-64 rounded-full border-[35px] border-white/70" />
                    <div className="relative">
                        <p className="text-[13px] font-bold uppercase tracking-widest text-shiptrack-secondary">Sẵn sàng bứt phá?</p>

                        {/* GIẢM SIZE HEADING CTA */}
                        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-[-0.03em] text-shiptrack-primary-1 sm:text-4xl">
                            Để ShipTrack đồng hành
                            <br />
                            trên từng đơn hàng.
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-shiptrack-subtitle">
                            Bắt đầu quản lý vận chuyển chuyên nghiệp hơn ngay hôm nay.
                        </p>

                        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                            <a
                                href="tel:19001234"
                                className="rounded-full bg-(image:--background-image-shiptrack-gradient) px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20"
                            >
                                <Phone className="mr-2 inline size-4" /> Gọi 1900 1234
                            </a>
                            <a
                                href="mailto:hello@shiptrack.vn"
                                className="rounded-full border border-shiptrack-primary-1/20 bg-white px-6 py-3.5 text-sm font-bold text-shiptrack-primary-1"
                            >
                                Nhận tư vấn miễn phí
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}