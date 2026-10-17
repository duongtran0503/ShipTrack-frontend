import { useMemo } from 'react';
import { useLocation } from 'react-router';

import ButtonLogout from '@/components/common/button-logout';
import LogoBrand from '@/components/common/logo';
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
        // Sử dụng bg-background (trắng) hoặc bg-sidebar
        <div className='w-66 fixed left-0 bottom-0 top-0 bg-background border-r border-border shadow-sm'>
            <div className='flex flex-col h-full justify-between'>
                {/* Logo */}
                <div className='p-2 mt-2 ml-2'>
                    <LogoBrand />
                </div>

                {/* Menu */}
                {/* Custom thanh cuộn (scrollbar) dùng màu primary */}
                <div className='overflow-y-auto h-full px-4 scrollbar-thin scrollbar-thumb-muted hover:scrollbar-thumb-primary/30'>
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
                <div className='p-4 border-t border-border'>
                    <ButtonLogout />
                </div>
            </div>
        </div>
    );
}