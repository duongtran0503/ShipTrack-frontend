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
                    'text-slate-700 hover:bg-red-50 hover:text-[#930004]',
                    isOpen && 'bg-red-50/50 text-[#930004]',
                )}
                aria-expanded={isOpen}
            >
                {/* min-w-0 là bắt buộc để truncate hoạt động bên trong flex */}
                <div className='flex items-center gap-3 min-w-0'>
                    <Icon
                        className={cn(
                            'w-5 h-5 shrink-0 transition-colors',
                            isOpen
                                ? 'text-[#930004]'
                                : 'text-slate-500 group-hover:text-[#930004]',
                        )}
                    />
                    <span className='text-[14px] font-medium truncate whitespace-nowrap'>
                        {label}
                    </span>
                </div>

                <ChevronDown
                    className={cn(
                        'w-4 h-4 shrink-0 transition-transform duration-300 text-slate-400',
                        isOpen && 'rotate-180 text-[#930004]',
                        'group-hover:text-[#930004]',
                    )}
                />
            </button>

            <div
                className={cn(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    isOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0',
                )}
            >
                {/* Đường line bên trái */}
                <div className='relative ml-6 pl-4 mt-1 space-y-1 border-l-2 border-slate-100 group-hover:border-red-100 transition-colors'>
                    {children}
                </div>
            </div>
        </div>
    );
}