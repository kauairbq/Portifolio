// projects.js - Renderiza a secção de projetos (sem modal)

const PROJECTS_FALLBACK = [];

document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
});

async function loadProjects() {
  const featuredGrid = document.getElementById('projects-featured');
  const secondaryGrid = document.getElementById('projects-secondary');
  if (!featuredGrid || !secondaryGrid) return;

  try {
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

  const techTags = Array.isArray(project.technologies)
    ? project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')
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
      <div class="project-technologies">${techTags}</div>
      <div class="project-links">
        <a href="${safeLink}" class="btn" ${isInternalLink ? '' : 'target="_blank"'}>Ver Projeto</a>
        ${project.github ? `<a href="${project.github}" class="btn secondary" target="_blank">GitHub</a>` : ''}
      </div>
    </div>
  `;

  card.addEventListener('mouseenter', () => addHoverEffect(card));
  card.addEventListener('mouseleave', () => removeHoverEffect(card));

  return card;
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
