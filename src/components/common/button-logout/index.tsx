import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { stopSignalRConnection } from '@/lib/signalR/signalr-hub';

export default function ButtonLogout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // 2. Dừng kết nối SignalR trước khi xóa token và chuyển trang
            await stopSignalRConnection();
        } catch (error) {
            console.error("Lỗi khi dừng SignalR:", error);
        }

        // 3. Xóa toàn bộ thông tin xác thực lưu trong Storage
        localStorage.removeItem('token');
        localStorage.removeItem('accessToken'); // Nếu bạn lưu với key này

        toast.success("Đăng xuất thành công!");

        // 4. Điều hướng về trang login
        navigate('/login', { replace: true });
    };

    return (
        <Button
            type='button'
            onClick={handleLogout}
            variant='default'
            className='w-full justify-start gap-3 py-4 px-2 hover:bg-accent hover:text-accent-foreground hover:border-shiptrack-primary-1 transition-colors'
        >
            <LogOut className='w-5 h-6' />
            <span className='text-sm font-medium'>Đăng xuất</span>
        </Button>
    );
}