// src/components/common/button-logout.tsx
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
            className='w-full justify-start gap-3 bg-black text-white hover:bg-zinc-800 active:bg-zinc-900'
        >
            <LogOut className='w-5 h-5' />
            <span className='text-sm font-medium'>Đăng xuất</span>
        </Button>
    );
}