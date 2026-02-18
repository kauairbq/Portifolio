import { NavLink } from 'react-router-dom';
import {
  FiBarChart2,
  FiFlag,
  FiUsers,
  FiMessageSquare,
  FiSettings,
  FiBriefcase,
  FiShield
} from 'react-icons/fi';

export default function Sidebar({ role }) {
  const canSeeAdmin = role === 'admin' || role === 'trainer';

  return (
    <aside className="tf-sidebar p-3">
      <div className="tf-brand mb-4">
        <div className="fw-bold">TF</div>
        <small className="text-secondary">TrainForge</small>
      </div>

      <nav className="d-flex flex-column gap-2">
        <NavLink to="/dashboard" className="tf-link">
          <FiBarChart2 /> Dashboard
        </NavLink>
        <NavLink to="/challenges" className="tf-link">
          <FiFlag /> Desafios
        </NavLink>
        <NavLink to="/services" className="tf-link">
          <FiBriefcase /> Servicos
        </NavLink>
        <NavLink to="/students" className="tf-link">
          <FiUsers /> Alunos
        </NavLink>
        <NavLink to="/feedback" className="tf-link">
          <FiMessageSquare /> Feedback
        </NavLink>
        <NavLink to="/settings" className="tf-link">
          <FiSettings /> Area do cliente
        </NavLink>
        {canSeeAdmin ? (
          <NavLink to="/admin" className="tf-link">
            <FiShield /> Admin
          </NavLink>
        ) : null}
      </nav>

      <div className="mt-auto pt-4 text-secondary">
        <small>Papel atual: {role}</small>
      </div>
    </aside>
  );
}
