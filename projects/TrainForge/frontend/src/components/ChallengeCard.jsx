import { motion } from 'framer-motion';

export default function ChallengeCard({ challenge, onToggle, canManage }) {
  const active = Number(challenge.is_active) === 1;
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card tf-card h-100"
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">{challenge.title}</h5>
          <span className={`badge ${active ? 'bg-success' : 'bg-secondary'}`}>
            {active ? 'Ativo' : 'Inativo'}
          </span>
        </div>
        <p className="text-secondary mb-2">{challenge.description || 'Sem descrição.'}</p>
        <div className="small text-secondary mb-3">
          <div>Modalidade: {challenge.modality}</div>
          <div>Pontos/dia: {challenge.points_per_day}</div>
        </div>
        {canManage && (
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => onToggle(challenge.id, active ? 0 : 1)}
          >
            {active ? 'Desativar' : 'Ativar'}
          </button>
        )}
      </div>
    </motion.article>
  );
}

