import HeaderAdminManager from "@/components/common/header";
import { ADMIN_ROUTE_METADATA } from "@/components/common/header/meta-data/admin-meta-router";
import HeroBackground from "@/components/common/hero-background";
import Sidebar from "@/components/common/sidebar";
import { ADMIN_NAV_ITEMS } from "@/components/common/sidebar/navigations/admin-nav-content";
import type { ReactNode } from "react";

export default function SuperAdminlayout({ children }: { children: ReactNode }) {
    return <HeroBackground>
        <div className="">
            <div className='flex h-screen  relative '>

                <div className='w-64'>
                    <Sidebar contentNav={ADMIN_NAV_ITEMS} />
                </div>
                <main className=' flex-1 flex flex-col ml-4 scrollbar-hide'>

                    <div className=' pr-6 pb-6 pl-4'>
                        <div className="">
                            <HeaderAdminManager metaRoutes={ADMIN_ROUTE_METADATA} navItems={ADMIN_NAV_ITEMS} />
                        </div>
                        {children}</div>
                </main>
            </div>
        </div>
    </HeroBackground>
}