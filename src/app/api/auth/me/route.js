const { getSession } = require('@/lib/auth');
const { NextResponse } = require('next/server');
const { cookies } = require('next/headers');

export async function GET(request) {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get('session')?.value;

        if (!sessionToken) {
            return NextResponse.json(
                { authenticated: false },
                { status: 401 }
            );
        }

        const session = getSession(sessionToken);

        if (!session) {
            return NextResponse.json(
                { authenticated: false },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                authenticated: true,
                user: {
                    id: session.UserID,
                    username: session.Username
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json(
            { error: 'Errore durante la verifica dell\'autenticazione' },
            { status: 500 }
        );
    }
}
