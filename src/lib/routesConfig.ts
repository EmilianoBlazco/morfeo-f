import GuestLayout from '@components/self/layout/GuestLayout';
import AuthLayout from '@components/self/layout/AuthLayout';

export const routeLayouts = {
    '/login': GuestLayout,
    '/register': GuestLayout,
    '/forgot-password': GuestLayout,
    '/account-recovery': GuestLayout,
    '/verify-account': AuthLayout,
    '/dashboard': AuthLayout,
    '/profile': AuthLayout,
    '/qr-code': AuthLayout,
    '/qr-scan': AuthLayout,
    '/license': AuthLayout,
    //'/settings': AuthLayout,
    //'/admin': AdminLayout,
    //'/user': AuthLayout,
    // Layout por defecto
    //'default': MainLayout,
    'default': GuestLayout,
};
