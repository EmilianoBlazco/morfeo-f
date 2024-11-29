import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get('authToken')?.value;
    const { pathname } = request.nextUrl;

    // Rutas públicas que no requieren autenticación
    const publicRoutes = ['/login', '/register','/justification'];

    // Si el usuario está autenticado y está en la raíz o en login/register, redirigir a /learn
    if (authToken && (pathname === '/' || publicRoutes.includes(pathname))) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Si el usuario no está autenticado y trata de acceder a cualquier ruta excepto las públicas, redirigir a login
    /*if (!authToken && !publicRoutes.includes(pathname) && pathname !== '/') {
        return NextResponse.redirect(new URL('/login', request.url));
    }*/

    // En cualquier otro caso, permitir que la solicitud continúes
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};