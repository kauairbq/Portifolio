import { useEffect, useState } from 'react';

import { api } from '../services/api';

export default function Students({ user }) {
  const [students, setStudents] = useState([]);
  const isManager = ['admin', 'trainer'].includes(user.role);

  useEffect(() => {
    if (!isManager) return;
    api
      .get('/users?role=client')
      .then((res) => setStudents(res.data?.data || []))
      .catch(() => null);
  }, [isManager]);

  if (!isManager) {
    return (
      <section className="row g-4">
        <div className="col-12">
          <div className="card tf-card">
            <div className="card-body">
              <h3>Alunos</h3>
              <p className="text-secondary mb-0">Esta area e exclusiva para administradores e personal trainers.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="row g-4">
      <div className="col-12">
        <div className="card tf-card">
          <div className="card-body">
            <h3>Alunos</h3>
            <p className="text-secondary mb-0">Gestao de alunos presenciais e online numa base unica.</p>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="card tf-card">
          <div className="card-body table-responsive">
            <table className="table table-dark table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Tipo</th>
                  <th>Data nascimento</th>
                  <th>Entrada</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.full_name}</td>
                    <td>{s.email}</td>
                    <td>{s.mode === 'presencial' ? 'Presencial' : 'Online'}</td>
                    <td>{s.birth_date ? new Date(s.birth_date).toLocaleDateString('pt-PT') : '-'}</td>
                    <td>{new Date(s.created_at).toLocaleDateString('pt-PT')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
