import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { api } from '../services/api';

const schema = Yup.object({
  email: Yup.string().email('Email invalido').required('Obrigatorio'),
  password: Yup.string().min(6, 'Minimo de 6 caracteres').required('Obrigatorio')
});

export default function Home({ onAuth }) {
  return (
    <div className="tf-auth min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card p-4 tf-auth-card">
        <h2 className="mb-2">TrainForge</h2>
        <p className="text-secondary">Plataforma SaaS para gestao de performance fitness.</p>

        <Formik
          initialValues={{ email: 'kauai@trainforge.local', password: 'password' }}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              const { data } = await api.post('/auth/login', values);
              if (!data?.ok) {
                throw new Error(data?.error || 'Falha no login');
              }
              onAuth(data);
            } catch (err) {
              setStatus(err?.response?.data?.error || err.message || 'Erro ao autenticar');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, status }) => (
            <Form className="d-grid gap-3">
              <div>
                <label className="form-label">Email</label>
                <Field className="form-control" name="email" type="email" />
                <small className="text-danger"><ErrorMessage name="email" /></small>
              </div>
              <div>
                <label className="form-label">Password</label>
                <Field className="form-control" name="password" type="password" />
                <small className="text-danger"><ErrorMessage name="password" /></small>
              </div>
              {status ? <div className="alert alert-danger py-2">{status}</div> : null}
              <button className="btn btn-primary" disabled={isSubmitting} type="submit">
                {isSubmitting ? 'A entrar...' : 'Entrar'}
              </button>
              <small className="text-secondary">Demo password: <strong>password</strong></small>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
