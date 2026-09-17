# Conviver

Portal web de inclusão digital e acesso a informações sobre direitos e benefícios da pessoa idosa.

## Descrição

O **Conviver** é uma aplicação web desenvolvida no contexto da Atividade Extensionista II do curso de Análise e Desenvolvimento de Sistemas. O projeto tem como objetivo disponibilizar informações sobre direitos, benefícios e serviços destinados à pessoa idosa por meio de uma interface simples, responsiva e com recursos de acessibilidade.

A aplicação possui arquitetura baseada em **front-end, back-end e banco de dados**, com conteúdo informativo armazenado e carregado dinamicamente.

## Tecnologias

- **HTML5** — estrutura das páginas;
- **CSS3** — estilização, layout, responsividade e acessibilidade visual;
- **JavaScript** — interações e funcionalidades do front-end;
- **Node.js** — ambiente de execução do back-end;
- **Express** — framework utilizado na implementação do servidor e das rotas HTTP;
- **SQLite** — banco de dados relacional;
- **better-sqlite3** — acesso ao banco de dados;
- **npm** — gerenciamento de dependências e execução do projeto;
- **Git/GitHub** — versionamento e armazenamento do código-fonte;
- **Render** — hospedagem da aplicação.

## Funcionalidades

- Consulta de informações sobre a Constituição Federal;
- Consulta de informações sobre o Estatuto do Idoso;
- Informações sobre o Benefício de Prestação Continuada (BPC);
- Informações sobre serviços e benefícios;
- Navegação entre as páginas por meio de menu integrado;
- Controle de tamanho do texto;
- Interface responsiva;
- Formulário para envio de dúvidas;
- Persistência das dúvidas no banco de dados;
- Armazenamento dos conteúdos das páginas em SQLite;
- Endpoints para consulta e gerenciamento dos dados da aplicação.

## Arquitetura

```text
Usuário
   │
   ▼
Interface Web
HTML5 + CSS3 + JavaScript
   │
   ▼
Node.js + Express
   │
   ├── Rotas de conteúdo
   ├── APIs
   └── Processamento de formulários
   │
   ▼
SQLite
   │
   └── better-sqlite3
```

O servidor Express disponibiliza as páginas e APIs da aplicação. O conteúdo informativo é armazenado na tabela `paginas` e carregado dinamicamente pelo back-end. Os registros enviados pelo formulário de dúvidas são armazenados na tabela `duvidas`.

## Estrutura do projeto

```text
portal-conviver/
├── public/
│   ├── index.html
│   ├── duvidas.html
│   ├── admin.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── db.js
├── server.js
├── seed-conteudo.js
├── views.js
├── package.json
├── package-lock.json
└── .gitignore
```

### Principais arquivos

- `server.js` — inicialização do servidor, rotas e APIs;
- `db.js` — conexão e inicialização do banco SQLite;
- `seed-conteudo.js` — conteúdo inicial das páginas;
- `views.js` — renderização das páginas dinâmicas;
- `public/index.html` — página inicial;
- `public/duvidas.html` — formulário de dúvidas;
- `public/admin.html` — interface administrativa;
- `public/css/style.css` — estilos e responsividade;
- `public/js/main.js` — interações do front-end.

## Banco de dados

O projeto utiliza SQLite para persistência.

Principais tabelas:

| Tabela | Finalidade |
|---|---|
| `paginas` | Armazenamento dos conteúdos informativos |
| `duvidas` | Armazenamento das dúvidas enviadas pelos usuários |
| `avaliacoes` | Armazenamento dos registros de avaliação |

## Acessibilidade

A interface foi desenvolvida considerando características voltadas à legibilidade e facilidade de utilização, incluindo:

- tipografia ampliada;
- controle de escala do texto;
- contraste visual;
- estados de foco;
- layout responsivo;
- navegação adaptada para telas menores.

O controle de texto disponibiliza três níveis de escala:

```text
1.00x
1.15x
1.30x
```

## Execução local

### Requisitos

- Node.js
- npm

### Instalação

```bash
npm install
```

### Inicialização

```bash
npm start
```

A aplicação será disponibilizada, por padrão, em:

```text
http://localhost:3000
```

## Deploy

A aplicação foi publicada utilizando a plataforma **Render**.

Configuração utilizada:

```text
Build Command: npm install
Start Command: npm start
```

O projeto utiliza o Render como ambiente de hospedagem da aplicação.

## Acessos

**Aplicação publicada:**  
https://portal-conviver.onrender.com

**Vídeo demonstrativo:**  
https://drive.google.com/file/d/1RQersnjpDbIdJRnyb2YOEm2-6N7-zTwi/view?usp=sharing

## Contexto acadêmico

Projeto desenvolvido para a **Atividade Extensionista II – Tecnologia Aplicada à Inclusão Digital – Projeto**, do curso de **Análise e Desenvolvimento de Sistemas – UNINTER**.
