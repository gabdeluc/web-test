const db = require('@/lib/db');
const { getSession } = require('@/lib/auth');
const { NextResponse } = require('next/server');
const { cookies } = require('next/headers');

export async function GET(request) {
    try {
        // Verify authentication
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get('session')?.value;
        const session = getSession(sessionToken);

        if (!session) {
            return NextResponse.json(
                { error: 'Non autenticato' },
                { status: 401 }
            );
        }

        // Get user count
        const userCount = db.prepare('SELECT COUNT(*) as count FROM Utenti').get();

        // Get product count
        const productCount = db.prepare('SELECT COUNT(*) as count FROM Prodotto').get();

        // Get session count (active sessions)
        const sessionCount = db.prepare("SELECT COUNT(*) as count FROM Sessions WHERE ExpiresAt > datetime('now')").get();

        return NextResponse.json(
            {
                users: userCount.count,
                products: productCount.count,
                sessions: sessionCount.count
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json(
            { error: 'Errore durante il recupero delle statistiche' },
            { status: 500 }
        );
    }
}
