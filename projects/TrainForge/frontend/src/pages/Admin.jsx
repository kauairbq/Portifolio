import { useEffect, useState } from 'react';

import { api } from '../services/api';

export default function Admin() {
  const [overview, setOverview] = useState(null);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [overviewRes, rankingRes] = await Promise.all([
        api.get('/admin/overview'),
        api.get('/admin/rankings')
      ]);

      setOverview(overviewRes.data?.data || null);
      setRanking(rankingRes.data?.data || []);
    };

    load().catch(() => null);
  }, []);

  return (
    <section className="row g-4">
      <div className="col-12">
        <div className="card tf-card">
          <div className="card-body">
            <h3>Painel administrativo</h3>
            <p className="text-secondary mb-0">Gestao central de utilizadores, desafios, servicos e operacao SaaS.</p>
          </div>
        </div>
      </div>

      <div className="col-lg-6">
        <div className="card tf-card h-100">
          <div className="card-body">
            <h5>Indicadores operacionais</h5>
            {!overview ? (
              <p className="text-secondary mb-0">A carregar...</p>
            ) : (
              <ul className="tf-mini-list mb-0">
                <li>Desafios ativos: <strong>{overview.active_challenges}</strong></li>
                <li>Solicitacoes pendentes: <strong>{overview.pending_requests}</strong></li>
                <li>Tickets de suporte abertos: <strong>{overview.open_tickets}</strong></li>
                <li>
                  Utilizadores por papel:
                  <ul>
                    {(overview.users_by_role || []).map((item) => (
                      <li key={item.role}>{item.role}: {item.total}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="col-lg-6">
        <div className="card tf-card h-100">
          <div className="card-body">
            <h5>Top ranking global</h5>
            <ol className="tf-ranking-list mb-0">
              {ranking.map((entry) => (
                <li key={entry.id}>
                  <span>{entry.full_name}</span>
                  <strong>{entry.total_points} pts</strong>
                </li>
              ))}
              {ranking.length === 0 ? <li>Sem dados no momento.</li> : null}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
