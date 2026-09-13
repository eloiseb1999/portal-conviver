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

  CREATE TABLE IF NOT EXISTS avaliacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entendeu TEXT NOT NULL,
    aprendeu_algo TEXT NOT NULL,
    recomendaria TEXT NOT NULL,
    comentario TEXT,
    criado_em TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS paginas (
    slug TEXT PRIMARY KEY,
    titulo TEXT NOT NULL,
    corpo_html TEXT NOT NULL
  );
`);

const inserirPaginaSeNaoExistir = db.prepare(
  'INSERT OR IGNORE INTO paginas (slug, titulo, corpo_html) VALUES (?, ?, ?)'
);

for (const pagina of paginasIniciais) {
  inserirPaginaSeNaoExistir.run(pagina.slug, pagina.titulo, pagina.corpo_html);
}

module.exports = db;
