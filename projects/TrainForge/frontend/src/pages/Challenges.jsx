import { useEffect, useState } from 'react';
import ChallengeCard from '../components/ChallengeCard';
import { api } from '../services/api';

export default function Challenges({ user }) {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', modality: 'Musculação', pointsPerDay: 10 });

  const canManage = ['admin', 'trainer'].includes(user.role);

  const load = async () => {
    const { data } = await api.get('/challenges.php');
    setList(data?.data || []);
  };

  useEffect(() => {
    load().catch(() => null);
  }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    await api.post('/challenges.php', form);
    setForm({ title: '', description: '', modality: 'Musculação', pointsPerDay: 10 });
    await load();
  };

  const onToggle = async (id, isActive) => {
    await api.patch(`/challenges.php?id=${id}`, { isActive });
    await load();
  };

  return (
    <section className="row g-4">
      <div className="col-12">
        <div className="card tf-card">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h3 className="mb-1">Desafios Semanais</h3>
              <p className="text-secondary mb-0">Gestão de desafios e pontuação diária.</p>
            </div>
          </div>
        </div>
      </div>

      {canManage && (
        <div className="col-12">
          <form className="card tf-card p-3" onSubmit={onCreate}>
            <div className="row g-2">
              <div className="col-md-3">
                <input className="form-control" placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="col-md-4">
                <input className="form-control" placeholder="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="col-md-2">
                <select className="form-select" value={form.modality} onChange={(e) => setForm({ ...form, modality: e.target.value })}>
                  <option>Musculação</option>
                  <option>Jump</option>
                  <option>Cycling</option>
                  <option>B-Core</option>
                </select>
              </div>
              <div className="col-md-1">
                <input className="form-control" type="number" min="1" value={form.pointsPerDay} onChange={(e) => setForm({ ...form, pointsPerDay: Number(e.target.value) })} />
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary w-100">Criar</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {list.map((challenge) => (
        <div className="col-md-6 col-xl-4" key={challenge.id}>
          <ChallengeCard challenge={challenge} onToggle={onToggle} canManage={canManage} />
        </div>
      ))}
    </section>
  );
}

