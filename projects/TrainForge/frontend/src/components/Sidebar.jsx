import { NavLink } from 'react-router-dom';
import { FiBarChart2, FiFlag, FiUsers, FiMessageSquare, FiSettings } from 'react-icons/fi';

export default function Sidebar({ role }) {
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
        <NavLink to="/students" className="tf-link">
          <FiUsers /> Alunos
        </NavLink>
        <NavLink to="/feedback" className="tf-link">
          <FiMessageSquare /> Feedback
        </NavLink>
        <NavLink to="/settings" className="tf-link">
          <FiSettings /> Definições
        </NavLink>
      </nav>

      <div className="mt-auto pt-4 text-secondary">
        <small>Papel atual: {role}</small>
      </div>
    </aside>
  );
}

