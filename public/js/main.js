const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');
const navToggleLabel = navToggle ? navToggle.querySelector('.nav-toggle-label') : null;

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const aberto = siteNav.classList.toggle('aberto');
    navToggle.setAttribute('aria-expanded', aberto);
    navToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    if (navToggleLabel) {
      navToggleLabel.textContent = aberto ? 'Fechar' : 'Menu';
    }
  });
}

const escalasDeTexto = [1, 1.15, 1.3];
const chaveArmazenamento = 'conviver-escala-texto';

function aplicarEscala(indice) {
  document.documentElement.style.setProperty('--font-scale', escalasDeTexto[indice]);
  localStorage.setItem(chaveArmazenamento, indice);
}

const indiceSalvo = Number(localStorage.getItem(chaveArmazenamento));
aplicarEscala(Number.isInteger(indiceSalvo) && escalasDeTexto[indiceSalvo] ? indiceSalvo : 0);

document.querySelectorAll('[data-font-step]').forEach((botao) => {
  botao.addEventListener('click', () => {
    const passo = Number(botao.dataset.fontStep);
    const atual = Number(localStorage.getItem(chaveArmazenamento)) || 0;
    const proximo = passo === 0 ? 0 : Math.min(Math.max(atual + passo, 0), escalasDeTexto.length - 1);
    aplicarEscala(proximo);
  });
});

const form = document.getElementById('duvida-form');
const feedback = document.getElementById('form-feedback');

if (form) {
  form.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const botao = form.querySelector('button[type="submit"]');
    const dados = {
      nome: form.nome.value,
      telefone: form.telefone.value,
      mensagem: form.mensagem.value,
    };

    botao.disabled = true;
    feedback.textContent = 'Enviando...';
    feedback.className = '';

    try {
      const resposta = await fetch('/api/duvidas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });
      const corpo = await resposta.json();

      if (!resposta.ok) {
        feedback.textContent = corpo.erro || 'Nao foi possivel enviar. Tente novamente.';
        feedback.className = 'erro';
      } else {
        feedback.textContent = 'Sua duvida foi enviada. Em breve alguem da equipe entra em contato.';
        feedback.className = 'sucesso';
        form.reset();
      }
    } catch (erro) {
      feedback.textContent = 'Sem conexao no momento. Tente novamente em alguns minutos.';
      feedback.className = 'erro';
    } finally {
      botao.disabled = false;
    }
  });
}
