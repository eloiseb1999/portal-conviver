const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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
