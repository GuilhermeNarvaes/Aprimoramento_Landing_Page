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
const menuToggle = document.querySelector('#menu-toggle');
const headerNav = document.querySelector('#header-nav');
// Captura todos os links dentro do menu
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