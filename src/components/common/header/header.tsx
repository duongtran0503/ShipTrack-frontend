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
        // Nền trắng (bg-card), viền (border-border), đổ bóng nhẹ
        <div className='mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm rounded-xl p-4 bg-card border border-border'>
            {/* Bên trái: Tiêu đề */}
            <div className='space-y-1'>
                <h4 className='text-xl md:text-xl font-bold text-foreground'>
                    {title}
                </h4>
                {/* Description dùng text phụ (subtitle) */}
                <p className='text-sm text-muted-foreground max-w-md line-clamp-1'>
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
                    {/* Icon search: đổi màu khi hover */}
                    <Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-hover:text-primary transition-colors' />

                    {/* Khung Search: nền xám nhạt (muted), viền nhẹ, hover viền đỏ */}
                    <div className='h-10 w-80 rounded-full bg-muted/50 border border-border pl-10 pr-4 flex items-center justify-between text-sm text-foreground group-hover:border-primary/30 group-hover:bg-background transition-all'>
                        <span className='text-muted-foreground'>Tìm chức năng...</span>
                        <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
                            <span className='text-xs'>⌘</span>K
                        </kbd>
                    </div>
                </div>

                {/* Nút Notify: hover nền accent */}
                <div className='relative cursor-pointer p-2 hover:bg-accent rounded-full transition-colors'>
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
                                        className='cursor-pointer data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground'
                                    >
                                        <item.icon className='mr-2 h-4 w-4' />
                                        <span>{item.label}</span>
                                    </CommandItem>

                                    {/* Chức năng con (nếu có) */}
                                    {item.children?.map((child) => (
                                        <CommandItem
                                            key={child.href}
                                            onSelect={() => runCommand(() => navigate(child.href))}
                                            className='cursor-pointer pl-8 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground'
                                        >
                                            {/* Chấm tròn nhỏ (bullet) */}
                                            <div className='mr-2 h-1 w-1 rounded-full bg-muted-foreground' />
                                            <span>{child.label}</span>
                                            <span className='ml-auto text-[10px] text-muted-foreground italic'>
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