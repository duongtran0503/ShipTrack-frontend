import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
    title: string;
    description: string;
}

export function ConfirmStatusModal({ isOpen, onClose, onConfirm, isLoading, title, description }: Props) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="rounded-[28px] border-border/60">
                <AlertDialogHeader className="space-y-2">
                    <AlertDialogTitle className="text-base font-bold text-foreground">{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-xs text-muted-foreground leading-relaxed">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="pt-2">
                    <AlertDialogCancel disabled={isLoading} className="rounded-xl text-xs font-bold h-10">
                        Hủy bỏ
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isLoading}
                        onClick={(e) => {
                            e.preventDefault()
                            onConfirm()
                        }}
                        className="rounded-xl text-xs font-bold h-10 bg-[#710105] hover:bg-[#580104] text-white"
                    >
                        {isLoading && <Loader2 className="size-4 animate-spin mr-1.5" />}
                        Xác nhận thay đổi
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}