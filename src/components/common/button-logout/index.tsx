import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { stopSignalRConnection } from '@/lib/signalR/signalr-hub';

export default function ButtonLogout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // 1. Dừng kết nối SignalR của tab hiện tại trước khi xóa token
            await stopSignalRConnection();
        } catch (error) {
            console.error("Lỗi khi dừng SignalR:", error);
        }

        // 2. Lấy active email của tab hiện tại để xóa chính xác dữ liệu phiên làm việc này
        const activeEmail = sessionStorage.getItem("shiptrack_active_email");

        if (activeEmail) {
            sessionStorage.removeItem(`accessToken_${activeEmail}`);
            sessionStorage.removeItem(`refreshToken_${activeEmail}`);
            sessionStorage.removeItem(`role_${activeEmail}`);
            sessionStorage.removeItem(`shiptrack_current_user_${activeEmail}`);
        }
        sessionStorage.removeItem("shiptrack_active_email");

        // 3. Dọn dẹp sạch cả các key legacy cũ (cả session lẫn local nếu có)
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('accessToken');
        localStorage.removeItem('token');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('shiptrack_active_email');

        toast.success("Đăng xuất thành công!");

        // 4. Điều hướng về trang login của tab này
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