// main.js - Funcionalidades gerais do portfólio

// Utility: normalize path (exposed to PortfolioUtils)
function normalizePath(p) {
    if (!p) return '/';
    let path = p.replace(/\\/g, '/').replace(/\/+/g, '/');
    // Remove Windows drive letter if present (C:)
    path = path.replace(/^[a-zA-Z]:/, '');
    // Ensure leading slash
    if (!path.startsWith('/')) path = '/' + path;
    // Remove query/hash
    path = path.split('?')[0].split('#')[0];
    // Collapse default index names
    path = path.replace(/\/index\.(html?|php)$/i, '/');
    // Remove trailing slash unless it's root
    path = path.replace(/\/$/, '') || '/';
    return path;
}

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initScrollEffects();
    initFormValidation();
    initSmoothScrolling();
    initContactButtons();
    initAnimations();
    initNavActive();
    // Lazy loading e filtros de galeria devem ser inicializados após DOM carregar
    initLazyLoading();
    initGalleryFilters();
});

// Set aria-current on active nav link and add .active CSS class
    function initNavActive() {
    const navLinks = document.querySelectorAll('nav ul li a');
    if (!navLinks) return;
        // Normalize paths utility
        const currentPath = normalizePath(window.location.pathname);
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        try {
            const resolved = new URL(href, location.href);
                const linkPath = normalizePath(resolved.pathname);
                if (linkPath === currentPath || normalizePath(resolved.href) === currentPath) {
                link.setAttribute('aria-current', 'page');
                link.classList.add('active');
                return;
            }
        } catch (e) {
            // ignore
        }
        // Fallback: if the link is a hash pointing to an ID on the current page
        if (href.startsWith('#')) {
            const id = href.replace('#', '');
            if (document.getElementById(id)) {
                link.setAttribute('aria-current', 'page');
                link.classList.add('active');
                return;
            }
        }
        link.removeAttribute('aria-current');
        link.classList.remove('active');
    });
}

// Efeitos de scroll
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observar elementos com classe scroll-fade-in
    document.querySelectorAll('.scroll-fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Validação de formulários
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (validateForm(this)) {
                // Simular envio do formulário
                showMessage('Mensagem enviada com sucesso!', 'success');
                this.reset();
            }
        });
    });

    // Validação específica para o formulário de contato
    const contactForm = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    if (contactForm && feedback) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            feedback.textContent = '';

            const name = contactForm.name.value.trim();
            const email = contactForm.email.value.trim();
            const message = contactForm.message.value.trim();

            // Validação
            if (name.length < 3) return showError('O nome deve ter pelo menos 3 caracteres.');
            if (!validateEmail(email)) return showError('Email inválido.');
            if (message.length < 10) return showError('A mensagem deve ter pelo menos 10 caracteres.');

            // Enviar formulário (simulação)
            sendForm({ name, email, message });
        });

        function showError(msg) {
            feedback.style.color = 'red';
            feedback.textContent = msg;
        }

        function showSuccess(msg) {
            feedback.style.color = 'green';
            feedback.textContent = msg;
        }

        // Validação simples de email
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email.toLowerCase());
        }

        // Função de envio (simulação)
        function sendForm(data) {
            // Exemplo de integração com back-end ou serviço de envio
            console.log('Formulário enviado:', data);
            showSuccess('Mensagem enviada com sucesso!');
            contactForm.reset();
        }
    }
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');

    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, 'Este campo é obrigatório');
            isValid = false;
        } else {
            clearError(input);
        }

        // Validação específica de email
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                showError(input, 'Email inválido');
                isValid = false;
            }
        }
    });

    return isValid;
}

function showError(input, message) {
    clearError(input);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
    input.style.borderColor = 'red';
}

function clearError(input) {
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    input.style.borderColor = '';
}

// Scroll suave para links de navegação
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Inicializar animações
function initAnimations() {
    // Respect system preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    // Adicionar classes de animação aos elementos
    document.querySelectorAll('.hero-content h1').forEach(el => {
        el.classList.add('fade-in');
    });

    document.querySelectorAll('.hero-content p').forEach(el => {
        el.classList.add('slide-in-left');
    });

    document.querySelectorAll('.btn').forEach(el => {
        el.classList.add('scale-in');
    });

    // Removido: animação de fade-in na seção about para manter sempre visível

    document.querySelectorAll('.project-card').forEach(el => {
        el.classList.add('scroll-fade-in');
    });

    // Removido: animação de fade-in no contact-form para manter sempre visível
}

// Função para mostrar mensagens
function showMessage(message, type = 'info') {
    // Criar elemento de mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.padding = '1rem';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.zIndex = '10000';
    messageDiv.style.maxWidth = '300px';

    if (type === 'success') {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    } else if (type === 'error') {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    }

    document.body.appendChild(messageDiv);

    // Remover mensagem após 5 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Função para detectar se o usuário está no topo da página
function isAtTop() {
    return window.scrollY === 0;
}

// Adicionar classe ao header quando rolar
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Lazy loading para imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading e filtros da galeria são chamados no DOMContentLoaded

// Função para filtros da galeria
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length === 0 || galleryItems.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Adicionar classe active ao botão clicado
            this.classList.add('active');

            // Filtrar itens da galeria
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    // Adicionar animação de fade-in
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Função para alternar visibilidade de elementos
function toggleVisibility(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.classList.toggle('hidden');
    }
}

// Inicializar comportamento do botão 'Saiba mais' para armazenar o serviço selecionado
function initContactButtons() {
    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const service = this.getAttribute('data-service') || this.dataset.service || '';
            if (service) {
                try { localStorage.setItem('preferredService', service); } catch (e) { /* storage pode não estar disponível */ }
            }
        });
    });

    // Ao carregar a página de contato, pré-preencher o formulário se houver serviço armazenado
    const contactForm = document.getElementById('contact-form');
    const storedService = (function() { try { return localStorage.getItem('preferredService'); } catch (e) { return null; } })();
    const urlParams = new URLSearchParams(window.location.search || window.location.hash.replace('#', '?'));
    const urlService = urlParams.get('service') ? decodeURIComponent(urlParams.get('service')) : null;
    const serviceToPrefill = urlService || storedService;
    if (contactForm && serviceToPrefill) {
        // Tentar preencher um campo existente chamado 'service' ou 'subject'
        const input = contactForm.querySelector('input[name="service"], input[name="subject"]');
        if (input) {
            input.value = serviceToPrefill;
        } else {
            const hidden = document.createElement('input');
            hidden.type = 'hidden';
            hidden.name = 'service';
            hidden.value = serviceToPrefill;
            contactForm.appendChild(hidden);
        }
        try { localStorage.removeItem('preferredService'); } catch (e) {}
    }

    // Event: se houver um link modal 'Quero contratar' na página que navega com query, não há necessidade de setar storage
    // Porém, caso queira suportar ação no modal antes de navegar, associe listener para ancoragems com classe service-modal-contact
    document.querySelectorAll('.service-modal-contact').forEach(el => {
        el.addEventListener('click', function() {
            const service = this.href ? new URL(this.href, location.href).searchParams.get('service') : null;
            if (service) {
                try { localStorage.setItem('preferredService', decodeURIComponent(service)); } catch (e) {}
            }
        });
    });
}

// Adicionar classe hidden ao CSS se necessário
// .hidden { display: none; }

// Exportar funções para uso global se necessário
window.PortfolioUtils = {
    showMessage,
    toggleVisibility,
    validateForm
};

// Expor initContactButtons para ser usado por serviços dinâmicos
window.PortfolioUtils.initContactButtons = initContactButtons;
// Expor normalizePath para depuração / testes
window.PortfolioUtils.normalizePath = normalizePath;
