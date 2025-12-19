// pricing.js - Renderiza a tabela de preços dinamicamente a partir de data/pricing.json
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.pricing-table');
    if (!container) return;
    try {
        const res = await fetch('data/pricing.json');
        if (!res.ok) throw new Error('Não foi possível carregar pricing.json');
        const pricing = await res.json();
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Serviço</th>
                    <th>Básico</th>
                    <th>Profissional</th>
                    <th>Enterprise</th>
                </tr>
            </thead>
        `;
        const tbody = document.createElement('tbody');
        pricing.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.service}</td>
                <td>${row.basico}</td>
                <td>${row.profissional}</td>
                <td>${row.enterprise}</td>
            `;
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        container.innerHTML = '';
        container.appendChild(table);
    } catch (err) {
        console.error('Erro ao carregar pricing:', err);
    }
});
