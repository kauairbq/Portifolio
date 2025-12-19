// projects.js - Interatividade nos cards de projetos

document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    initProjectFilters();
    initProjectModal();
});

let projectsData = [];

// Carregar projetos do arquivo JSON
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar projetos');
        }
        projectsData = await response.json();
        displayProjects(projectsData);
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        // Carregar projetos de exemplo se o JSON n??o estiver dispon??vel
        loadFallbackProjects();
    }
}

// Projetos de exemplo caso o JSON falhe
function loadFallbackProjects() {
    projectsData = [
        {
            id: 1,
            title: "Site de E-commerce",
            description: "Plataforma completa de vendas online com carrinho de compras e integra????o com pagamentos.",
            image: "assets/img/projects/ecommerce.png",
            technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
            link: "#",
            github: "#"
        },
        {
            id: 2,
            title: "Aplicativo de Tarefas",
            description: "App web para gerenciamento de tarefas com drag-and-drop e sincroniza????o em tempo real.",
            image: "assets/img/projects/todo-app.png",
            technologies: ["React", "Node.js", "MongoDB"],
            link: "#",
            github: "#"
        },
        {
            id: 3,
            title: "Dashboard Analytics",
            description: "Painel administrativo com gr??ficos interativos e relat??rios em tempo real.",
            image: "assets/img/projects/dashboard.png",
            technologies: ["Vue.js", "D3.js", "Express"],
            link: "#",
            github: "#"
        },
        {
            id: 4,
            title: "Blog Pessoal",
            description: "Blog responsivo com sistema de coment??rios e integra????o com redes sociais.",
            image: "assets/img/projects/blog.png",
            technologies: ["WordPress", "PHP", "MySQL"],
            link: "#",
            github: "#"
        },
        {
            id: 5,
            title: "Jogo da Mem??ria",
            description: "Jogo interativo da mem??ria desenvolvido com JavaScript puro.",
            image: "assets/img/projects/memory-game.png",
            technologies: ["HTML", "CSS", "JavaScript"],
            link: "#",
            github: "#"
        },
        {
            id: 6,
            title: "API REST",
            description: "API RESTful para gerenciamento de usu??rios e autentica????o JWT.",
            image: "assets/img/projects/api.png",
            technologies: ["Node.js", "Express", "MongoDB", "JWT"],
            link: "#",
            github: "#"
        }
    ];
    displayProjects(projectsData);
}

// Exibir projetos na p??gina
function displayProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';

    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectsGrid.appendChild(projectCard);
    });
}

// Criar card de projeto
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card scroll-fade-in';
    card.style.animationDelay = `${index * 0.1}s`;

    const isInternalLink = !project.link.startsWith('http');
    const safeLink = isInternalLink ? encodeURI(project.link) : project.link;
    const requiresServer = project.requiresServer === true;
    const githubFallback = getGitHubFallback(project);

    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <div class="project-card-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-technologies">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${safeLink}" class="btn" ${isInternalLink ? '' : 'target="_blank"'}>Ver Projeto</a>
                ${project.github ? `<a href="${project.github}" class="btn secondary" target="_blank">GitHub</a>` : ''}
            </div>
        </div>
    `;

    // Apenas o bot?o "Ver Projeto" controla a abertura
    const viewBtn = card.querySelector('.btn');
    if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
            if (requiresServer) {
                e.preventDefault();
                alert('Este projeto precisa de servidor para funcionar. Vou abrir o repositorio no GitHub.');
                if (githubFallback) {
                    window.open(githubFallback, '_blank', 'noopener');
                }
                return;
            }
            if (!isInternalLink) {
                e.preventDefault();
                openProjectModal(project);
            }
            // links internos navegam pelo href normalmente
        });
    }

    card.addEventListener('mouseenter', () => addHoverEffect(card));
    card.addEventListener('mouseleave', () => removeHoverEffect(card));

    return card;
}
// Efeitos de hover nos cards
function addHoverEffect(card) {
    card.style.transform = 'translateY(-10px) scale(1.02)';
    card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
}

function removeHoverEffect(card) {
    card.style.transform = '';
    card.style.boxShadow = '';
}

// Sistema de filtros
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length === 0) {
        createFilterButtons();
    }

    // Event listeners para bot??es de filtro
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            const filter = e.target.dataset.filter;
            filterProjects(filter);

            // Atualizar bot??o ativo
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    });
}

// Criar bot??es de filtro
function createFilterButtons() {
    const projectsSection = document.querySelector('.projects');
    if (!projectsSection) return;

    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">Todos</button>
        <button class="filter-btn" data-filter="web">Web</button>
        <button class="filter-btn" data-filter="mobile">Mobile</button>
        <button class="filter-btn" data-filter="api">API</button>
        <button class="filter-btn" data-filter="game">Jogos</button>
    `;

    const projectsGrid = document.getElementById('projects-grid');
    projectsSection.insertBefore(filterContainer, projectsGrid);
}

// Filtrar projetos
function filterProjects(filter) {
    const filteredProjects = filter === 'all'
        ? projectsData
        : projectsData.filter(project => {
            const categories = getProjectCategories(project);
            return categories.includes(filter);
        });

    displayProjects(filteredProjects);
}

// Obter categorias do projeto baseado nas tecnologias
function getProjectCategories(project) {
    const categories = [];

    if (project.technologies.some(tech => ['HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'Angular'].includes(tech))) {
        categories.push('web');
    }

    if (project.technologies.some(tech => ['React Native', 'Flutter', 'Ionic'].includes(tech))) {
        categories.push('mobile');
    }

    if (project.technologies.some(tech => ['Node.js', 'Express', 'API', 'REST'].includes(tech))) {
        categories.push('api');
    }

    if (project.technologies.some(tech => ['JavaScript', 'Canvas', 'WebGL'].includes(tech)) && project.title.toLowerCase().includes('jogo')) {
        categories.push('game');
    }

    return categories;
}

// Modal de projeto
function initProjectModal() {
    // Criar modal
    const modal = document.createElement('div');
    modal.id = 'project-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body">
                <img id="modal-image" src="" alt="">
                <div class="modal-info">
                    <h2 id="modal-title"></h2>
                    <p id="modal-description"></p>
                    <div id="modal-technologies"></div>
                    <div class="modal-links">
                        <a id="modal-link" href="#" class="btn" target="_blank">Ver Projeto</a>
                        <a id="modal-github" href="#" class="btn secondary" target="_blank">GitHub</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Event listeners
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            closeProjectModal();
        }
    });

    // Fechar com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeProjectModal();
        }
    });
}

// Abrir modal do projeto
function openProjectModal(project) {
    if (project.requiresServer) {
        const githubFallback = getGitHubFallback(project);
        alert('Este projeto precisa de servidor para funcionar. Vou abrir o repositorio no GitHub.');
        if (githubFallback) {
            window.open(githubFallback, '_blank', 'noopener');
        }
        return;
    }
    // Se for um link interno, navegar diretamente
    if (!project.link.startsWith('http')) {
        window.location.href = encodeURI(project.link);
        return;
    }

    const modal = document.getElementById('project-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTechnologies = document.getElementById('modal-technologies');
    const modalLink = document.getElementById('modal-link');
    const modalGithub = document.getElementById('modal-github');

    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalTechnologies.innerHTML = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
    modalLink.href = project.link;
    modalGithub.href = project.github;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Anima????o de entrada
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Fechar modal do projeto
function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('show');

    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Adicionar estilos CSS para o modal
function addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .modal.show {
            opacity: 1;
        }

        .modal-content {
            background-color: #fff;
            margin: 5% auto;
            padding: 0;
            border-radius: 10px;
            width: 90%;
            max-width: 800px;
            position: relative;
            transform: scale(0.7);
            transition: transform 0.3s ease;
        }

        .modal.show .modal-content {
            transform: scale(1);
        }

        body.dark-mode .modal-content {
            background-color: #2a2a2a;
            color: #e0e0e0;
        }

        .close-modal {
            position: absolute;
            top: 15px;
            right: 25px;
            font-size: 30px;
            font-weight: bold;
            cursor: pointer;
            color: #666;
            z-index: 1;
        }

        body.dark-mode .close-modal {
            color: #ccc;
        }

        .close-modal:hover {
            color: #000;
        }

        body.dark-mode .close-modal:hover {
            color: #fff;
        }

        .modal-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 2rem;
        }

        #modal-image {
            width: 100%;
            border-radius: 5px;
        }

        .modal-info h2 {
            margin-bottom: 1rem;
            color: #007bff;
        }

        .modal-links {
            margin-top: 2rem;
        }

        .filter-container {
            text-align: center;
            margin-bottom: 2rem;
        }

        .filter-btn {
            background: none;
            border: 2px solid #007bff;
            color: #007bff;
            padding: 0.5rem 1rem;
            margin: 0 0.5rem;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .filter-btn:hover,
        .filter-btn.active {
            background-color: #007bff;
            color: white;
        }

        .tech-tag {
            display: inline-block;
            background-color: #f0f0f0;
            color: #333;
            padding: 0.25rem 0.5rem;
            margin: 0.25rem;
            border-radius: 15px;
            font-size: 0.8rem;
        }

        body.dark-mode .tech-tag {
            background-color: #444;
            color: #e0e0e0;
        }

        .btn.secondary {
            background-color: transparent;
            color: #007bff;
            border: 2px solid #007bff;
        }

        .btn.secondary:hover {
            background-color: #007bff;
            color: white;
        }

        @media (max-width: 768px) {
            .modal-body {
                grid-template-columns: 1fr;
            }

            .filter-btn {
                display: block;
                margin: 0.5rem auto;
                width: 200px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Adicionar estilos do modal
addModalStyles();

// Exportar fun????es para uso global
function getGitHubFallback(project) {
    if (project.github) return project.github;
    if (!project.link || project.link.startsWith('http')) return '';
    if (project.link.startsWith('projects/')) {
        const parts = project.link.split('/');
        if (parts.length >= 2) {
            return encodeURI(`https://github.com/kauairbq/Portifolio/tree/main/${parts[0]}/${parts[1]}`);
        }
    }
    const trimmed = project.link.replace(/\/[^/]+$/, '');
    return trimmed ? encodeURI(`https://github.com/kauairbq/Portifolio/tree/main/${trimmed}`) : '';
}
window.ProjectsUtils = {
    loadProjects,
    filterProjects,
    openProjectModal,
    closeProjectModal
};



