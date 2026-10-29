// ==========================================================================
// 1. INTERATIVIDADE DO FORMULÁRIO DE NEWSLETTER
// ==========================================================================
const formNewsletter = document.querySelector('.newsletter__form');
const inputEmail = document.querySelector('.newsletter__input');
const btnSubmit = document.querySelector('.btn--form');

if (formNewsletter) {
    formNewsletter.addEventListener('submit', function(event) {
        event.preventDefault();
        const emailValor = inputEmail.value.trim();
        
        if (emailValor !== '') {
            btnSubmit.textContent = 'Inscrição Confirmada! 🎉';
            btnSubmit.style.backgroundColor = '#22c55e'; // Verde
            inputEmail.value = '';
            
            setTimeout(function() {
                btnSubmit.textContent = 'Quero Desconto 🎁';
                btnSubmit.style.backgroundColor = ''; 
            }, 5000);
        }
    });
}

// ==========================================================================
// 2. MENU MOBILE (HAMBÚRGUER)
// ==========================================================================
const menuToggle = document.querySelector('.menu-toggle'); 
const headerNav = document.querySelector('#header-nav');

const navLinks = document.querySelectorAll('.header__link');

if (menuToggle && headerNav) {
    // Abre/fecha o menu ao clicar no botão hambúrguer
    menuToggle.addEventListener('click', function() {
        headerNav.classList.toggle('header__nav--active');
    });

    // Percorre todos os links e adiciona o evento de fechar o menu ao clicar
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            headerNav.classList.remove('header__nav--active');
        });
    });
}

// ==========================================================================
// 3. ALTERNADOR DE TEMA (DARK / LIGHT MODE)
// ==========================================================================
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

if (themeToggle && themeIcon) {
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

        // Se o tema atual for claro (ou o sistema for claro e não houver tema definido)
        if (currentTheme === 'light' || (!currentTheme && prefersLight)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.textContent = '☀️';
        }
    });
}

// ==========================================================================
// MÓDULO 3 — AULA 3: VALIDAÇÃO DE FORMULÁRIO COM REGEX E FEEDBACK VISUAL
// ==========================================================================

// 1. SELEÇÃO DOS ELEMENTOS DO DOM
const formNewsletter = document.querySelector('.newsletter__form');
const inputEmail = document.querySelector('.newsletter__input');

// 2. CRIAÇÃO DINÂMICA DA MENSAGEM DE FEEDBACK
const feedbackText = document.createElement('small');
feedbackText.style.display = 'block';
feedbackText.style.marginTop = '8px';
feedbackText.style.fontSize = '0.85rem';
feedbackText.style.fontWeight = '600';

// Insere o elemento <small> logo abaixo do input de e-mail
inputEmail.parentNode.appendChild(feedbackText);

// 3. FUNÇÃO QUE VALIDA O FORMULÁRIO VIA REGEX
function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email); // Retorna true ou false
}

// 4. ESCUTADOR DE EVENTO 'SUBMIT'
formNewsletter.addEventListener('submit', function(event) {
    // Bloqueia o envio do formulário enquanto validamos
    event.preventDefault();

    const emailValor = inputEmail.value.trim();

    // CHECAGEM DE ERRO: Campo vazio ou e-mail fora do padrão
    if (!validarEmail(emailValor)) {
        // Aplica o feedback visual de ERRO
        feedbackText.textContent = '❌ Por favor, digite um e-mail válido (ex: nome@dominio.com).';
        feedbackText.style.color = '#ef4444'; // Vermelho
        inputEmail.style.borderColor = '#ef4444';
        inputEmail.focus(); // Coloca o cursor de volta no campo
    } else {
        // Aplica o feedback visual de SUCESSO
        feedbackText.textContent = '✅ Inscrição realizada com sucesso!';
        feedbackText.style.color = '#22c55e'; // Verde
        inputEmail.style.borderColor = '#22c55e';

        // Limpa o campo de entrada
        inputEmail.value = '';

        console.log(`[Sucesso] E-mail cadastrado: ${emailValor}`);

        // Oculta a mensagem de sucesso após 4 segundos
        setTimeout(function() {
            feedbackText.textContent = '';
            inputEmail.style.borderColor = ''; // Restaura a borda padrão do CSS
        }, 4000);
    }
});