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
// // 3. ALTERNADOR DE TEMA (DARK / LIGHT MODE)
// // ==========================================================================
// const themeToggle = document.querySelector('#theme-toggle');
// const themeIcon = document.querySelector('.theme-icon');

// if (themeToggle && themeIcon) {
//     themeToggle.addEventListener('click', function() {
//         const currentTheme = document.documentElement.getAttribute('data-theme');
//         const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

//         if (currentTheme === 'light' || (!currentTheme && prefersLight)) {
//             document.documentElement.setAttribute('data-theme', 'dark');
//             themeIcon.textContent = '🌙';
//         } else {
//             document.documentElement.setAttribute('data-theme', 'light');
//             themeIcon.textContent = '☀️';
//         }
//     });
// }

// MÓDULO 3: PERSISTÊNCIA E SOBREPOSIÇÃO DO TEMA (LOCALSTORAGE)
// ==========================================================================
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

if (themeToggle && themeIcon) {
    // 1. LER A PREFERÊNCIA SALVA AO CARREGAR A PÁGINA
    const temaSalvo = localStorage.getItem('temaPreferido');

    // Força o tema salvo ignorando o sistema operacional
    if (temaSalvo === 'light') {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        themeIcon.textContent = '☀️';
    } else if (temaSalvo === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        themeIcon.textContent = '🌙';
    }

    // 2. ALTERNAR O TEMA AO CLICAR NO BOTÃO
    themeToggle.addEventListener('click', function() {
        // Verifica qual tema está ativo agora. 
        // Se não tiver classe, checamos se o sistema operacional é claro.
        const isLightClass = document.body.classList.contains('light-theme');
        const isDarkClass = document.body.classList.contains('dark-theme');
        const sistemaEClaro = window.matchMedia('(prefers-color-scheme: light)').matches;

        let novoTema;

        // Lógica: se o site está claro, muda para escuro. Senão, muda para claro.
        if (isLightClass || (!isLightClass && !isDarkClass && sistemaEClaro)) {
            // Mudando para o Escuro
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeIcon.textContent = '🌙';
            novoTema = 'dark';
        } else {
            // Mudando para o Claro
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeIcon.textContent = '☀️';
            novoTema = 'light';
        }

        // Salva a escolha no navegador
        localStorage.setItem('temaPreferido', novoTema);
        console.log(`[LocalStorage] Preferência atualizada para: ${novoTema}`);
    });
}
