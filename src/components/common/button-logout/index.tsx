import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';

export default function ButtonLogout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
    };

    return (
        <Button
            type='button'
            onClick={handleLogout}
            variant='default'
            className='w-full justify-start gap-3  py-4 px-2 hover:bg-accent hover:text-accent-foreground hover:border-shiptrack-primary-1 transition-colors'
        >
            <LogOut className='w-5 h-6' />
            <span className='text-sm font-medium'>Đăng xuất</span>
        </Button>
    );
}