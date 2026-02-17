export default function Settings({ user }) {
  return (
    <section className="row g-4">
      <div className="col-12 col-lg-8">
        <div className="card tf-card">
          <div className="card-body">
            <h3>Definições</h3>
            <p className="text-secondary mb-4">Preferências do perfil e parâmetros da plataforma.</p>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nome</label>
                <input className="form-control" defaultValue={user.name} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input className="form-control" defaultValue={user.email} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Tema</label>
                <select className="form-select">
                  <option>Dark (padrão)</option>
                  <option>Light</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Notificações</label>
                <select className="form-select">
                  <option>Ativas</option>
                  <option>Silenciadas</option>
                </select>
              </div>
              <div className="col-12">
                <button className="btn btn-primary">Guardar alterações</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

