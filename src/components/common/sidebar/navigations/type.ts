import type { LucideIcon } from "lucide-react";

interface NavItemChild {
    label: string;
    href: string;
}

export interface NavItemType {
    id: string;
    label: string;
    listUrl: string[];
    icon: LucideIcon;
    href: string;
    children?: NavItemChild[];
}
