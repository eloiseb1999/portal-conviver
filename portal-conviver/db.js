const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'conviver.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS duvidas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT,
    mensagem TEXT NOT NULL,
    criado_em TEXT NOT NULL
  )
`);

module.exports = db;
