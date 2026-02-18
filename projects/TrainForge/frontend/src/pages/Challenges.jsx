import { useEffect, useState } from 'react';

import ChallengeCard from '../components/ChallengeCard';
import { api } from '../services/api';

async function enrichWithRanking(challenges) {
  const ranked = await Promise.all(
    challenges.map(async (challenge) => {
      try {
        const rankingRes = await api.get(`/challenges/${challenge.id}/ranking?top=3`);
        return { ...challenge, top_three: rankingRes.data?.data || [] };
      } catch {
        return { ...challenge, top_three: [] };
      }
    })
  );
  return ranked;
}

export default function Challenges({ user }) {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    modality: 'Musculacao',
    weeklyTarget: 5,
    pointsPerCompletion: 10,
    startsAt: new Date().toISOString().slice(0, 10),
    endsAt: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10)
  });

  const canManage = ['admin', 'trainer'].includes(user.role);

  const load = async () => {
    const { data } = await api.get('/challenges');
    const withRanking = await enrichWithRanking(data?.data || []);
    setList(withRanking);
  };

  useEffect(() => {
    load().catch(() => null);
  }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    await api.post('/challenges', form);
    setForm({
      title: '',
      description: '',
      modality: 'Musculacao',
      weeklyTarget: 5,
      pointsPerCompletion: 10,
      startsAt: new Date().toISOString().slice(0, 10),
      endsAt: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10)
    });
    await load();
  };

  const onToggle = async (id, isActive) => {
    await api.patch(`/challenges/${id}/toggle`, { isActive });
    await load();
  };

  const onComplete = async (challengeId) => {
    await api.post(`/challenges/${challengeId}/complete`, {
      title: 'Treino concluido no desafio',
      modality: 'General',
      durationMinutes: 35,
      calories: 280,
      points: 12
    });

    await load();
  };

  return (
    <section className="row g-4">
      <div className="col-12">
        <div className="card tf-card">
          <div className="card-body">
            <h3 className="mb-1">Desafio da Semana</h3>
            <p className="text-secondary mb-0">
              Personal trainers podem ativar ou desativar desafios. Ranking global unifica alunos online e presenciais.
            </p>
          </div>
        </div>
      </div>

      {canManage && (
        <div className="col-12">
          <form className="card tf-card p-3" onSubmit={onCreate}>
            <div className="row g-2">
              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="Titulo"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="Descricao"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="col-md-2">
                <select
                  className="form-select"
                  value={form.modality}
                  onChange={(e) => setForm({ ...form, modality: e.target.value })}
                >
                  <option>Musculacao</option>
                  <option>Jump</option>
                  <option>Cycling</option>
                  <option>B-Core</option>
                </select>
              </div>
              <div className="col-md-1">
                <input
                  className="form-control"
                  type="number"
                  min="1"
                  value={form.pointsPerCompletion}
                  onChange={(e) => setForm({ ...form, pointsPerCompletion: Number(e.target.value) })}
                />
              </div>
              <div className="col-md-1">
                <input
                  className="form-control"
                  type="number"
                  min="1"
                  value={form.weeklyTarget}
                  onChange={(e) => setForm({ ...form, weeklyTarget: Number(e.target.value) })}
                />
              </div>
              <div className="col-md-1">
                <input
                  className="form-control"
                  type="date"
                  value={form.startsAt}
                  onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
                />
              </div>
              <div className="col-md-1">
                <input
                  className="form-control"
                  type="date"
                  value={form.endsAt}
                  onChange={(e) => setForm({ ...form, endsAt: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-3">
              <button className="btn btn-primary">Criar desafio</button>
            </div>
          </form>
        </div>
      )}

      {list.map((challenge) => (
        <div className="col-md-6 col-xl-4" key={challenge.id}>
          <ChallengeCard
            challenge={challenge}
            canManage={canManage}
            onToggle={onToggle}
            onComplete={onComplete}
          />
        </div>
      ))}
    </section>
  );
}
