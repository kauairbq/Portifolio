import { motion } from 'framer-motion';

export default function ChallengeCard({ challenge, onToggle, onComplete, canManage }) {
  const active = Number(challenge.is_active) === 1;
  const topThree = Array.isArray(challenge.top_three) ? challenge.top_three : [];

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card tf-card h-100"
    >
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">{challenge.title}</h5>
          <span className={`badge ${active ? 'bg-success' : 'bg-secondary'}`}>
            {active ? 'Ativo' : 'Inativo'}
          </span>
        </div>

        <p className="text-secondary mb-2">{challenge.description || 'Sem descricao.'}</p>

        <div className="small text-secondary mb-3">
          <div>Modalidade: {challenge.modality}</div>
          <div>Meta semanal: {challenge.weekly_target}</div>
          <div>Pontos por conclusao: {challenge.points_per_completion}</div>
        </div>

        <div className="mb-3">
          <div className="small fw-semibold mb-2">Top 3 ranking</div>
          {topThree.length === 0 ? (
            <small className="text-secondary">Sem pontuacao registada ainda.</small>
          ) : (
            <ol className="tf-ranking-list mb-0">
              {topThree.map((entry) => (
                <li key={entry.id}>
                  <span>{entry.full_name}</span>
                  <strong>{entry.total_points} pts</strong>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="d-flex flex-wrap gap-2 mt-auto">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onComplete(challenge.id)}
            disabled={!active}
          >
            Concluir treino
          </button>

          {canManage && (
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => onToggle(challenge.id, active ? 0 : 1)}
            >
              {active ? 'Desativar' : 'Ativar'}
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
