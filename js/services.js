// services.js - Renderiza dinamicamente os cards de serviços a partir de data/services.json
document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.querySelector('.services-grid');
    if (!grid) return;

    try {
        const res = await fetch('data/services.json');
        if (!res.ok) throw new Error('Não foi possível carregar services.json');
        const services = await res.json();

        const fragment = document.createDocumentFragment();

        services.forEach(s => {
            const article = document.createElement('article');
            article.className = 'service-card';
            article.setAttribute('tabindex', '0');
            article.setAttribute('role', 'article');
            article.setAttribute('itemscope', '');
            article.setAttribute('itemtype', 'http://schema.org/Service');

            // Figure and Image
            const figure = document.createElement('figure');
            figure.className = 'service-image';
            const img = document.createElement('img');
            img.src = s.img;
            img.alt = s.alt || s.title;
            img.loading = 'lazy';
            img.setAttribute('itemprop', 'image');
            figure.appendChild(img);
            article.appendChild(figure);

            // Title
            const h3 = document.createElement('h3');
            h3.id = s.id;
            h3.setAttribute('itemprop', 'name');
            h3.textContent = s.title;
            article.appendChild(h3);

            // Description
            const p = document.createElement('p');
            p.id = `desc-${s.id.replace('service-', '')}`;
            p.className = 'service-description';
            p.setAttribute('itemprop', 'description');
            p.textContent = s.description;
            article.appendChild(p);

            // Features
            const ul = document.createElement('ul');
            ul.className = 'service-features';
            ul.setAttribute('aria-labelledby', s.id);
            ul.setAttribute('role', 'list');
            s.features.forEach(feature => {
                const li = document.createElement('li');
                li.setAttribute('role', 'listitem');
                li.setAttribute('itemprop', 'serviceType');
                li.textContent = feature;
                ul.appendChild(li);
            });
            article.appendChild(ul);

            // Actions
            const actions = document.createElement('div');
            actions.className = 'service-actions';
            // Create modal trigger button
            const btn = document.createElement('button');
            btn.className = 'contact-btn';
            btn.type = 'button';
            btn.setAttribute('data-service', s.contactQuery);
            btn.setAttribute('data-service-id', s.id);
            btn.setAttribute('aria-label', `Abrir detalhes sobre ${s.title}`);
            btn.textContent = 'Saiba mais';
            actions.appendChild(btn);
            article.appendChild(actions);

            fragment.appendChild(article);
        });

        // Clear existing content (if any) and append fragment
        grid.innerHTML = '';
        grid.appendChild(fragment);

        // Se o main.js registrou initContactButtons globalmente, utilize-o para associar eventos
        if (window.PortfolioUtils && typeof window.PortfolioUtils.initContactButtons === 'function') {
            window.PortfolioUtils.initContactButtons();
        }

        // Modal behavior: attach click handlers to the modal triggers
        const modal = createServiceModal();
        document.body.appendChild(modal);
        grid.addEventListener('click', (e) => {
            const btn = e.target.closest('.contact-btn');
            if (!btn) return;
            e.preventDefault();
            const serviceId = btn.getAttribute('data-service-id');
            const service = services.find(x => x.id === serviceId);
            if (service) {
                openServiceModal(service, btn);
            }
        });

    } catch (e) {
        // Em caso de erro, não quebrar a página — o fallback <noscript> será útil
        console.error('Erro ao carregar serviços dinamicamente:', e);
    }
});

function createServiceModal() {
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="service-modal-backdrop" tabindex="-1"></div>
        <div class="service-modal-panel" role="document">
            <button class="service-modal-close" aria-label="Fechar">&times;</button>
            <div class="service-modal-content">
                <h3 class="service-modal-title"></h3>
                <p class="service-modal-description"></p>
                <ul class="service-modal-list"></ul>
                <div class="service-modal-actions">
                    <a class="btn service-modal-contact" href="#">Quero contratar</a>
                </div>
            </div>
        </div>
    `;

    modal.querySelector('.service-modal-close').addEventListener('click', () => closeServiceModal(modal));
    const modalContact = modal.querySelector('.service-modal-contact');
    if (modalContact) {
        modalContact.addEventListener('click', function() {
            const url = new URL(this.href, location.href);
            const svc = url.searchParams.get('service');
            if (svc) {
                try { localStorage.setItem('preferredService', decodeURIComponent(svc)); } catch (e) {}
            }
        });
    }
    modal.querySelector('.service-modal-backdrop').addEventListener('click', () => closeServiceModal(modal));
    // Close on ESC
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeServiceModal(modal);
    });
    return modal;
}

function openServiceModal(service, opener) {
    const modal = document.querySelector('.service-modal');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
    modal.querySelector('.service-modal-title').textContent = service.title;
    modal.querySelector('.service-modal-description').textContent = service.details || service.description;
    const ul = modal.querySelector('.service-modal-list');
    ul.innerHTML = '';
    (service.features || []).forEach(f => {
        const li = document.createElement('li');
        li.textContent = f;
        ul.appendChild(li);
    });
    const contactLink = modal.querySelector('.service-modal-contact');
    contactLink.href = `contactos.html?service=${encodeURIComponent(service.contactQuery)}`;
    // Focus modal
    const panel = modal.querySelector('.service-modal-panel');
    panel.setAttribute('tabindex', '-1');
    modal._opener = opener || null;
    panel.focus();
    trapFocus(modal);
}

function closeServiceModal(modal) {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('open');
    releaseFocus(modal);
    try { if (modal._opener) modal._opener.focus(); } catch (e) {}
}

function trapFocus(modal) {
    const focusableSelector = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const panel = modal.querySelector('.service-modal-panel');
    const focusable = Array.from(panel.querySelectorAll(focusableSelector)).filter(el => !el.hasAttribute('disabled'));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const handler = function (e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) { // shift + tab
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    };
    modal._trapHandler = handler;
    panel.addEventListener('keydown', handler);
}

function releaseFocus(modal) {
    const panel = modal.querySelector('.service-modal-panel');
    if (panel && modal._trapHandler) {
        panel.removeEventListener('keydown', modal._trapHandler);
        modal._trapHandler = null;
    }
}
