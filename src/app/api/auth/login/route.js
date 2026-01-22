const db = require('@/lib/db');
const { verifyPassword, createSession } = require('@/lib/auth');
const { NextResponse } = require('next/server');

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        // Validation
        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username e password sono obbligatori' },
                { status: 400 }
            );
        }

        // Find user
        const user = db.prepare('SELECT ID, Username, Password FROM Utenti WHERE Username = ?').get(username);

        if (!user) {
            return NextResponse.json(
                { error: 'Credenziali non valide' },
                { status: 401 }
            );
        }

        // Verify password
        if (!verifyPassword(password, user.Password)) {
            return NextResponse.json(
                { error: 'Credenziali non valide' },
                { status: 401 }
            );
        }

        // Create session
        const sessionToken = createSession(user.ID);

        // Create response with session cookie
        const response = NextResponse.json(
            {
                success: true,
                message: 'Login effettuato con successo',
                user: {
                    id: user.ID,
                    username: user.Username
                }
            },
            { status: 200 }
        );

        // Set HTTP-only cookie
        response.cookies.set('session', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Errore durante il login' },
            { status: 500 }
        );
    }
}
