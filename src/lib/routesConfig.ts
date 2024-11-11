// routesConfig.ts
import GuestLayout from '@components/self/layout/GuestLayout';
import AuthLayout from '@components/self/layout/AuthLayout';

export const routeLayouts = {
    '/login': GuestLayout,
    '/register': GuestLayout,
    '/dashboard': AuthLayout,
    '/profile': AuthLayout,
    '/justification': AuthLayout,
    'default': GuestLayout,
};
