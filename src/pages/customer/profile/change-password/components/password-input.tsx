import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

import { FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface Props {
    value: string
    onChange: (value: string) => void
    onBlur?: () => void
    placeholder?: string
    error?: string
    label: string
    name: string
}

export function PasswordInput({
    value,
    onChange,
    onBlur,
    placeholder,
    error,
    name,
}: Props) {
    const [show, setShow] = useState(false)

    return (
        <>
            <div className="relative">
                <Input
                    id={name}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    type={show ? "text" : "password"}
                    placeholder={placeholder}
                    className="h-11 rounded-xl border-border bg-muted/30 pl-4 pr-10 text-sm"
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
            </div>
            {error && (
                <FieldError className="px-1 text-xs text-destructive">{error}</FieldError>
            )}
        </>
    )
}