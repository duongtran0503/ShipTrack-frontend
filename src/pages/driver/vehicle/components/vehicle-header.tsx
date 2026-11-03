import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Props {
    onGoBack: () => void;
}

export function VehicleHeader({ onGoBack }: Props) {
    return (
        <div className="flex items-center justify-between">
            <Button
                variant="ghost"
                onClick={onGoBack}
                className="text-xs font-bold gap-2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
                <ArrowLeft className="size-4" /> Quay lại
            </Button>
            <h1 className="text-base font-bold text-foreground">Cập nhật thông tin phương tiện</h1>
        </div>
    );
}