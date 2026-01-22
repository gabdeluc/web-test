const db = require('@/lib/db');
const { hashPassword } = require('@/lib/auth');
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

        if (username.length < 3) {
            return NextResponse.json(
                { error: 'Lo username deve essere di almeno 3 caratteri' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'La password deve essere di almeno 6 caratteri' },
                { status: 400 }
            );
        }

        // Check if username already exists
        const existingUser = db.prepare('SELECT ID FROM Utenti WHERE Username = ?').get(username);

        if (existingUser) {
            return NextResponse.json(
                { error: 'Username già esistente' },
                { status: 409 }
            );
        }

        // Hash password and create user
        const hashedPassword = hashPassword(password);
        const stmt = db.prepare('INSERT INTO Utenti (Username, Password) VALUES (?, ?)');
        const result = stmt.run(username, hashedPassword);

        return NextResponse.json(
            {
                success: true,
                message: 'Registrazione completata con successo',
                userId: result.lastInsertRowid
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Errore durante la registrazione' },
            { status: 500 }
        );
    }
}
