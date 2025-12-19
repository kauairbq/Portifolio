// darkmode.js - Toggle de modo escuro

document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
});

function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;

    // Verificar preferência salva
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        enableDarkMode();
    } else if (savedTheme === 'light') {
        disableDarkMode();
    }

    // Event listener para o botão
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Atualizar ícone do botão
    updateToggleIcon();
}

function toggleDarkMode() {
    const body = document.body;

    if (body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
    updateToggleIcon();
    showThemeMessage('Modo escuro ativado');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
    updateToggleIcon();
    showThemeMessage('Modo claro ativado');
}

function updateToggleIcon() {
    const toggle = document.getElementById('dark-mode-toggle');
    if (!toggle) return;

    const isDark = document.body.classList.contains('dark-mode');
    toggle.textContent = isDark ? '☀️' : '🌙';
    toggle.setAttribute('aria-label', isDark ? 'Alternar para modo claro' : 'Alternar para modo escuro');
}

function showThemeMessage(message) {
    // Criar mensagem temporária
    const messageDiv = document.createElement('div');
    messageDiv.className = 'theme-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: #007bff;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-size: 0.9rem;
        z-index: 10000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(messageDiv);

    // Animar entrada
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);

    // Remover após 3 segundos
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// Função para alternar tema automaticamente baseado na hora do dia
function initAutoTheme() {
    const now = new Date();
    const hour = now.getHours();

    // Ativar modo escuro entre 18h e 6h
    if (hour >= 18 || hour < 6) {
        if (!localStorage.getItem('theme')) {
            enableDarkMode();
        }
    }
}

// Inicializar tema automático baseado no horário do dia
initAutoTheme();

// Função para detectar mudanças na preferência do sistema
function initSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', (e) => {
        // Só alterar se não houver preferência salva pelo usuário
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });
}

// Inicializar listener do sistema
initSystemThemeListener();

// Função para aplicar tema a elementos dinâmicos
function applyThemeToElement(element) {
    const isDark = document.body.classList.contains('dark-mode');

    if (isDark) {
        element.classList.add('dark-theme');
        element.classList.remove('light-theme');
    } else {
        element.classList.add('light-theme');
        element.classList.remove('dark-theme');
    }
}

// Função para alternar tema com animação
function toggleThemeWithAnimation() {
    const body = document.body;
    const isDark = body.classList.contains('dark-mode');

    // Adicionar classe de transição
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';

    if (isDark) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }

    // Remover transição após a animação
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
}

// Função para resetar preferência de tema
function resetThemePreference() {
    localStorage.removeItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    showThemeMessage('Preferência de tema resetada');
}

// Adicionar estilos CSS para elementos dinâmicos
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .dark-theme {
            background-color: #2a2a2a !important;
            color: #e0e0e0 !important;
            border-color: #444 !important;
        }

        .light-theme {
            background-color: #fff !important;
            color: #333 !important;
            border-color: #ddd !important;
        }

        .theme-message {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        body.dark-mode .theme-message {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
    `;
    document.head.appendChild(style);
}

// Adicionar estilos dinâmicos
addDynamicStyles();

// Exportar funções para uso global
window.DarkModeUtils = {
    enableDarkMode,
    disableDarkMode,
    toggleDarkMode,
    resetThemePreference,
    applyThemeToElement
};
