import { cn } from 'cn';
import { ChevronDown, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
    icon: LucideIcon;
    label: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export default function NavItemWithChildmenu({
    icon: Icon,
    label,
    children,
    defaultOpen = false,
}: Props) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className='py-0.5 group'>
            <button
                type='button'
                onClick={() => setIsOpen((prev) => !prev)}
                className={cn(
                    'w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl transition-all duration-200',
                    // Text mặc định dùng foreground, hover dùng accent (nền hồng nhạt + chữ đỏ)
                    'text-foreground hover:bg-accent hover:text-accent-foreground',
                    // Khi mở: nền accent nhạt hơn và chữ primary
                    isOpen && 'bg-accent/50 text-primary',
                )}
                aria-expanded={isOpen}
            >
                {/* min-w-0 là bắt buộc để truncate hoạt động bên trong flex */}
                <div className='flex items-center gap-3 min-w-0'>
                    <Icon
                        className={cn(
                            'w-5 h-5 shrink-0 transition-colors',
                            isOpen
                                ? 'text-primary'
                                : 'text-muted-foreground group-hover:text-primary',
                        )}
                    />
                    <span className='text-[14px] font-medium truncate whitespace-nowrap'>
                        {label}
                    </span>
                </div>

                <ChevronDown
                    className={cn(
                        'w-4 h-4 shrink-0 transition-transform duration-300 text-muted-foreground',
                        isOpen && 'rotate-180 text-primary',
                        'group-hover:text-primary',
                    )}
                />
            </button>

            <div
                className={cn(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    isOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0',
                )}
            >
                {/* Đường line bên trái: dùng border-border, hover đổi sang primary */}
                <div className='relative ml-6 pl-4 mt-1 space-y-1 border-l-2 border-border group-hover:border-shiptrack-soft transition-colors'>
                    {children}
                </div>
            </div>
        </div>
    );
}