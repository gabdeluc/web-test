const db = require('@/lib/db');
const { NextResponse } = require('next/server');

export async function GET(request) {
    try {
        const users = db.prepare('SELECT Username FROM Utenti ORDER BY Username').all();

        return NextResponse.json(
            { users: users.map(u => u.Username) },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Errore durante il recupero degli utenti' },
            { status: 500 }
        );
    }
}
