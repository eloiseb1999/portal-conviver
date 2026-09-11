const Database = require('better-sqlite3');
const path = require('path');
const paginasIniciais = require('./seed-conteudo');

const db = new Database(path.join(__dirname, 'conviver.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS duvidas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT,
    mensagem TEXT NOT NULL,
    criado_em TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS paginas (
    slug TEXT PRIMARY KEY,
    titulo TEXT NOT NULL,
    corpo_html TEXT NOT NULL
  );
`);

const upsertPagina = db.prepare(`
  INSERT INTO paginas (slug, titulo, corpo_html) VALUES (?, ?, ?)
  ON CONFLICT(slug) DO UPDATE SET titulo = excluded.titulo, corpo_html = excluded.corpo_html
`);

for (const pagina of paginasIniciais) {
  upsertPagina.run(pagina.slug, pagina.titulo, pagina.corpo_html);
}

module.exports = db;
