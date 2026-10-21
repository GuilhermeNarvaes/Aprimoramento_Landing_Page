JavaScript
// ==========================================================================
// MÓDULO 3 — AULA 1: INTERATIVIDADE DO FORMULÁRIO DE NEWSLETTER
// ==========================================================================

// 1. CAPTURA DOS ELEMENTOS DA PÁGINA (DOM)
const formNewsletter = document.querySelector('.newsletter__form');
const inputEmail = document.querySelector('.newsletter__input');
const btnSubmit = document.querySelector('.btn--form');

// 2. ESCUTA O EVENTO DE ENVIO ('SUBMIT') DO FORMULÁRIO
formNewsletter.addEventListener('submit', function(event) {
    // Impede o recarregamento padrão da página
    event.preventDefault();

    // Captura o e-mail digitado e remove espaços extras
    const emailValor = inputEmail.value.trim();

    // Validação: verifica se o campo não está vazio
    if (emailValor !== '') {
        // Altera o texto e a cor do botão dinamicamente
        btnSubmit.textContent = 'Inscrição Confirmada! 🎉';
        btnSubmit.style.backgroundColor = '#22c55e'; // Verde de Sucesso

        // Limpa o campo de entrada
        inputEmail.value = '';

        // Exibe o registro no Console do DevTools
        console.log(`[SUCESSO] E-mail cadastrado: ${emailValor}`);

        // Retorna o botão ao estado original após 3 segundos (3000ms)
        setTimeout(function() {
            btnSubmit.textContent = 'Quero Desconto 🎁';
            btnSubmit.style.backgroundColor = ''; // Restaura a cor do CSS original
        }, 5000);
    }
});

const menuToggle = document.querySelector('#menu-toggle');
const headerNav = document.querySelector('#header-nav');

if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', function() {
        // Alterna a classe que exibe/oculta o menu no CSS
        headerNav.classList.toggle('header__nav--active');
    });
}

const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        // Verifica o tema atual no atributo 'data-theme' da tag <html>
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        // Descobre a preferência do sistema operacional caso não tenha atributo definido
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

        // Lógica: Se está claro, força escuro. Se está escuro, força claro.
        if (currentTheme === 'light' || (!currentTheme && prefersLight)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.textContent = '☀️';
        }
    });
}

