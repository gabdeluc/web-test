const db = require('../lib/db');

const products = [
    {
        nome: 'MacBook Pro 16"',
        descrizione: 'Potente laptop professionale con chip M3 Pro, 16GB RAM, 512GB SSD. Ideale per sviluppatori e creativi.',
        prezzo: 2799.99
    },
    {
        nome: 'iPhone 15 Pro',
        descrizione: 'Smartphone premium con fotocamera da 48MP, chip A17 Pro, display ProMotion da 6.1 pollici.',
        prezzo: 1199.99
    },
    {
        nome: 'AirPods Pro (2ª gen)',
        descrizione: 'Auricolari wireless con cancellazione attiva del rumore, audio spaziale e custodia MagSafe.',
        prezzo: 279.99
    },
    {
        nome: 'iPad Air',
        descrizione: 'Tablet versatile con chip M1, display Liquid Retina da 10.9", supporto Apple Pencil.',
        prezzo: 699.99
    },
    {
        nome: 'Apple Watch Series 9',
        descrizione: 'Smartwatch con sensore di temperatura, ECG, monitoraggio sonno e fitness avanzato.',
        prezzo: 449.99
    },
    {
        nome: 'Magic Keyboard',
        descrizione: 'Tastiera wireless con layout italiano, batteria ricaricabile, design sottile e elegante.',
        prezzo: 109.99
    },
    {
        nome: 'Magic Mouse',
        descrizione: 'Mouse wireless Multi-Touch con superficie ottimizzata per gesti e scorrimento fluido.',
        prezzo: 89.99
    },
    {
        nome: 'Studio Display',
        descrizione: 'Monitor 5K da 27 pollici con True Tone, fotocamera Center Stage e audio spaziale.',
        prezzo: 1799.99
    },
    {
        nome: 'HomePod mini',
        descrizione: 'Speaker intelligente compatto con Siri, audio a 360°, compatibile con HomeKit.',
        prezzo: 109.99
    },
    {
        nome: 'AirTag (confezione da 4)',
        descrizione: 'Localizzatori Bluetooth per ritrovare oggetti smarriti tramite rete Dov\'è.',
        prezzo: 119.99
    },
    {
        nome: 'Mac mini M2',
        descrizione: 'Desktop compatto con chip M2, 8GB RAM, 256GB SSD, perfetto per ufficio e casa.',
        prezzo: 699.99
    },
    {
        nome: 'Apple TV 4K',
        descrizione: 'Media player con supporto Dolby Vision/Atmos, chip A15 Bionic, telecomando Siri.',
        prezzo: 179.99
    },
    {
        nome: 'Beats Studio Pro',
        descrizione: 'Cuffie over-ear con cancellazione del rumore, audio spaziale personalizzato, 40 ore di autonomia.',
        prezzo: 399.99
    },
    {
        nome: 'MagSafe Battery Pack',
        descrizione: 'Batteria esterna magnetica per iPhone con ricarica wireless, design compatto.',
        prezzo: 109.99
    },
    {
        nome: 'Apple Pencil (2ª gen)',
        descrizione: 'Stylus di precisione con ricarica magnetica, doppio tap per cambiare strumento.',
        prezzo: 139.99
    }
];

function seedDatabase() {
    // Check if products already exist
    const count = db.prepare('SELECT COUNT(*) as count FROM Prodotto').get();

    if (count.count > 0) {
        console.log('Database already contains products. Skipping seed.');
        return;
    }

    const insert = db.prepare(`
    INSERT INTO Prodotto (Nome, Descrizione, Prezzo)
    VALUES (?, ?, ?)
  `);

    const insertMany = db.transaction((products) => {
        for (const product of products) {
            insert.run(product.nome, product.descrizione, product.prezzo);
        }
    });

    insertMany(products);
    console.log(`Successfully seeded ${products.length} products`);
}

// Run seed
seedDatabase();
