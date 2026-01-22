const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

/**
 * Hash a password using SHA-256
 */
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Verify a password against a hash
 */
function verifyPassword(password, hash) {
    return hashPassword(password) === hash;
}

/**
 * Create a new session for a user
 * Returns the session token
 */
function createSession(userId) {
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiration

    const stmt = db.prepare(`
    INSERT INTO Sessions (Token, UserID, ExpiresAt)
    VALUES (?, ?, ?)
  `);

    stmt.run(token, userId, expiresAt.toISOString());

    return token;
}

/**
 * Get session and user info from token
 * Returns null if session doesn't exist or is expired
 */
function getSession(token) {
    if (!token) return null;

    const stmt = db.prepare(`
    SELECT 
      s.ID as SessionID,
      s.Token,
      s.ExpiresAt,
      u.ID as UserID,
      u.Username
    FROM Sessions s
    JOIN Utenti u ON s.UserID = u.ID
    WHERE s.Token = ? AND s.ExpiresAt > datetime('now')
  `);

    const session = stmt.get(token);
    return session || null;
}

/**
 * Delete a session (logout)
 */
function deleteSession(token) {
    if (!token) return;

    const stmt = db.prepare('DELETE FROM Sessions WHERE Token = ?');
    stmt.run(token);
}

/**
 * Clean up expired sessions
 */
function cleanupExpiredSessions() {
    const stmt = db.prepare("DELETE FROM Sessions WHERE ExpiresAt <= datetime('now')");
    stmt.run();
}

// Run cleanup on import
cleanupExpiredSessions();

module.exports = {
    hashPassword,
    verifyPassword,
    createSession,
    getSession,
    deleteSession,
    cleanupExpiredSessions
};
