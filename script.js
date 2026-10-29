// ==========================================================================
// 1. INTERATIVIDADE E VALIDAÇÃO DA NEWSLETTER (CÓDIGO UNIFICADO)
// ==========================================================================
const formNewsletter = document.querySelector('.newsletter__form');
const inputEmail = document.querySelector('.newsletter__input');
const btnSubmit = document.querySelector('.btn--form');

if (formNewsletter && inputEmail) {
    // Criação dinâmica da mensagem de feedback
    const feedbackText = document.createElement('small');
    feedbackText.style.display = 'block';
    feedbackText.style.marginTop = '8px';
    feedbackText.style.fontSize = '0.85rem';
    feedbackText.style.fontWeight = '600';
    inputEmail.parentNode.appendChild(feedbackText);

    // Função que valida o formulário via regex
    function validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email); // Retorna true ou false
    }

    formNewsletter.addEventListener('submit', function(event) {
        event.preventDefault(); // Bloqueia o envio do formulário enquanto validamos
        const emailValor = inputEmail.value.trim();

        // CHECAGEM DE ERRO: Campo vazio ou e-mail fora do padrão
        if (!validarEmail(emailValor)) {
            feedbackText.textContent = '❌ Por favor, digite um e-mail válido (ex: nome@dominio.com).';
            feedbackText.style.color = '#ef4444'; // Vermelho
            inputEmail.style.borderColor = '#ef4444';
            inputEmail.focus(); // Coloca o cursor de volta no campo
        } 
        // SUCESSO
        else {
            feedbackText.textContent = '✅ Inscrição realizada com sucesso!';
            feedbackText.style.color = '#22c55e'; // Verde
            inputEmail.style.borderColor = '#22c55e';

            // Efeito visual no botão (da sua primeira versão)
            if (btnSubmit) {
                btnSubmit.textContent = 'Inscrição Confirmada! 🎉';
                btnSubmit.style.backgroundColor = '#22c55e'; 
            }

            inputEmail.value = ''; // Limpa o campo
            console.log(`[Sucesso] E-mail cadastrado: ${emailValor}`);

            // Oculta a mensagem de sucesso e reseta o botão após 4 segundos
            setTimeout(function() {
                feedbackText.textContent = '';
                inputEmail.style.borderColor = ''; // Restaura a borda padrão
                
                if (btnSubmit) {
                    btnSubmit.textContent = 'Quero Desconto 🎁';
                    btnSubmit.style.backgroundColor = ''; 
                }
            }, 4000);
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
    menuToggle.addEventListener('click', function() {
        headerNav.classList.toggle('header__nav--active');
    });

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

        if (currentTheme === 'light' || (!currentTheme && prefersLight)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.textContent = '☀️';
        }
    });
}