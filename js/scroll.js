// scroll.js - Scroll suave e efeitos relacionados

document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initScrollToTop();
    initScrollProgress();
    initParallax();
});

// Scroll suave para todos os links internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Botão "Voltar ao Topo"
function initScrollToTop() {
    // Criar botão
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #007bff;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    document.body.appendChild(scrollToTopBtn);

    // Mostrar/ocultar botão baseado na posição do scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // Funcionalidade do botão
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Barra de progresso do scroll
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background-color: #007bff;
        z-index: 1001;
        transition: width 0.25s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Efeito parallax para elementos específicos
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const rate = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * rate);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Função para scroll suave para um elemento específico
function scrollToElement(element, offset = 0) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }

    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Função para verificar se elemento está visível na viewport (pelo menos parcialmente)
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    return (
        rect.bottom > 0 &&
        rect.top < windowHeight &&
        rect.right > 0 &&
        rect.left < windowWidth
    );
}

// Função para animar elementos quando entram na viewport
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('animated');
        }
    });
}

// Inicializar animações de scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Animação específica para seções abaixo do hero (apenas fade-in)
function animateSections() {
    const sections = document.querySelectorAll('.about, .projects');
    sections.forEach(section => {
        if (isElementInViewport(section)) {
            section.classList.add('fade-in');
        }
    });
}

// Animação para elementos scroll-fade-in (como cards de projetos)
function animateScrollFadeIn() {
    const elements = document.querySelectorAll('.scroll-fade-in');
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('in-view');
        } else {
            // Remover a classe apenas se o elemento estiver completamente fora da viewport
            // para evitar flickering
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            if (rect.bottom < 0 || rect.top > windowHeight) {
                element.classList.remove('in-view');
            }
        }
    });
}

// Adicionar listener para animação das seções
window.addEventListener('scroll', animateSections);
window.addEventListener('load', animateSections);

// Adicionar listener para animação dos elementos scroll-fade-in
window.addEventListener('scroll', animateScrollFadeIn);
window.addEventListener('load', animateScrollFadeIn);

// Função para scroll horizontal suave (útil para galerias)
function initHorizontalScroll() {
    const horizontalScrollContainers = document.querySelectorAll('.horizontal-scroll');

    horizontalScrollContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            container.style.cursor = 'grabbing';
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    });
}

// Inicializar scroll horizontal
initHorizontalScroll();

// Função para scroll infinito (lazy loading de conteúdo)
function initInfiniteScroll(callback) {
    let loading = false;

    window.addEventListener('scroll', function() {
        if (loading) return;

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            loading = true;
            callback().then(() => {
                loading = false;
            });
        }
    });
}

// Exemplo de uso do scroll infinito
// initInfiniteScroll(async function() {
//     // Carregar mais conteúdo
//     console.log('Carregando mais conteúdo...');
//     // Simular carregamento
//     await new Promise(resolve => setTimeout(resolve, 1000));
// });

// Função para destacar seção ativa no menu
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Inicializar destaque de seção ativa
highlightActiveSection();

// Exportar funções para uso global
window.ScrollUtils = {
    scrollToElement,
    isElementInViewport,
    initInfiniteScroll
};
