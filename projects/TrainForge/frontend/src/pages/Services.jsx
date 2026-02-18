import { useEffect, useState } from 'react';

import { api } from '../services/api';

export default function Services({ user }) {
  const [catalog, setCatalog] = useState([]);
  const [requests, setRequests] = useState([]);
  const [quotes, setQuotes] = useState([]);

  const [newService, setNewService] = useState({ name: '', description: '' });
  const [requestForm, setRequestForm] = useState({ serviceId: '', notes: '' });
  const [quoteForm, setQuoteForm] = useState({ userId: '', serviceRequestId: '', budgetEstimate: '', notes: '' });

  const isManager = ['admin', 'trainer'].includes(user.role);

  const load = async () => {
    const [catalogRes, requestRes, quoteRes] = await Promise.all([
      api.get(`/services/catalog?activeOnly=${isManager ? 'false' : 'true'}`),
      api.get('/services/requests'),
      api.get('/services/quotes')
    ]);

    setCatalog(catalogRes.data?.data || []);
    setRequests(requestRes.data?.data || []);
    setQuotes(quoteRes.data?.data || []);
  };

  useEffect(() => {
    load().catch(() => null);
  }, []);

  const createRequest = async (e) => {
    e.preventDefault();
    if (!requestForm.serviceId) return;

    await api.post('/services/requests', {
      serviceId: Number(requestForm.serviceId),
      notes: requestForm.notes
    });

    setRequestForm({ serviceId: '', notes: '' });
    await load();
  };

  const createCatalog = async (e) => {
    e.preventDefault();
    if (!newService.name) return;

    await api.post('/services/catalog', {
      name: newService.name,
      description: newService.description
    });

    setNewService({ name: '', description: '' });
    await load();
  };

  const toggleCatalog = async (id, isActive) => {
    await api.patch(`/services/catalog/${id}/toggle`, { isActive });
    await load();
  };

  const updateRequestStatus = async (id, status) => {
    await api.patch(`/services/requests/${id}/status`, { status });
    await load();
  };

  const createQuote = async (e) => {
    e.preventDefault();
    if (!quoteForm.userId) return;

    await api.post('/services/quotes', {
      userId: Number(quoteForm.userId),
      serviceRequestId: quoteForm.serviceRequestId ? Number(quoteForm.serviceRequestId) : null,
      budgetEstimate: quoteForm.budgetEstimate ? Number(quoteForm.budgetEstimate) : null,
      notes: quoteForm.notes
    });

    setQuoteForm({ userId: '', serviceRequestId: '', budgetEstimate: '', notes: '' });
    await load();
  };

  return (
    <section className="row g-4">
      <div className="col-12">
        <div className="card tf-card">
          <div className="card-body">
            <h3>Gestao de servicos e projetos</h3>
            <p className="text-secondary mb-0">
              Solicite servicos, acompanhe estado e gere referencias de treino e orcamentos.
            </p>
          </div>
        </div>
      </div>

      <div className="col-12 col-xl-5">
        <div className="card tf-card h-100">
          <div className="card-body">
            <h5>Solicitar servico</h5>
            <form className="d-grid gap-2" onSubmit={createRequest}>
              <select
                className="form-select"
                value={requestForm.serviceId}
                onChange={(e) => setRequestForm({ ...requestForm, serviceId: e.target.value })}
              >
                <option value="">Selecionar servico</option>
                {catalog
                  .filter((item) => Number(item.is_active) === 1)
                  .map((item) => (
                    <option value={item.id} key={item.id}>{item.name}</option>
                  ))}
              </select>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Notas adicionais"
                value={requestForm.notes}
                onChange={(e) => setRequestForm({ ...requestForm, notes: e.target.value })}
              />
              <button className="btn btn-primary">Enviar solicitacao</button>
            </form>
          </div>
        </div>
      </div>

      <div className="col-12 col-xl-7">
        <div className="card tf-card h-100">
          <div className="card-body">
            <h5>Historico e status</h5>
            <div className="table-responsive">
              <table className="table table-dark align-middle mb-0">
                <thead>
                  <tr>
                    <th>Servico</th>
                    <th>Status</th>
                    <th>Notas</th>
                    {isManager ? <th>Acoes</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {requests.map((row) => (
                    <tr key={row.id}>
                      <td>{row.service_name}</td>
                      <td>{row.status}</td>
                      <td>{row.notes || '-'}</td>
                      {isManager ? (
                        <td>
                          <select
                            className="form-select form-select-sm"
                            value={row.status}
                            onChange={(e) => updateRequestStatus(row.id, e.target.value)}
                          >
                            <option value="pending">pending</option>
                            <option value="approved">approved</option>
                            <option value="in_progress">in_progress</option>
                            <option value="completed">completed</option>
                            <option value="cancelled">cancelled</option>
                          </select>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isManager && (
        <>
          <div className="col-12 col-lg-6">
            <div className="card tf-card h-100">
              <div className="card-body">
                <h5>Catalogo de servicos</h5>
                <form className="d-grid gap-2 mb-3" onSubmit={createCatalog}>
                  <input
                    className="form-control"
                    placeholder="Nome do servico"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  />
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Descricao"
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  />
                  <button className="btn btn-primary">Adicionar servico</button>
                </form>

                <ul className="tf-mini-list mb-0">
                  {catalog.map((item) => (
                    <li key={item.id} className="d-flex justify-content-between align-items-center gap-2">
                      <span>{item.name}</span>
                      <button
                        className="btn btn-sm btn-outline-light"
                        onClick={() => toggleCatalog(item.id, Number(item.is_active) !== 1)}
                      >
                        {Number(item.is_active) === 1 ? 'Desativar' : 'Ativar'}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="card tf-card h-100">
              <div className="card-body">
                <h5>Orcamentos</h5>
                <form className="row g-2 mb-3" onSubmit={createQuote}>
                  <div className="col-md-4">
                    <input
                      className="form-control"
                      placeholder="ID cliente"
                      value={quoteForm.userId}
                      onChange={(e) => setQuoteForm({ ...quoteForm, userId: e.target.value })}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      className="form-control"
                      placeholder="ID solicitacao"
                      value={quoteForm.serviceRequestId}
                      onChange={(e) => setQuoteForm({ ...quoteForm, serviceRequestId: e.target.value })}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      className="form-control"
                      placeholder="Valor"
                      value={quoteForm.budgetEstimate}
                      onChange={(e) => setQuoteForm({ ...quoteForm, budgetEstimate: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Notas"
                      value={quoteForm.notes}
                      onChange={(e) => setQuoteForm({ ...quoteForm, notes: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary">Emitir orcamento</button>
                  </div>
                </form>

                <ul className="tf-mini-list mb-0">
                  {quotes.map((quote) => (
                    <li key={quote.id}>
                      Cliente #{quote.user_id} - {quote.status} - {quote.budget_estimate ?? 'n/a'}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
