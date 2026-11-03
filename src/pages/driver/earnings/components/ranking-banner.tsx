import { Award, Trophy } from "lucide-react";

interface Props {
    ranking: {
        position: number;
        totalDrivers: number;
        badgeName: string;
    };
}

export function RankingBanner({ ranking }: Props) {
    return (
        <div className="rounded-[28px] p-6 sm:p-8 bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-800 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
                <div className="size-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
                    <Trophy className="size-8 text-amber-200" />
                </div>
                <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Xếp hạng tài xế</span>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                        Hạng #{ranking.position} trên tổng số {ranking.totalDrivers} tài xế
                    </h2>
                    <p className="text-xs text-amber-100 flex items-center gap-1.5 justify-center md:justify-start">
                        <Award className="size-4 text-amber-300" /> Danh hiệu: <strong>{ranking.badgeName}</strong>
                    </p>
                </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-center">
                <span className="text-[10px] uppercase tracking-wider text-amber-200 block font-semibold">Điểm uy tín</span>
                <strong className="text-2xl font-black text-white">99.8 / 100</strong>
            </div>
        </div>
    );
}