import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { api } from '../services/api';

const schema = Yup.object({
  subject: Yup.string().required('Obrigatório'),
  message: Yup.string().min(8, 'Mínimo 8 caracteres').required('Obrigatório'),
  rating: Yup.number().min(1).max(5).required('Obrigatório')
});

export default function Feedback() {
  return (
    <section className="row g-4">
      <div className="col-12 col-lg-8">
        <div className="card tf-card">
          <div className="card-body">
            <h3>Feedback</h3>
            <p className="text-secondary">Envie feedback para o personal trainer.</p>
            <Formik
              initialValues={{ subject: 'Feedback da semana', message: '', rating: 5 }}
              validationSchema={schema}
              onSubmit={async (values, { setStatus, setSubmitting, resetForm }) => {
                try {
                  const { data } = await api.post('/feedback.php', values);
                  if (!data?.ok) throw new Error(data?.error || 'Falha no envio');
                  setStatus('Feedback enviado com sucesso.');
                  resetForm();
                } catch (err) {
                  setStatus(err.message || 'Erro ao enviar feedback');
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, status }) => (
                <Form className="d-grid gap-3">
                  <div>
                    <label className="form-label">Assunto</label>
                    <Field className="form-control" name="subject" />
                    <small className="text-danger"><ErrorMessage name="subject" /></small>
                  </div>
                  <div>
                    <label className="form-label">Mensagem</label>
                    <Field as="textarea" rows="4" className="form-control" name="message" />
                    <small className="text-danger"><ErrorMessage name="message" /></small>
                  </div>
                  <div>
                    <label className="form-label">Rating</label>
                    <Field as="select" className="form-select" name="rating">
                      <option value={5}>5</option>
                      <option value={4}>4</option>
                      <option value={3}>3</option>
                      <option value={2}>2</option>
                      <option value={1}>1</option>
                    </Field>
                    <small className="text-danger"><ErrorMessage name="rating" /></small>
                  </div>
                  {status ? <div className="alert alert-info py-2">{status}</div> : null}
                  <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'A enviar...' : 'Enviar feedback'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}

