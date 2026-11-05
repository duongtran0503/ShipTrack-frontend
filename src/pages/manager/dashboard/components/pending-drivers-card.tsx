import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import type { PendingDriver } from "../hooks/use-admin-dashboard";

interface Props {
    drivers: PendingDriver[];
    goToDriverApprovals: () => void;
    goToDriverDetail: (id: string | number) => void;
}

export function PendingDriversCard({ drivers, goToDriverApprovals, goToDriverDetail }: Props) {
    return (
        <Card className="rounded-[24px] border-border/60 shadow-sm bg-card overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-4 pt-6 px-6 border-b border-border/40">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <ShieldCheck className="size-5 text-primary" />
                    <span>Hồ sơ tài xế chờ duyệt</span>
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={goToDriverApprovals} className="text-xs font-bold text-primary hover:bg-accent cursor-pointer">
                    Phê duyệt ngay <ArrowRight className="size-3.5 ml-1" />
                </Button>
            </CardHeader>
            <CardContent className="p-6">
                {drivers.length > 0 ? (
                    <div className="space-y-3">
                        {drivers.map((driver) => (
                            <div
                                key={driver.id}
                                onClick={() => goToDriverDetail(driver.id)}
                                className="p-4 rounded-2xl border border-border/50 hover:border-primary/40 bg-muted/20 hover:bg-card transition-all cursor-pointer flex items-center justify-between gap-4"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {driver.fullName?.charAt(0) || "D"}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-foreground">{driver.fullName}</p>
                                        <p className="text-[11px] text-muted-foreground">{driver.phone} • {driver.email}</p>
                                    </div>
                                </div>
                                <Button size="sm" className="h-8 rounded-xl bg-primary text-white text-xs font-bold px-4 shrink-0">
                                    Xem hồ sơ
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-xs text-muted-foreground flex flex-col items-center gap-2">
                        <CheckCircle2 className="size-8 text-emerald-500" />
                        <p>Không có hồ sơ tài xế nào đang chờ duyệt.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}