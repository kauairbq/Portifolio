import { useEffect, useState } from 'react';

import { api } from '../services/api';

function paymentToText(paymentInfo) {
  if (!paymentInfo) return '';
  if (typeof paymentInfo === 'string') return paymentInfo;
  return JSON.stringify(paymentInfo);
}

export default function Settings({ user, onUserUpdate }) {
  const [form, setForm] = useState({
    fullName: user.full_name || user.name || '',
    birthDate: user.birth_date ? String(user.birth_date).slice(0, 10) : '',
    address: user.address || '',
    paymentInfo: paymentToText(user.payment_info),
    mode: user.mode || 'online'
  });
  const [history, setHistory] = useState({ workouts: [], requests: [], tickets: [], feedback: [] });
  const [supportForm, setSupportForm] = useState({ subject: '', message: '' });
  const [status, setStatus] = useState('');

  const loadHistory = async () => {
    const { data } = await api.get('/users/me/history');
    setHistory(data?.data || { workouts: [], requests: [], tickets: [], feedback: [] });
  };

  useEffect(() => {
    loadHistory().catch(() => null);
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();
    setStatus('');

    try {
      const parsedPayment = form.paymentInfo ? JSON.parse(form.paymentInfo) : null;
      const { data } = await api.patch('/users/me', {
        fullName: form.fullName,
        birthDate: form.birthDate || null,
        address: form.address || null,
        paymentInfo: parsedPayment,
        mode: form.mode
      });

      if (!data?.ok) throw new Error(data?.error || 'Falha ao guardar dados');

      onUserUpdate(data.data);
      localStorage.setItem('trainforge_user', JSON.stringify(data.data));
      setStatus('Perfil atualizado com sucesso.');
    } catch (err) {
      setStatus(err.message || 'Erro ao atualizar perfil. Em paymentInfo use JSON valido.');
    }
  };

  const createSupportTicket = async (e) => {
    e.preventDefault();
    if (!supportForm.subject || !supportForm.message) return;

    await api.post('/users/me/support', supportForm);
    setSupportForm({ subject: '', message: '' });
    await loadHistory();
  };

  return (
    <section className="row g-4">
      <div className="col-12 col-xl-7">
        <div className="card tf-card">
          <div className="card-body">
            <h3>Area do cliente</h3>
            <p className="text-secondary mb-4">
              Atualize nome completo, data de nascimento, morada e informacoes de pagamento.
            </p>

            <form className="row g-3" onSubmit={saveProfile}>
              <div className="col-md-6">
                <label className="form-label">Nome completo</label>
                <input
                  className="form-control"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Data de nascimento</label>
                <input
                  className="form-control"
                  type="date"
                  value={form.birthDate}
                  onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Morada</label>
                <input
                  className="form-control"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Tipo de aluno</label>
                <select
                  className="form-select"
                  value={form.mode}
                  onChange={(e) => setForm({ ...form, mode: e.target.value })}
                >
                  <option value="online">Online</option>
                  <option value="presencial">Presencial</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Informacoes de pagamento (JSON)</label>
                <textarea
                  rows="2"
                  className="form-control"
                  value={form.paymentInfo}
                  onChange={(e) => setForm({ ...form, paymentInfo: e.target.value })}
                />
              </div>
              <div className="col-12 d-flex gap-2 flex-wrap">
                <button className="btn btn-primary" type="submit">Guardar dados</button>
                <button className="btn btn-outline-light" type="button" onClick={loadHistory}>Atualizar historico</button>
              </div>
              {status ? <div className="col-12"><div className="alert alert-info py-2 mb-0">{status}</div></div> : null}
            </form>
          </div>
        </div>
      </div>

      <div className="col-12 col-xl-5">
        <div className="card tf-card h-100">
          <div className="card-body">
            <h5>Suporte</h5>
            <p className="text-secondary">Abra solicitacoes diretamente pela area do cliente.</p>
            <form className="d-grid gap-2" onSubmit={createSupportTicket}>
              <input
                className="form-control"
                placeholder="Assunto"
                value={supportForm.subject}
                onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
              />
              <textarea
                className="form-control"
                rows="4"
                placeholder="Mensagem"
                value={supportForm.message}
                onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
              />
              <button className="btn btn-primary" type="submit">Enviar suporte</button>
            </form>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="card tf-card">
          <div className="card-body">
            <h5>Historico de solicitacoes</h5>
            <div className="row g-3 mt-1">
              <div className="col-lg-4">
                <h6 className="text-secondary">Servicos</h6>
                <ul className="tf-mini-list">
                  {history.requests.map((item) => (
                    <li key={item.id}>{item.service_name} - <strong>{item.status}</strong></li>
                  ))}
                  {history.requests.length === 0 ? <li>Sem registos.</li> : null}
                </ul>
              </div>
              <div className="col-lg-4">
                <h6 className="text-secondary">Treinos</h6>
                <ul className="tf-mini-list">
                  {history.workouts.map((item) => (
                    <li key={item.id}>{item.title} - {item.points} pts</li>
                  ))}
                  {history.workouts.length === 0 ? <li>Sem registos.</li> : null}
                </ul>
              </div>
              <div className="col-lg-4">
                <h6 className="text-secondary">Suporte</h6>
                <ul className="tf-mini-list">
                  {history.tickets.map((item) => (
                    <li key={item.id}>{item.subject} - <strong>{item.status}</strong></li>
                  ))}
                  {history.tickets.length === 0 ? <li>Sem registos.</li> : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
