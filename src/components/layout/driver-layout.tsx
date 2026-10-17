import HeaderAdminManager from "@/components/common/header";
import { DRIVER_ROUTE_METADATA } from "@/components/common/header/meta-data/driver-meta-router";
import HeroBackground from "@/components/common/hero-background";
import Sidebar from "@/components/common/sidebar";
import { DRIVER_NAV_ITEMS } from "@/components/common/sidebar/navigations/driver-nav-content";
import type { ReactNode } from "react";

export default function DriverLayout({ children }: { children: ReactNode }) {
    return <HeroBackground>
        <div className="">
            <div className='flex h-screen  relative '>

                <div className='w-64'>
                    <Sidebar contentNav={DRIVER_NAV_ITEMS} />
                </div>
                <main className=' flex-1 flex flex-col ml-4 scrollbar-hide'>

                    <div className=' pr-6 pb-6'>
                        <div className="pl-2">
                            <HeaderAdminManager metaRoutes={DRIVER_ROUTE_METADATA} navItems={DRIVER_NAV_ITEMS} />
                        </div>
                        {children}</div>
                </main>
            </div>
        </div>
    </HeroBackground>
}