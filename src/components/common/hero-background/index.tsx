export default function HeroBackground({ children }: { children?: React.ReactNode }) {
    return (
        <section className="relative overflow-hidden bg-background">
            {/* Lớp Background FX */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Blob 1: Hồng đào nhạt (Trên trái) */}
                <span
                    className="absolute rounded-full bg-[radial-gradient(circle,#e9c9ce_0%,transparent_68%)] opacity-55
                               w-[42vw] h-[42vw] max-w-115 max-h-115 
                               top-[-8%] left-[8%] blur-2xl"
                />

                {/* Blob 2: Hồng nhạt (Trên phải) */}
                <span
                    className="absolute rounded-full bg-[radial-gradient(circle,#f6dade_0%,transparent_70%)] opacity-40
                               w-[38vw] h-[38vw] max-w-105 max-h-[420px] 
                               top-[-4%] right-[6%] blur-2xl"
                />

                {/* Blob 3: Đỏ Shiptrack (Dưới giữa) - Dùng mã màu Primary của bạn */}
                <span
                    className="absolute rounded-full bg-[radial-gradient(circle,#710105_0%,transparent_72%)] opacity-[0.12]
                               w-[30vw] h-[30vw] max-w-[360px] max-h-90 
                               bottom-[-16%] left-[38%] blur-3xl"
                />

                {/* Lưới Grid (Tùy chọn - trang trí thêm) */}
                <div className="absolute -inset-0.5 opacity-30 hidden md:block
                                bg-[linear-gradient(to_right,#71010515_1px,transparent_1px),linear-gradient(to_bottom,#71010515_1px,transparent_1px)] 
                                bg-[size:44px_44px]
                                mask-[radial-gradient(70%_60%_at_50%_30%,#000_0%,transparent_75%)]"
                />
            </div>

            {/* Nội dung chính (Nằm trên background) */}
            <div className="relative z-10">
                {children}
            </div>
        </section>
    );
}