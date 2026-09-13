const express = require('express');
const path = require('path');
const db = require('./db');
const { renderPage } = require('./views');
const paginasIniciais = require('./seed-conteudo');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const buscarPagina = db.prepare('SELECT * FROM paginas WHERE slug = ?');
const listarPaginas = db.prepare('SELECT slug, titulo, corpo_html FROM paginas ORDER BY slug');
const atualizarPagina = db.prepare('UPDATE paginas SET titulo = ?, corpo_html = ? WHERE slug = ?');

const paginasIniciaisPorSlug = Object.fromEntries(
  paginasIniciais.map((pagina) => [pagina.slug, pagina])
);

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

const buscarAvaliacoes = db.prepare(
  'SELECT entendeu, aprendeu_algo, recomendaria, comentario, criado_em FROM avaliacoes ORDER BY id DESC'
);

app.get('/api/avaliacoes', (req, res) => {
  if (req.query.chave !== ADMIN_KEY) {
    return res.status(401).json({ erro: 'Chave de acesso invalida.' });
  }
  res.json(buscarAvaliacoes.all());
});

app.post('/api/avaliacoes', (req, res) => {
  const { entendeu, aprendeu_algo, recomendaria, comentario } = req.body;

  if (!entendeu || !aprendeu_algo || !recomendaria) {
    return res.status(400).json({ erro: 'Responda todas as perguntas antes de enviar.' });
  }

  const inserir = db.prepare(
    'INSERT INTO avaliacoes (entendeu, aprendeu_algo, recomendaria, comentario, criado_em) VALUES (?, ?, ?, ?, ?)'
  );
  inserir.run(entendeu, aprendeu_algo, recomendaria, (comentario || '').trim(), new Date().toISOString());

  res.json({ ok: true });
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

function checarChave(req, res) {
  if (req.query.chave !== ADMIN_KEY) {
    res.status(401).json({ erro: 'Chave de acesso invalida.' });
    return false;
  }
  return true;
}

app.get('/api/paginas', (req, res) => {
  if (!checarChave(req, res)) return;
  res.json(listarPaginas.all());
});

app.post('/api/paginas/:slug', (req, res) => {
  if (!checarChave(req, res)) return;

  const { slug } = req.params;
  const { titulo, corpo_html: corpoHtml } = req.body;

  if (!titulo || !titulo.trim()) {
    return res.status(400).json({ erro: 'O titulo nao pode ficar vazio.' });
  }
  if (!corpoHtml || !corpoHtml.trim()) {
    return res.status(400).json({ erro: 'O conteudo nao pode ficar vazio.' });
  }

  const resultado = atualizarPagina.run(titulo.trim(), corpoHtml, slug);

  if (resultado.changes === 0) {
    return res.status(404).json({ erro: 'Pagina nao encontrada.' });
  }

  res.json({ ok: true });
});

app.post('/api/paginas/:slug/restaurar', (req, res) => {
  if (!checarChave(req, res)) return;

  const original = paginasIniciaisPorSlug[req.params.slug];

  if (!original) {
    return res.status(404).json({ erro: 'Pagina nao encontrada.' });
  }

  atualizarPagina.run(original.titulo, original.corpo_html, original.slug);
  res.json({ ok: true, pagina: original });
});

app.listen(PORT, () => {
  console.log(`Conviver rodando em http://localhost:${PORT}`);
});
