import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowRight, Clock } from "lucide-react";
import type { SystemActivityLog } from "../hooks/use-admin-dashboard";

interface Props {
    logs: SystemActivityLog[];
    goToSettings: () => void;
}

export function SystemLogsCard({ logs, goToSettings }: Props) {
    return (
        <Card className="rounded-[24px] border-border/60 shadow-sm bg-card overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-4 pt-6 px-6 border-b border-border/40">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <Activity className="size-5 text-primary" />
                    <span>Hoạt động hệ thống gần đây</span>
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={goToSettings} className="text-xs font-bold text-primary hover:bg-accent cursor-pointer">
                    Xem nhật ký <ArrowRight className="size-3.5 ml-1" />
                </Button>
            </CardHeader>
            <CardContent className="p-6">
                {logs.length > 0 ? (
                    <div className="space-y-3">
                        {logs.map((log) => (
                            <div key={log.id} className="p-4 rounded-2xl border border-border/50 bg-muted/10 flex items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                                            {log.action}
                                        </span>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock className="size-3" /> {log.time}
                                        </span>
                                    </div>
                                    <p className="text-xs text-foreground font-medium">{log.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-xs text-muted-foreground">Chưa có hoạt động hệ thống nào.</div>
                )}
            </CardContent>
        </Card>
    );
}