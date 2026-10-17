import { cn } from 'cn';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router';

interface NavItemProps {
    icon?: LucideIcon;
    label: string;
    href: string;
    active?: boolean;
}

export default function NavItem({
    icon: Icon,
    label,
    href,
    active,
}: NavItemProps) {
    return (
        <Link
            to={href}
            className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group cursor-pointer mb-0.5',
                active
                    ? // Khi Active: Dùng nền Gradient đỏ (hoặc bg-primary)
                    'bg-shiptrack-gradient text-primary-foreground shadow-md shadow-shiptrack-primary-1/20'
                    : // Khi bình thường: Chữ màu text chính, hover nền hồng nhạt
                    'text-foreground hover:bg-accent hover:text-accent-foreground',
            )}
        >
            {Icon && (
                <Icon
                    className={cn(
                        'w-5 h-5 shrink-0 transition-colors',
                        active
                            ? 'text-primary-foreground' // Icon trắng khi active
                            : 'text-muted-foreground group-hover:text-primary', // Icon xám, hover thành đỏ
                    )}
                />
            )}
            <span
                className={cn(
                    'text-[14px] font-medium truncate whitespace-nowrap',
                    active ? 'font-semibold' : '',
                )}
            >
                {label}
            </span>
        </Link>
    );
}