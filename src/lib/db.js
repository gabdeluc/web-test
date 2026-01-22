const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'app.sqlite');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database tables
function initDatabase() {
    // Create Utenti table if not exists (preserving existing structure)
    db.exec(`
    CREATE TABLE IF NOT EXISTS Utenti (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Username TEXT UNIQUE NOT NULL,
      Password TEXT NOT NULL,
      CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // Create Sessions table for authentication
    db.exec(`
    CREATE TABLE IF NOT EXISTS Sessions (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Token TEXT UNIQUE NOT NULL,
      UserID INTEGER NOT NULL,
      CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      ExpiresAt DATETIME NOT NULL,
      FOREIGN KEY (UserID) REFERENCES Utenti(ID) ON DELETE CASCADE
    )
  `);

    // Create Prodotto table
    db.exec(`
    CREATE TABLE IF NOT EXISTS Prodotto (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Nome TEXT(40) NOT NULL,
      Descrizione TEXT(1000),
      Foto BLOB,
      Prezzo REAL NOT NULL
    )
  `);

    console.log('Database initialized successfully');
}

// Initialize on import
initDatabase();

module.exports = db;
