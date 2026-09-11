# Conviver

Portal de inclusão digital e direitos do idoso, desenvolvido para o grupo de convivência do CRAS de Flora Rica — SP.

## Rodar localmente

```
npm install
npm start
```

O site abre em `http://localhost:3000`.

## Estrutura

- `server.js` — servidor Express: serve `public/` como arquivos estáticos e gera as páginas de conteúdo (Constituição, Estatuto do Idoso, BPC, Serviços) dinamicamente, a partir do banco.
- `db.js` — conecta ao SQLite (`conviver.db`, gerado automaticamente) e garante as tabelas `duvidas` e `paginas`.
- `seed-conteudo.js` — texto de cada página de conteúdo; é inserido/atualizado na tabela `paginas` toda vez que o servidor sobe.
- `views.js` — monta o HTML (cabeçalho, navegação, rodapé) em torno do conteúdo lido do banco.
- `public/` — páginas estáticas (home, dúvidas, painel admin) e os arquivos de CSS/JS.

O conteúdo do portal (textos de direitos e benefícios) e os registros do formulário de dúvidas ficam no mesmo banco SQLite — as páginas de conteúdo são renderizadas puxando o texto da tabela `paginas` a cada requisição, não estão mais fixas em HTML.

## Publicar no Render

1. Suba este projeto para um repositório no GitHub.
2. No Render, crie um novo **Web Service** apontando para o repositório.
3. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. O Render atribui a porta automaticamente pela variável `PORT`, que o `server.js` já lê.

## Onde ficam as dúvidas enviadas

Cada dúvida enviada pelo formulário é salva na tabela `duvidas` do arquivo `conviver.db`. Para consultar rapidamente, com o projeto rodando, execute:

```
node -e "console.log(require('./db').prepare('select * from duvidas').all())"
```
