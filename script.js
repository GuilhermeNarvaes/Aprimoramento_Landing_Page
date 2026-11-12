// ==========================================================================
// 1. INTERATIVIDADE E VALIDAÇÃO DA NEWSLETTER
// ==========================================================================
const formNewsletter = document.querySelector('.newsletter__form');
const inputEmail = document.querySelector('.newsletter__input');
const btnSubmit = document.querySelector('.btn--form');

if (formNewsletter && inputEmail) {
    const feedbackText = document.createElement('small');
    feedbackText.style.display = 'block';
    feedbackText.style.marginTop = '8px';
    feedbackText.style.fontSize = '0.85rem';
    feedbackText.style.fontWeight = '600';
    inputEmail.parentNode.appendChild(feedbackText);

    function validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }

    formNewsletter.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const emailValor = inputEmail.value.trim();

        if (!validarEmail(emailValor)) {
            feedbackText.textContent = '❌ Por favor, digite um e-mail válido (ex: nome@dominio.com).';
            feedbackText.style.color = '#ef4444'; 
            inputEmail.style.borderColor = '#ef4444';
            inputEmail.focus(); 
        } else {
            feedbackText.textContent = '✅ Inscrição realizada com sucesso!';
            feedbackText.style.color = '#22c55e'; 
            inputEmail.style.borderColor = '#22c55e';

            if (btnSubmit) {
                btnSubmit.textContent = 'Inscrição Confirmada! 🎉';
                btnSubmit.style.backgroundColor = '#22c55e'; 
            }

            inputEmail.value = ''; 
            console.log(`[Sucesso] E-mail cadastrado: ${emailValor}`);

            setTimeout(function() {
                feedbackText.textContent = '';
                inputEmail.style.borderColor = ''; 
                
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
// 3. ALTERNADOR DE TEMA COM LOCALSTORAGE (DARK / LIGHT MODE)
// ==========================================================================
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

if (themeToggle && themeIcon) {
    // 1. LER A PREFERÊNCIA SALVA AO CARREGAR A PÁGINA
    const temaSalvo = localStorage.getItem('temaPreferido');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    // Lógica: Usa o tema salvo. Se não houver tema salvo, olha a preferência do sistema.
    if (temaSalvo === 'light' || (!temaSalvo && prefersLight)) {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.textContent = '☀️';
    } else if (temaSalvo === 'dark' || (!temaSalvo && !prefersLight)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '🌙';
    }

    // 2. MUDAR O TEMA AO CLICAR NO BOTÃO
    themeToggle.addEventListener('click', function() {
        // Pega o tema atual direto do atributo do HTML
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let novoTema;

        // Se está claro, muda para escuro. Senão, muda para claro.
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '🌙';
            novoTema = 'dark';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.textContent = '☀️';
            novoTema = 'light';
        }

        // Salva a escolha no navegador (no localStorage)
        localStorage.setItem('temaPreferido', novoTema);
        console.log(`[LocalStorage] Preferência atualizada para: ${novoTema}`);
    });
}

// ==========================================================================
// 4. AVISO DE PROJETO ACADÊMICO
// ==========================================================================
const studentWarning = document.querySelector('#student-warning');
const closeWarningBtn = document.querySelector('#close-warning');

if (studentWarning && closeWarningBtn) {
    // 1. Verifica se o usuário já fechou o aviso no passado
    const avisoFechado = localStorage.getItem('avisoEstudanteFechado');

    if (avisoFechado === 'true') {
        studentWarning.style.display = 'none'; // Esconde a barra imediatamente
    }

    // 2. Quando clicar no botão de fechar (✖)
    closeWarningBtn.addEventListener('click', function() {
        studentWarning.style.display = 'none'; // Some com a barra
        localStorage.setItem('avisoEstudanteFechado', 'true'); // Salva a escolha
    });
}