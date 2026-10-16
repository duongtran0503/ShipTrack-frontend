// data-table-columns-visibility.tsx
import { LayoutIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"

import { useTableInstanceContext } from "@/components/common/data-table/table-instance-provider"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup, // 👈 THÊM import này
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Kbd } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function DataTableColumnsVisibility() {
  const [open, setOpen] = useState(false)
  const { tableInstance: table } = useTableInstanceContext()

  useHotkeys("shift+c", () => {
    setTimeout(() => setOpen(true), 100)
  })

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger >
            <DropdownMenuTrigger >
              <Button
                aria-label="Thay đổi cột hiển thị"
                variant="outline"
                size="sm"
                className="ml-auto hidden h-8 lg:flex"
              >
                <LayoutIcon className="mr-2 size-4" />
                Hiển thị
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent className="flex items-center gap-2 border bg-accent font-semibold text-foreground">
            Thay đổi cột hiển thị
            <div>
              <Kbd className="font-sans">⇧</Kbd>{" "}
              <Kbd className="font-sans">C</Kbd>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent align="end" className="w-40">
        {/* ✅ FIX: Wrap Label trong Group */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>Thay đổi cột hiển thị</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                onSelect={(e) => e.preventDefault()}
              >
                <span className="truncate">{column.id}</span>
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}