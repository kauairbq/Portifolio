// calculadora-media.js - Calculadora de Média de Notas

// Estado da aplicação
const notas = [];

// Referências aos elementos DOM
const notaInput = document.getElementById('nota');
const notasList = document.getElementById('notasList');
const errorMessage = document.getElementById('errorMessage');
const resultMessage = document.getElementById('resultMessage');
const statsBox = document.getElementById('statsBox');
const totalNotasEl = document.getElementById('totalNotas');
const minNotaEl = document.getElementById('minNota');
const maxNotaEl = document.getElementById('maxNota');
const mediaFinalEl = document.getElementById('mediaFinal');

/**
 * Função para adicionar uma nova nota
 * - Captura o valor do input
 * - Valida se está entre 0 e 20
 * - Armazena no array
 * - Atualiza a interface
 */
function adicionarNota() {
    // Capturar valor do input
    const valorStr = notaInput.value.trim();
    const valor = parseFloat(valorStr);

    // Limpar mensagem de erro anterior
    limparErro();

    // Validação: verificar se vazio
    if (valorStr === '') {
        mostrarErro('Por favor, insira uma nota.');
        notaInput.focus();
        return;
    }

    // Validação: verificar se é um número válido (NaN)
    if (isNaN(valor)) {
        mostrarErro('A nota deve ser um número válido.');
        notaInput.focus();
        return;
    }

    // Validação: verificar se está entre 0 e 20
    if (valor < 0) {
        mostrarErro('A nota não pode ser menor que 0.');
        notaInput.focus();
        return;
    }

    if (valor > 20) {
        mostrarErro('A nota não pode ser superior a 20.');
        notaInput.focus();
        return;
    }

    // Armazenar a nota no array
    notas.push(valor);

    // Atualizar a interface
    renderizarNotas();

    // Limpar o input e devolver o foco
    notaInput.value = '';
    notaInput.focus();

    // Mostrar feedback
    mostrarResultado(`Nota ${valor} adicionada com sucesso! ✓`, 'success');
}

/**
 * Função para remover uma nota específica
 */
function removerNota(indice) {
    notas.splice(indice, 1);
    renderizarNotas();
    mostrarResultado('Nota removida com sucesso.', 'success');
    limparStats();
}

/**
 * Função para renderizar a lista de notas
 */
function renderizarNotas() {
    notasList.innerHTML = '';

    if (notas.length === 0) {
        notasList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <div>Nenhuma nota inserida ainda</div>
            </div>
        `;
        return;
    }

    // Criar um fragmento para melhor performance
    const fragment = document.createDocumentFragment();

    notas.forEach((nota, indice) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="note-value">${nota}</span>
            <button class="note-remove" onclick="removerNota(${indice})" aria-label="Remover nota ${nota}">
                Remover
            </button>
        `;
        fragment.appendChild(li);
    });

    notasList.appendChild(fragment);
}

/**
 * Função para calcular a média das notas
 * - Verifica se existem notas
 * - Usa reduce para somar
 * - Divide pelo total e formata com 2 casas decimais
 */
function calcularMedia() {
    limparErro();

    // Verificar se existem notas
    if (notas.length === 0) {
        mostrarErro('Nenhuma nota inserida. Por favor, adicione notas antes de calcular a média.');
        statsBox.style.display = 'none';
        return;
    }

    // Calcular a soma usando reduce
    const soma = notas.reduce((acc, nota) => acc + nota, 0);

    // Calcular a média
    const media = soma / notas.length;

    // Calcular min e max
    const minima = Math.min(...notas);
    const maxima = Math.max(...notas);

    // Atualizar a interface com os dados
    totalNotasEl.textContent = notas.length;
    minNotaEl.textContent = minima.toFixed(2);
    maxNotaEl.textContent = maxima.toFixed(2);
    mediaFinalEl.textContent = media.toFixed(2);

    // Mostrar a caixa de estatísticas
    statsBox.style.display = 'block';

    // Mostrar mensagem de sucesso com classificação
    const classificacao = obterClassificacao(media);
    mostrarResultado(
        `Parabéns! Sua média é ${media.toFixed(2)} - ${classificacao} 🎉`,
        'success'
    );
}

/**
 * Função auxiliar para obter classificação baseada na média
 */
function obterClassificacao(media) {
    if (media >= 18) return 'Excelente';
    if (media >= 15) return 'Muito Bom';
    if (media >= 12) return 'Bom';
    if (media >= 10) return 'Satisfatório';
    if (media >= 7) return 'Suficiente';
    return 'Insuficiente';
}

/**
 * Função para limpar tudo
 */
function limparTudo() {
    if (notas.length === 0) {
        mostrarErro('Não há dados para limpar.');
        return;
    }

    if (confirm('Tem a certeza que deseja apagar todas as notas?')) {
        notas.length = 0; // Limpar o array
        renderizarNotas();
        limparStats();
        notaInput.value = '';
        notaInput.focus();
        mostrarResultado('Todas as notas foram removidas.', 'success');
    }
}

/**
 * Função auxiliar para mostrar erro
 */
function mostrarErro(mensagem) {
    errorMessage.textContent = '⚠️ ' + mensagem;
    errorMessage.classList.add('show');
}

/**
 * Função auxiliar para limpar erro
 */
function limparErro() {
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
}

/**
 * Função auxiliar para mostrar resultado
 */
function mostrarResultado(mensagem, tipo = 'info') {
    resultMessage.textContent = mensagem;
    resultMessage.className = 'result-message show ' + tipo;

    // Remover a mensagem após 4 segundos
    setTimeout(() => {
        resultMessage.classList.remove('show');
    }, 4000);
}

/**
 * Função auxiliar para limpar estatísticas
 */
function limparStats() {
    statsBox.style.display = 'none';
    mediaFinalEl.textContent = '-';
    totalNotasEl.textContent = '0';
    minNotaEl.textContent = '-';
    maxNotaEl.textContent = '-';
}

// Permitir adicionar nota com a tecla Enter
document.addEventListener('DOMContentLoaded', () => {
    notaInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            adicionarNota();
        }
    });

    // Set initial focus
    notaInput.focus();
});
