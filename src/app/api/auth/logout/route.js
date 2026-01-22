const { deleteSession } = require('@/lib/auth');
const { NextResponse } = require('next/server');
const { cookies } = require('next/headers');

export async function POST(request) {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get('session')?.value;

        if (sessionToken) {
            deleteSession(sessionToken);
        }

        const response = NextResponse.json(
            { success: true, message: 'Logout effettuato con successo' },
            { status: 200 }
        );

        // Clear session cookie
        response.cookies.delete('session');

        return response;

    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Errore durante il logout' },
            { status: 500 }
        );
    }
}
