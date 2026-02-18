import { FiBell, FiLogOut } from 'react-icons/fi';

import { roleLabel } from '../utils/helpers';

export default function Header({ user, onLogout }) {
  const displayName = user.full_name || user.name || 'Utilizador';

  return (
    <header className="tf-header d-flex align-items-center justify-content-between px-4 py-3">
      <div>
        <h1 className="tf-title m-0">TrainForge</h1>
        <small className="text-secondary">Gestao de performance fitness para personal trainers e alunos</small>
      </div>
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-outline-light btn-sm" type="button">
          <FiBell />
        </button>
        <div className="text-end">
          <div className="fw-semibold">{displayName}</div>
          <small className="text-secondary">{roleLabel(user.role)}</small>
        </div>
        <button className="btn btn-primary btn-sm d-flex align-items-center gap-2" onClick={onLogout} type="button">
          <FiLogOut />
          Sair
        </button>
      </div>
    </header>
  );
}
