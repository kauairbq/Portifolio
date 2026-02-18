import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { api } from '../services/api';
import ProgressBar from '../components/ProgressBar';

export default function Dashboard({ user }) {
  const displayName = user.full_name || user.name || 'Utilizador';
  const [leaderboard, setLeaderboard] = useState([]);
  const [metrics, setMetrics] = useState({ total_workouts: 0, total_points: 0, avg_duration: 0, total_calories: 0 });

  useEffect(() => {
    const load = async () => {
      const [rankingRes, metricsRes] = await Promise.all([
        api.get('/workouts/leaderboard?limit=5'),
        api.get('/workouts/metrics')
      ]);

      setLeaderboard(rankingRes.data?.data || []);
      setMetrics(metricsRes.data?.data || {});
    };

    load().catch(() => null);
  }, []);

  const weeklyGoal = Math.min(100, Math.round(((metrics.total_workouts || 0) / 5) * 100));

  return (
    <section className="row g-4">
      <div className="col-12">
        <div className="card tf-card">
          <div className="card-body">
            <h3 className="mb-1">Dashboard de Performance</h3>
            <p className="text-secondary mb-0">
              Bem-vindo, {displayName}. Aqui estao as metricas, ranking global e evolucao semanal.
            </p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card tf-card h-100"><div className="card-body"><h6 className="text-secondary">Treinos</h6><h2>{metrics.total_workouts || 0}</h2></div></div>
      </div>
      <div className="col-md-3">
        <div className="card tf-card h-100"><div className="card-body"><h6 className="text-secondary">Pontos</h6><h2>{metrics.total_points || 0}</h2></div></div>
      </div>
      <div className="col-md-3">
        <div className="card tf-card h-100"><div className="card-body"><h6 className="text-secondary">Duracao media</h6><h2>{Math.round(metrics.avg_duration || 0)} min</h2></div></div>
      </div>
      <div className="col-md-3">
        <div className="card tf-card h-100"><div className="card-body"><h6 className="text-secondary">Calorias</h6><h2>{metrics.total_calories || 0}</h2></div></div>
      </div>

      <div className="col-lg-7">
        <div className="card tf-card h-100">
          <div className="card-body">
            <h5>Ranking global (online + presencial)</h5>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={leaderboard}>
                  <XAxis dataKey="full_name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total_points" fill="#4f8cff" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-5">
        <div className="card tf-card h-100">
          <div className="card-body d-grid gap-3">
            <h5>Indicadores da semana</h5>
            <ProgressBar value={weeklyGoal} label="Meta de frequencia (5 treinos/semana)" />
            <ProgressBar value={Math.min(100, ((metrics.total_points || 0) / 200) * 100)} label="Meta de pontos" />
            <ProgressBar value={Math.min(100, ((metrics.total_calories || 0) / 2500) * 100)} label="Meta de calorias" />
          </div>
        </div>
      </div>
    </section>
  );
}
