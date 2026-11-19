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

if (themeToggle) {
    const temaSalvo = localStorage.getItem('temaPreferido');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    // Define o tema ao carregar a página
    if (temaSalvo === 'light' || (!temaSalvo && prefersLight)) {
        document.documentElement.setAttribute('data-theme', 'light');
    } else if (temaSalvo === 'dark' || (!temaSalvo && !prefersLight)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Alterna o tema ao clicar
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let novoTema;

        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            novoTema = 'dark';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            novoTema = 'light';
        }

        localStorage.setItem('temaPreferido', novoTema);
    });
}

// ==========================================================================
// 4. AVISO DE PROJETO ACADÊMICO (SEMPRE VISÍVEL AO ATUALIZAR)
// ==========================================================================
const studentWarning = document.querySelector('#student-warning');
const closeWarningBtn = document.querySelector('#close-warning');

if (studentWarning && closeWarningBtn) {
    // Apenas esconde a barra ao clicar no 'X', sem salvar nada no navegador
    closeWarningBtn.addEventListener('click', function() {
        studentWarning.style.display = 'none'; 
    });
}