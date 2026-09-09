# Conviver

Portal de inclusão digital e direitos do idoso, desenvolvido para o grupo de convivência do CRAS de Flora Rica — SP.

## Rodar localmente

```
npm install
npm start
```

O site abre em `http://localhost:3000`.

## Estrutura

- `server.js` — servidor Express, serve o site e recebe o formulário de dúvidas.
- `db.js` — cria e conecta o banco SQLite (`conviver.db`, gerado automaticamente na primeira execução).
- `public/` — todo o front-end (páginas, CSS e JavaScript).

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
