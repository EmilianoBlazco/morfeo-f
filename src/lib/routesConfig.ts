import GuestLayout from '@components/self/layout/GuestLayout';
import AuthLayout from '@components/self/layout/AuthLayout';

export const routeLayouts = {
    '/login': GuestLayout,
    '/register': GuestLayout,
    '/dashboard': AuthLayout,
    '/profile': AuthLayout,
    '/attendances': AuthLayout,
    '/approve-justifications': AuthLayout,
    '/qr-code': AuthLayout,
    '/qr-scan': AuthLayout,
    '/license': AuthLayout,
    'default': GuestLayout,
};
