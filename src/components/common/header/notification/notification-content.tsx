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
            // Hover đổi sang nền hồng nhạt (accent) để đồng bộ với Sidebar
            className='flex items-center max-h-25 hover:bg-accent cursor-pointer rounded-md p-2 transition-colors group'
        >
            <div className='flex justify-center items-center p-2 shrink-0'>
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

            <div className='flex-1 min-w-0'> {/* Thêm min-w-0 để text truncate chuẩn */}
                {/* Tiêu đề: Màu chữ chính, hover đổi sang màu Primary */}
                <h6 className='text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors truncate'>
                    {title}
                </h6>
                {/* Nội dung: Màu chữ phụ (subtitle) */}
                <p
                    className='text-xs leading-relaxed text-muted-foreground mt-0.5'
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