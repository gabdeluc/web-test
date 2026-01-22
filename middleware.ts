import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/prodotti'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the current path is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    if (isProtectedRoute) {
        // Check for session cookie
        const sessionToken = request.cookies.get('session')?.value;

        if (!sessionToken) {
            // Redirect to home page if not authenticated
            return NextResponse.redirect(new URL('/', request.url));
        }

        // Note: We can't verify the session here in Edge runtime
        // The actual verification happens in the API routes and page components
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
