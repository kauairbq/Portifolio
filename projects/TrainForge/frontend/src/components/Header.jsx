import { FiBell, FiLogOut } from 'react-icons/fi';
import { roleLabel } from '../utils/helpers';

export default function Header({ user, onLogout }) {
  return (
    <header className="tf-header d-flex align-items-center justify-content-between px-4 py-3">
      <div>
        <h1 className="tf-title m-0">TrainForge</h1>
        <small className="text-secondary">Gestão de performance fitness</small>
      </div>
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-outline-light btn-sm">
          <FiBell />
        </button>
        <div className="text-end">
          <div className="fw-semibold">{user.name}</div>
          <small className="text-secondary">{roleLabel(user.role)}</small>
        </div>
        <button className="btn btn-primary btn-sm d-flex align-items-center gap-2" onClick={onLogout}>
          <FiLogOut />
          Sair
        </button>
      </div>
    </header>
  );
}

