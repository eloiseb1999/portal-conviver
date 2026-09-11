const express = require('express');
const path = require('path');
const db = require('./db');
const { renderPage } = require('./views');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const buscarPagina = db.prepare('SELECT * FROM paginas WHERE slug = ?');

const rotasDeConteudo = [
  { path: '/constituicao.html', slug: 'constituicao' },
  { path: '/estatuto-do-idoso.html', slug: 'estatuto' },
  { path: '/bpc-loas.html', slug: 'bpc' },
  { path: '/servicos.html', slug: 'servicos' },
];

for (const rota of rotasDeConteudo) {
  app.get(rota.path, (req, res) => {
    const pagina = buscarPagina.get(rota.slug);

    if (!pagina) {
      return res.status(404).send('Página não encontrada.');
    }

    res.send(renderPage({
      slug: rota.slug,
      titulo: pagina.titulo,
      corpoHtml: pagina.corpo_html,
    }));
  });
}

app.use(express.static(path.join(__dirname, 'public')));

const ADMIN_KEY = process.env.ADMIN_KEY || 'conviver2026';

app.get('/api/duvidas', (req, res) => {
  if (req.query.chave !== ADMIN_KEY) {
    return res.status(401).json({ erro: 'Chave de acesso invalida.' });
  }

  const linhas = db.prepare(
    'SELECT nome, telefone, mensagem, criado_em FROM duvidas ORDER BY id DESC'
  ).all();

  res.json(linhas);
});

app.post('/api/duvidas', (req, res) => {
  const { nome, telefone, mensagem } = req.body;

  if (!nome || nome.trim().length < 2) {
    return res.status(400).json({ erro: 'Informe seu nome completo.' });
  }
  if (!mensagem || mensagem.trim().length < 5) {
    return res.status(400).json({ erro: 'Escreva sua duvida com um pouco mais de detalhe.' });
  }

  const inserir = db.prepare(
    'INSERT INTO duvidas (nome, telefone, mensagem, criado_em) VALUES (?, ?, ?, ?)'
  );
  inserir.run(nome.trim(), (telefone || '').trim(), mensagem.trim(), new Date().toISOString());

  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Conviver rodando em http://localhost:${PORT}`);
});
