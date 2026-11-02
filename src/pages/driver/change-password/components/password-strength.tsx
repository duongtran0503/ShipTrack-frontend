import type { calculatePasswordStrength } from "../hooks/use-driver-change-password";

type StrengthType = ReturnType<typeof calculatePasswordStrength>;

interface Props {
    strength: StrengthType;
}

export function PasswordStrength({ strength }: Props) {
    return (
        <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground font-medium">Độ mạnh mật khẩu:</span>
                <span className="font-bold text-foreground">{strength.label}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                {[1, 2, 3, 4].map((level) => (
                    <div
                        key={level}
                        className={`rounded-full transition-all duration-300 ${strength.score >= level ? strength.color : "bg-muted"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}