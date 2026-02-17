import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../services/api';
import ProgressBar from '../components/ProgressBar';

export default function Dashboard({ user }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [metrics, setMetrics] = useState({ total_workouts: 0, total_points: 0, avg_duration: 0 });

  useEffect(() => {
    const load = async () => {
      const [l, m] = await Promise.all([
        api.get('/workouts.php?action=leaderboard&limit=5'),
        api.get('/workouts.php?action=metrics')
      ]);
      setLeaderboard(l.data?.data || []);
      setMetrics(m.data?.data || {});
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
              Bem-vindo, {user.name}. Aqui tens métricas de treino, pontuação e ranking global.
            </p>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card tf-card h-100"><div className="card-body"><h6 className="text-secondary">Treinos</h6><h2>{metrics.total_workouts || 0}</h2></div></div>
      </div>
      <div className="col-md-4">
        <div className="card tf-card h-100"><div className="card-body"><h6 className="text-secondary">Pontos</h6><h2>{metrics.total_points || 0}</h2></div></div>
      </div>
      <div className="col-md-4">
        <div className="card tf-card h-100"><div className="card-body"><h6 className="text-secondary">Duração média</h6><h2>{Math.round(metrics.avg_duration || 0)} min</h2></div></div>
      </div>

      <div className="col-lg-6">
        <div className="card tf-card h-100">
          <div className="card-body">
            <h5>Ranking global</h5>
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer>
                <BarChart data={leaderboard}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total_points" fill="#4f8cff" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-6">
        <div className="card tf-card h-100">
          <div className="card-body d-grid gap-3">
            <h5>Objetivos semanais</h5>
            <ProgressBar value={weeklyGoal} label="Meta de frequência (5 treinos/semana)" />
            <ProgressBar value={Math.min(100, (metrics.total_points || 0) % 100)} label="Meta de pontos" />
          </div>
        </div>
      </div>
    </section>
  );
}

