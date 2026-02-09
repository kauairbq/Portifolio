// projects.js - Renderiza a secção de projetos (sem modal)

const PROJECTS_FALLBACK = [];

document.addEventListener('DOMContentLoaded', () => {
  const featuredGrid = document.getElementById('projects-featured');
  const secondaryGrid = document.getElementById('projects-secondary');
  const projectsGrid = document.getElementById('projects-grid');

  if (projectsGrid) {
    loadProjectsPage(projectsGrid);
    return;
  }

  if (featuredGrid && secondaryGrid) {
    loadProjectsHome(featuredGrid, secondaryGrid);
  }
});

async function fetchProjects() {
  const origin = window.location.origin;
  const urls = [
    `${origin}/data/projects.json?v=${Date.now()}`,
    `./data/projects.json?v=${Date.now()}`,
    `/data/projects.json?v=${Date.now()}`,
    `data/projects.json?v=${Date.now()}`
  ];

  let response = null;
  for (const url of urls) {
    response = await fetch(url, { cache: 'no-store' });
    if (response.ok) break;
  }

  if (!response || !response.ok) {
    throw new Error('Erro ao carregar projetos');
  }

  const data = await response.json();
  const projects = Array.isArray(data) ? data : (data.projects || []);
  if (!projects.length) {
    throw new Error('Lista de projetos vazia');
  }
  return projects;
}

async function loadProjectsHome(featuredGrid, secondaryGrid) {
  try {
    const projects = await fetchProjects();
    const featured = projects.filter(project => project.featured === true && project.archived !== true);
    const secondary = projects.filter(project => project.featured !== true && project.archived !== true);

    renderProjects(featuredGrid, featured);
    renderProjects(secondaryGrid, secondary);
    initFilters();
  } catch (error) {
    console.error('Erro ao carregar projetos:', error);
    renderProjects(featuredGrid, PROJECTS_FALLBACK, true);
    renderProjects(secondaryGrid, [], true);
  }
}

async function loadProjectsPage(projectsGrid) {
  try {
    const projects = await fetchProjects();
    const relevant = projects.filter(project => project.archived !== true);
    renderProjectsPage(projectsGrid, relevant);
    initProjectsGallery();
  } catch (error) {
    console.error('Erro ao carregar projetos (galeria):', error);
    renderProjects(projectsGrid, PROJECTS_FALLBACK, true);
  }
}

function renderProjects(grid, projects, isFallback = false) {
  grid.innerHTML = '';

  if (!projects || projects.length === 0) {
    grid.innerHTML = `
      <div class="projects-empty">
        <p>Sem projetos para mostrar agora.</p>
      </div>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();

  projects.forEach((project, index) => {
    const card = createProjectCard(project, index, isFallback);
    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}

function createProjectCard(project, index, isFallback) {
  const card = document.createElement('div');
  card.className = 'project-card scroll-fade-in';
  card.style.animationDelay = `${index * 0.08}s`;

  const link = project.link || '#';
  const isInternalLink = !link.startsWith('http');
  const safeLink = isInternalLink ? encodeURI(link) : link;

  const imageSrc = project.image
    ? (project.image.startsWith('http') || project.image.startsWith('/') ? project.image : `/${project.image}`)
    : '/assets/img/projects/placeholder.png';

  const stackIcons = renderStackIcons(project.technologies);

  const problem = project.problem
    ? `<p class="project-problem"><strong>Problema:</strong> ${project.problem}</p>`
    : '';

  const challenge = project.challenge
    ? `<p class="project-challenge"><strong>Desafio:</strong> ${project.challenge}</p>`
    : '';

  const categories = Array.isArray(project.categories)
    ? project.categories
    : [];
  if (categories.length) {
    card.dataset.categories = categories.join(',');
  }

  card.innerHTML = `
    <img src="${imageSrc}" alt="${project.title || 'Projeto'}" loading="lazy" onerror="this.src='/assets/img/projects/placeholder.png'">
    <div class="project-card-content">
      <h3>${project.title || 'Projeto'}</h3>
      <p>${project.description || ''}</p>
      ${problem}
      ${challenge}
      ${stackIcons}
      <div class="project-links">
        <a href="${safeLink}" class="btn primary" ${isInternalLink ? '' : 'target="_blank"'}>Ver Projeto</a>
        ${project.github ? `<a href="${project.github}" class="btn primary" target="_blank">GitHub</a>` : `<span class="btn primary disabled" aria-disabled="true">GitHub</span>`}
        ${project.case ? `<a href="${project.case}" class="btn primary" target="_blank">Case</a>` : `<span class="btn primary disabled" aria-disabled="true">Case</span>`}
      </div>
    </div>
  `;

  card.addEventListener('mouseenter', () => addHoverEffect(card));
  card.addEventListener('mouseleave', () => removeHoverEffect(card));

  return card;
}

function renderProjectsPage(grid, projects) {
  grid.innerHTML = '';

  if (!projects || projects.length === 0) {
    grid.innerHTML = `
      <div class="projects-empty">
        <p>Sem projetos para mostrar agora.</p>
      </div>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();
  projects.forEach((project, index) => {
    const card = createProjectGalleryCard(project, index);
    fragment.appendChild(card);
  });
  grid.appendChild(fragment);
}

function createProjectGalleryCard(project, index) {
  const card = document.createElement('article');
  card.className = 'project-gallery-card scroll-fade-in';
  card.style.animationDelay = `${index * 0.06}s`;

  const link = project.link || '#';
  const isInternalLink = !link.startsWith('http');
  const safeLink = isInternalLink ? encodeURI(link) : link;

  const baseImage = project.image
    ? (project.image.startsWith('http') || project.image.startsWith('/') ? project.image : `/${project.image}`)
    : '/assets/img/projects/placeholder.png';

  const images = Array.isArray(project.images) && project.images.length > 0
    ? project.images.map(src => (src.startsWith('http') || src.startsWith('/') ? src : `/${src}`))
    : [baseImage];

  const stackIcons = renderStackIcons(project.technologies);
  const problem = project.problem
    ? `<p class="project-problem"><strong>Problema:</strong> ${project.problem}</p>`
    : '';

  const challenge = project.challenge
    ? `<p class="project-challenge"><strong>Desafio:</strong> ${project.challenge}</p>`
    : '';

  const slides = images.map((src, idx) => `
    <div class="project-slide${idx === 0 ? ' is-active' : ''}">
      <img src="${src}" alt="${project.title || 'Projeto'}" loading="lazy" onerror="this.src='/assets/img/projects/placeholder.png'">
    </div>
  `).join('');

  const controls = images.length > 1
    ? `<button class="carousel-btn prev" type="button" aria-label="Anterior">&larr;</button>
       <button class="carousel-btn next" type="button" aria-label="Seguinte">&rarr;</button>`
    : '';

  card.innerHTML = `
    <div class="project-carousel" data-index="0" data-total="${images.length}">
      <div class="project-slides">
        ${slides}
      </div>
      ${controls}
    </div>
    <div class="project-card-content">
      <div class="project-meta">
        <h3>${project.title || 'Projeto'}</h3>
        <p>${project.description || ''}</p>
        ${problem}
        ${challenge}
        ${stackIcons}
      </div>
      <div class="project-links">
        <a href="${safeLink}" class="btn primary" ${isInternalLink ? '' : 'target=\"_blank\"'}>Ver Projeto</a>
        ${project.github ? `<a href="${project.github}" class="btn primary" target="_blank">GitHub</a>` : `<span class="btn primary disabled" aria-disabled="true">GitHub</span>`}
        ${project.case ? `<a href="${project.case}" class="btn primary" target="_blank">Case</a>` : `<span class="btn primary disabled" aria-disabled="true">Case</span>`}
      </div>
    </div>
  `;

  return card;
}

function initProjectsGallery() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.addEventListener('click', (event) => {
    const btn = event.target.closest('.carousel-btn');
    if (!btn) return;

    const carousel = btn.closest('.project-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.project-slide');
    if (!slides.length) return;

    const total = slides.length;
    let index = Number(carousel.dataset.index || '0');
    index = btn.classList.contains('next') ? index + 1 : index - 1;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;

    slides.forEach((slide, idx) => {
      slide.classList.toggle('is-active', idx === index);
    });

    carousel.dataset.index = String(index);
  });
}

function renderStackIcons(technologies) {
  if (!Array.isArray(technologies) || technologies.length === 0) return '';

    const iconMap = {
      'Acessibilidade': 'fa-solid fa-universal-access',
      'Android': 'fa-brands fa-android',
      'API': 'fa-solid fa-cloud',
      'Argon2id': 'fa-solid fa-lock',
      'Bootstrap': 'fa-brands fa-bootstrap',
      'BullMQ': 'fa-solid fa-gears',
      'Calendly': 'fa-solid fa-calendar-days',
      'CMS': 'fa-solid fa-pen-to-square',
      'CSS': 'fa-brands fa-css3-alt',
      'D3.js': 'fa-solid fa-chart-line',
      'Express': 'fa-solid fa-server',
      'Fetch': 'fa-solid fa-rotate',
      'Firebase': 'fa-solid fa-fire',
      'Flutter': 'fa-solid fa-mobile-screen',
      'Font Awesome': 'fa-solid fa-icons',
      'GDPR': 'fa-solid fa-shield-halved',
      'GSAP': 'fa-solid fa-wave-square',
      'HTML': 'fa-brands fa-html5',
      'IoT': 'fa-solid fa-wifi',
      'iOS': 'fa-brands fa-apple',
      'JavaScript': 'fa-brands fa-js',
      'Jest': 'fa-solid fa-vial',
      'JWT': 'fa-solid fa-key',
      'LocalStorage': 'fa-solid fa-floppy-disk',
      'localStorage': 'fa-solid fa-floppy-disk',
      'MongoDB': 'fa-solid fa-leaf',
      'MQTT': 'fa-solid fa-signal',
      'MySQL': 'fa-solid fa-database',
      'NestJS': 'fa-solid fa-layer-group',
      'Next.js': 'fa-solid fa-forward',
      'Node.js': 'fa-brands fa-node-js',
      'PHP': 'fa-brands fa-php',
      'Pinia': 'fa-solid fa-boxes-stacked',
      'POO': 'fa-solid fa-cubes',
      'PostgreSQL': 'fa-solid fa-database',
      'Prisma': 'fa-solid fa-diagram-project',
      'RBAC': 'fa-solid fa-user-shield',
      'React': 'fa-brands fa-react',
      'Redis': 'fa-solid fa-bolt',
      'Responsivo': 'fa-solid fa-mobile-screen',
      'SEO': 'fa-solid fa-magnifying-glass',
      'Socket.io': 'fa-solid fa-tower-broadcast',
      'Swagger': 'fa-solid fa-file-lines',
      'TailwindCSS': 'fa-solid fa-wind',
      'TypeScript': 'fa-solid fa-code',
      'Vite': 'fa-solid fa-bolt',
      'Vue 3': 'fa-brands fa-vuejs',
      'Vue.js': 'fa-brands fa-vuejs',
      'WordPress': 'fa-brands fa-wordpress'
    };

    const icons = technologies
      .map(tech => {
        const cls = iconMap[tech];
        if (!cls) return '';
        const slug = String(tech).toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return `<span class="stack-icon tech-${slug}" title="${tech}"><i class="${cls}"></i></span>`;
      })
      .filter(Boolean)
      .join('');

  if (!icons) return '';
  return `<div class="project-stack-icons">${icons}</div>`;
}

function initFilters() {
  const filterContainer = document.getElementById('projects-filters');
  if (!filterContainer) return;

  filterContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (!target || !target.classList.contains('filter-btn')) return;

    const filter = target.dataset.filter;
    filterContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    target.classList.add('active');

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      if (filter === 'all') {
        card.style.display = '';
        return;
      }
      const categories = card.dataset.categories ? card.dataset.categories.split(',') : [];
      card.style.display = categories.includes(filter) ? '' : 'none';
    });
  });
}

function addHoverEffect(card) {
  card.style.transform = 'translateY(-10px) scale(1.02)';
  card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
}

function removeHoverEffect(card) {
  card.style.transform = '';
  card.style.boxShadow = '';
}
