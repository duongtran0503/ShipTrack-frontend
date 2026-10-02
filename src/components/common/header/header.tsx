// src/features/header/seller-header.tsx
import { Search } from 'lucide-react';
import * as React from 'react';
import { useNavigate } from 'react-router';

import ButtonNotification from '@/components/common/header/notification';
import UserInfo from '@/components/common/header/user-info';
import { ADMIN_NAV_ITEMS } from '@/components/common/sidebar/nav-content';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';

interface Props {
    title: string;
    description: string;
}

export default function HeaderContent({ title, description }: Props) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    // ⌘K / Ctrl+K để mở Command Palette
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = React.useCallback(
        (command: () => void) => {
            setOpen(false);
            command();
        },
        [],
    );

    return (
        <div className='mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm rounded-xl p-4 bg-white border border-slate-100'>
            {/* Bên trái: Tiêu đề */}
            <div className='space-y-1'>
                <h4 className='text-xl md:text-xl font-bold text-slate-900'>
                    {title}
                </h4>
                <p className='text-sm text-slate-900 max-w-md line-clamp-1'>
                    {description}
                </p>
            </div>

            {/* Bên phải: Search + Notify + Profile */}
            <div className='flex items-center gap-3 md:gap-6'>
                {/* Thanh Search giả lập (click để mở Command Dialog) */}
                <div
                    onClick={() => setOpen(true)}
                    className='relative hidden lg:block cursor-pointer group'
                >
                    <Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-800 group-hover:text-[#930004] transition-colors' />
                    <div className='h-10 w-80 rounded-full bg-slate-50 border border-slate-400 pl-10 pr-4 flex items-center justify-between text-sm text-slate-800 hover:border-[#930004]/30 transition-all'>
                        <span>Tìm chức năng...</span>
                        <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100'>
                            <span className='text-xs'>⌘</span>K
                        </kbd>
                    </div>
                </div>

                {/* Nút Notify */}
                <div className='relative cursor-pointer p-2 hover:bg-slate-50 rounded-full transition-colors'>
                    <ButtonNotification />
                </div>

                {/* User Profile */}
                <UserInfo />
            </div>

            {/* Command Palette Dialog */}
            <CommandDialog open={open} onOpenChange={setOpen}>
                <Command>


                    <CommandInput placeholder='Tìm kiếm nhanh chức năng quản trị...' />
                    <CommandList>
                        <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
                        <CommandGroup heading='Chức năng Dashboard'>
                            {ADMIN_NAV_ITEMS.map((item) => (
                                <React.Fragment key={item.id}>
                                    {/* Chức năng cha */}
                                    <CommandItem
                                        onSelect={() => runCommand(() => navigate(item.href))}
                                        className='cursor-pointer'
                                    >
                                        <item.icon className='mr-2 h-4 w-4' />
                                        <span>{item.label}</span>
                                    </CommandItem>

                                    {/* Chức năng con (nếu có) */}
                                    {item.children?.map((child) => (
                                        <CommandItem
                                            key={child.href}
                                            onSelect={() => runCommand(() => navigate(child.href))}
                                            className='cursor-pointer pl-8'
                                        >
                                            <div className='mr-2 h-1 w-1 rounded-full bg-slate-400' />
                                            <span>{child.label}</span>
                                            <span className='ml-auto text-[10px] text-slate-400 italic'>
                                                trong {item.label}
                                            </span>
                                        </CommandItem>
                                    ))}
                                </React.Fragment>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>
        </div>
    );
}