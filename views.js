const NAV_LINKS = [
  { slug: 'constituicao', href: 'constituicao.html', label: 'Constituição' },
  { slug: 'estatuto', href: 'estatuto-do-idoso.html', label: 'Estatuto do Idoso' },
  { slug: 'bpc', href: 'bpc-loas.html', label: 'BPC' },
  { slug: 'servicos', href: 'servicos.html', label: 'Serviços' },
  { slug: 'duvidas', href: 'duvidas.html', label: 'Dúvidas' },
];

function renderNav(ativo) {
  return NAV_LINKS.map((link) => {
    const atual = link.slug === ativo ? ' aria-current="page"' : '';
    return `<a href="${link.href}"${atual}>${link.label}</a>`;
  }).join('\n      ');
}

function renderPage({ slug, titulo, corpoHtml }) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${titulo} — Conviver</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
  <div class="header-inner">
    <a class="wordmark" href="index.html">Conviver</a>
    <nav class="site-nav" id="site-nav">
      ${renderNav(slug)}
    </nav>
    <div class="header-actions">
      <div class="font-size-control" role="group" aria-label="Ajustar tamanho do texto">
        <button type="button" data-font-step="-1" aria-label="Diminuir texto">A-</button>
        <button type="button" data-font-step="0" aria-label="Texto padrão">A</button>
        <button type="button" data-font-step="1" aria-label="Aumentar texto">A+</button>
      </div>
      <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Abrir menu">
        <span class="nav-toggle-icon"><span></span><span></span><span></span></span>
        <span class="nav-toggle-label">Menu</span>
      </button>
    </div>
  </div>
</header>

<main class="page">
  <div class="page-inner">
    ${corpoHtml}
  </div>
</main>

<footer class="site-footer">
  <div class="footer-inner">
    <p>Projeto desenvolvido para ajudar pessoas idosas a acessar seus direitos com mais autonomia.</p>
    <p class="footer-meta">Projeto alinhado aos Objetivos de Desenvolvimento Sustentável Educação de Qualidade e Redução das Desigualdades.</p>
  </div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
`;
}

module.exports = { renderPage };
