import { Link } from 'react-router';

interface Props {
    imageUrl: string;
    title: string;
    content: string;
    href?: string;
}

export default function NotificationContent({
    imageUrl,
    title,
    content,
    href = '/notifications',
}: Props) {
    return (
        <Link
            to={href}
            className='flex items-center max-h-25 hover:bg-gray-100 cursor-pointer rounded-md p-0.5 transition-colors'
        >
            <div className='flex justify-center items-center p-2'>
                <img
                    src={imageUrl}
                    alt='notification'
                    width={25}
                    height={25}
                    draggable={false}
                    loading='lazy'
                    className='object-contain'
                />
            </div>

            <div className='flex-1'>
                <h6 className='text-base font-semibold tracking-tight'>{title}</h6>
                <p
                    className='text-xs leading-relaxed text-gray-600'
                    style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        overflow: 'hidden',
                    }}
                >
                    {content}
                </p>
            </div>
        </Link>
    );
}