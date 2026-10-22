import HeaderAdminManager from "@/components/common/header";
import { CUSTOMER_ROUTE_METADATA } from "@/components/common/header/meta-data/customer-meta-router";
import HeroBackground from "@/components/common/hero-background";
import Sidebar from "@/components/common/sidebar";
import { CUSTOMER_NAV_ITEMS } from "@/components/common/sidebar/navigations/customer-nav-content";
import type { ReactNode } from "react";

export default function CustomerLayout({ children }: { children: ReactNode }) {
    return <HeroBackground>
        <div className="">
            <div className='flex h-screen  relative '>

                <div className='w-64'>
                    <Sidebar contentNav={CUSTOMER_NAV_ITEMS} />
                </div>
                <main className=' flex-1 flex flex-col ml-4 scrollbar-hide'>

                    <div className=' pr-6 pb-6 pl-4'>
                        <div className="">
                            <HeaderAdminManager metaRoutes={CUSTOMER_ROUTE_METADATA} navItems={CUSTOMER_NAV_ITEMS} />
                        </div>
                        {children}</div>
                </main>
            </div>
        </div>
    </HeroBackground>
}