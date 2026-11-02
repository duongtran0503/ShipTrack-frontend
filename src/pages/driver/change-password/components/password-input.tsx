import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
    label: string;
    placeholder: string;
    registration: UseFormRegisterReturn;
    error?: FieldError;
}

export function PasswordInput({ label, placeholder, registration, error }: Props) {
    const [show, setShow] = useState(false);

    return (
        <div className="space-y-2">
            <Label className="text-xs font-bold text-foreground">{label}</Label>
            <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                    type={show ? "text" : "password"}
                    {...registration}
                    placeholder={placeholder}
                    className="pl-10 pr-10 h-11 rounded-2xl border-border/60 focus:border-primary"
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
            </div>
            {error && (
                <p className="text-[11px] font-semibold text-destructive">{error.message}</p>
            )}
        </div>
    );
}