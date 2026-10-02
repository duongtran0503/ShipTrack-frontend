// src/features/sidebar/admin-sidebar.tsx
import { Truck } from 'lucide-react';
import { useMemo } from 'react';
import { useLocation } from 'react-router';

import ButtonLogout from '@/components/common/button-logout';
import { ADMIN_NAV_ITEMS } from '@/components/common/sidebar/nav-content';
import NavItemWithChildmenu from '@/components/common/sidebar/nav-item-with-children';
import NavItem from './nav-item';
import { isNavActive } from './nav-utils';

export default function AdminSidebar() {
    const { pathname, search } = useLocation();

    // Ghép pathname + query string — tương đương usePathname + useSearchParams của Next
    const fullPath = useMemo(() => {
        return search ? `${pathname}${search}` : pathname;
    }, [pathname, search]);

    /**
     * Tìm href cụ thể nhất đang active
     * (href của parent + children, chọn cái dài nhất khớp)
     */
    const bestMatchHref = useMemo(() => {
        const candidates: string[] = [];
        for (const item of ADMIN_NAV_ITEMS) {
            candidates.push(item.href);
            item.children?.forEach((c) => candidates.push(c.href));
        }

        return (
            candidates
                .filter((href) => isNavActive(fullPath, href))
                .sort(
                    (a, b) =>
                        b.split(/[?#]/)[0].length - a.split(/[?#]/)[0].length,
                )[0] ?? null
        );
    }, [fullPath]);

    return (
        <div className='w-66 fixed left-0 bottom-0 top-0 bg-white shadow-shopio-xl'>
            <div className='flex flex-col h-full justify-between'>
                {/* Logo */}
                <div className='p-6 mb-2'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-[#930004] rounded-xl flex items-center justify-center shadow-lg shadow-red-900/20'>
                            <Truck className='w-6 h-6 text-white' />
                        </div>
                        <h1 className='text-2xl font-extrabold  
                        tracking-tight bg-clip-text text-transparent animate-gradient-x
                        '
                            style={{
                                backgroundImage: "linear-gradient(90deg, #930004, #FF3300, #990000)",
                                backgroundSize: "200% 100%",
                            }}
                        >
                            ShipTrack<span className='text-[#930004]'>.</span>
                        </h1>
                    </div>
                </div>

                {/* Menu */}
                <div className='overflow-y-auto h-full px-4 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-[#930004]/30'>
                    <nav className='flex-1 space-y-1 pb-10'>
                        {ADMIN_NAV_ITEMS.map((item) => {
                            const open = item.listUrl.some((url) =>
                                isNavActive(fullPath, url),
                            );

                            if (item.children) {
                                return (
                                    <NavItemWithChildmenu
                                        key={item.id}
                                        icon={item.icon}
                                        label={item.label}
                                        defaultOpen={open}
                                    >
                                        {item.children.map((child) => (
                                            <NavItem
                                                key={child.href}
                                                label={child.label}
                                                href={child.href}
                                                active={bestMatchHref === child.href}
                                            />
                                        ))}
                                    </NavItemWithChildmenu>
                                );
                            }

                            return (
                                <NavItem
                                    key={item.id}
                                    icon={item.icon}
                                    label={item.label}
                                    href={item.href}
                                    active={bestMatchHref === item.href}
                                />
                            );
                        })}
                    </nav>
                </div>

                {/* Logout */}
                <div className='p-4 border-t border-gray-50'>
                    <ButtonLogout />
                </div>
            </div>
        </div>
    );
}