const db = require('@/lib/db');
const { getSession } = require('@/lib/auth');
const { NextResponse } = require('next/server');
const { cookies } = require('next/headers');

export async function GET(request, { params }) {
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

        const { id } = await params;

        // Fetch product with photo
        const product = db.prepare(`
      SELECT ID, Nome, Descrizione, Prezzo, Foto
      FROM Prodotto 
      WHERE ID = ?
    `).get(id);

        if (!product) {
            return NextResponse.json(
                { error: 'Prodotto non trovato' },
                { status: 404 }
            );
        }

        // Convert BLOB to base64 if exists
        if (product.Foto) {
            product.Foto = Buffer.from(product.Foto).toString('base64');
        }

        return NextResponse.json(
            { product },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            { error: 'Errore durante il recupero del prodotto' },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
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

        const { id } = await params;
        const formData = await request.formData();

        const nome = formData.get('nome');
        const descrizione = formData.get('descrizione');
        const prezzo = formData.get('prezzo');
        const foto = formData.get('foto');

        // Validation
        if (!nome || !prezzo) {
            return NextResponse.json(
                { error: 'Nome e prezzo sono obbligatori' },
                { status: 400 }
            );
        }

        const prezzoNum = parseFloat(prezzo);
        if (isNaN(prezzoNum) || prezzoNum < 0) {
            return NextResponse.json(
                { error: 'Prezzo non valido' },
                { status: 400 }
            );
        }

        // Prepare update
        let fotoBuffer = null;
        if (foto && foto.size > 0) {
            // Convert file to buffer
            const bytes = await foto.arrayBuffer();
            fotoBuffer = Buffer.from(bytes);
        }

        // Update product
        let stmt;
        if (fotoBuffer) {
            stmt = db.prepare(`
        UPDATE Prodotto 
        SET Nome = ?, Descrizione = ?, Prezzo = ?, Foto = ?
        WHERE ID = ?
      `);
            stmt.run(nome, descrizione || null, prezzoNum, fotoBuffer, id);
        } else {
            stmt = db.prepare(`
        UPDATE Prodotto 
        SET Nome = ?, Descrizione = ?, Prezzo = ?
        WHERE ID = ?
      `);
            stmt.run(nome, descrizione || null, prezzoNum, id);
        }

        return NextResponse.json(
            { success: true, message: 'Prodotto aggiornato con successo' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json(
            { error: 'Errore durante l\'aggiornamento del prodotto' },
            { status: 500 }
        );
    }
}
