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
                    ? 'bg-[#bc4145] text-white shadow-lg shadow-red-900/20'
                    : 'text-slate-700 hover:bg-red-50 hover:text-[#930004]',
            )}
        >
            {Icon && (
                <Icon
                    className={cn(
                        'w-5 h-5 shrink-0 transition-colors',
                        active
                            ? 'text-white'
                            : 'text-slate-500 group-hover:text-[#930004]',
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