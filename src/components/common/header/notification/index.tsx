// src/features/notification/button-notification.tsx
import { PiBellRingingBold } from 'react-icons/pi';
import { Link } from 'react-router';

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';

import NotificationContent from './notification-content';
import {
    NOTIFICATIONS_ALL_HREF,
    NOTIFICATIONS_LIST,
    UNREAD_NOTIFICATION_COUNT,
} from './notification-data';

export default function ButtonNotification() {
    return (
        /* Thêm openDelay và closeDelay để phản hồi ngay lập tức */
        <HoverCard >
            <HoverCardTrigger delay={10} closeDelay={100}
                render={(<Link
                    to='/notifications'
                    className='flex items-center gap-x-2 mr-6 text-black cursor-pointer'
                >
                    <PiBellRingingBold className='text-shopio-primary-color' />
                    <p className='text-xs leading-relaxed text-black'>
                        Thông báo{' '}
                        <span className='text-shopio-primary-color font-medium'>
                            {UNREAD_NOTIFICATION_COUNT}
                        </span>
                    </p>
                </Link>)}
            >

            </HoverCardTrigger>

            <HoverCardContent align='end' className='w-96 relative h-auto h-fit rounded-md shadow-lg'>
                {/* Mũi tên nhỏ */}
                <div className='absolute -top-0.5 right-4 pointer-events-none'>
                    <div className='w-5 h-5 bg-white rotate-45 border-t border-l border-slate-100' />
                </div>

                <div className='flex flex-col gap-2'>
                    <h6 className='mb-2 text-base font-semibold tracking-tight text-gray-500'>
                        Thông báo mới nhất
                    </h6>

                    <div className='flex flex-col gap-y-2 max-h-87.5 overflow-y-auto pr-1'>
                        {NOTIFICATIONS_LIST.map((notification) => (
                            <NotificationContent
                                key={notification.id}
                                imageUrl={notification.imageUrl}
                                title={notification.title}
                                content={notification.message}
                                href={notification.href}
                            />
                        ))}
                    </div>

                    <Separator className='my-1' />

                    <div className='flex justify-center items-center'>
                        <Link
                            to={NOTIFICATIONS_ALL_HREF}
                            className='w-full text-center block text-shopio-primary-color font-medium hover:underline py-1'
                        >
                            Xem tất cả thông báo
                        </Link>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}