// src/components/ui/checkbox.tsx
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { CheckIcon, MinusIcon } from "lucide-react"

import { cn } from "cn"

interface CheckboxProps extends CheckboxPrimitive.Root.Props {
  /**
   * Trạng thái lửng lơ (indeterminate) — dùng cho "Chọn tất cả"
   * - Khi true: hiển thị dấu gạch ngang, nền primary
   * - Khi false: hiển thị dấu check bình thường
   */
  indeterminate?: boolean
}

function Checkbox({
  className,
  indeterminate = false,
  checked,
  ...props
}: CheckboxProps) {
  // Base UI không nhận "indeterminate" → ép về false, dùng data-indeterminate riêng
  const finalChecked = indeterminate ? false : checked

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      // 👇 Attribute riêng để CSS style indeterminate
      data-indeterminate={indeterminate || undefined}
      checked={finalChecked}
      className={cn(
        // Base styles (giống file gốc của bạn)
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary",


        "data-[indeterminate]:border-primary data-[indeterminate]:bg-transparent data-[indeterminate]:text-primary-foreground",
        "dark:data-[indeterminate]:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        {/* 👇 Đổi icon theo trạng thái */}
        {indeterminate ? <MinusIcon /> : <CheckIcon />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
