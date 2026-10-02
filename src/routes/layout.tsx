import HeaderAdminManager from "@/components/common/header";
import Sidebar from "@/components/common/sidebar";
import type { ReactNode } from "react";

export default function LayoutDashboard({ children }: { children: ReactNode }) {
    return <div className="bg-background-primary">
        <div className='flex h-screen  relative '>

            <div className='w-64'>
                <Sidebar />
            </div>
            <main className=' flex-1 flex flex-col ml-4 scrollbar-hide'>

                <div className=' pr-6 pb-6'>
                    <div className="pl-2">
                        <HeaderAdminManager />
                    </div>
                    {children}</div>
            </main>
        </div>
    </div>
}