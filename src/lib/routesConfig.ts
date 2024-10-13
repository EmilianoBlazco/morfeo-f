// routesConfig.ts
import GuestLayout from '@/components/layout/GuestLayout';
import AuthLayout from '@/components/layout/AuthLayout';
//import AdminLayout from '@/components/layouts/AdminLayout';
//import MainLayout from '@/components/layouts/MainLayout';

export const routeLayouts = {
    '/login': GuestLayout,
    '/register': GuestLayout,
    '/forgot-password': GuestLayout,
    '/account-recovery': GuestLayout,
    '/verify-account': AuthLayout,
    '/dashboard': AuthLayout,
    '/profile': AuthLayout,
    //'/settings': AuthLayout,
    //'/admin': AdminLayout,
    //'/user': AuthLayout,
    // Layout por defecto
    //'default': MainLayout,
    'default': GuestLayout,
};
