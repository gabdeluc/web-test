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

        // Fetch all products (without BLOB data for performance)
        const products = db.prepare(`
      SELECT ID, Nome, Prezzo, 
             CASE WHEN Foto IS NOT NULL THEN 1 ELSE 0 END as HasFoto
      FROM Prodotto 
      ORDER BY Nome
    `).all();

        return NextResponse.json(
            { products },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Errore durante il recupero dei prodotti' },
            { status: 500 }
        );
    }
}
