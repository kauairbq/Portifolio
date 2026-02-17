import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.get('/users.php?role=student').then((res) => setStudents(res.data?.data || [])).catch(() => null);
  }, []);

  return (
    <section className="row g-4">
      <div className="col-12">
        <div className="card tf-card">
          <div className="card-body">
            <h3>Alunos</h3>
            <p className="text-secondary mb-0">Gestão de alunos presenciais e online.</p>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="card tf-card">
          <div className="card-body table-responsive">
            <table className="table table-dark table-hover align-middle">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Estado</th>
                  <th>Entrada</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{Number(s.is_online) ? 'Online' : 'Presencial'}</td>
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

