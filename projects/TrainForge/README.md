# TrainForge - Plataforma de Gestao de Performance Fitness

Aplicacao SaaS para personal trainers e alunos com foco em performance, desafios semanais, ranking global e operacao hibrida (presencial + online).

## Objetivo de negocio

TrainForge foi desenhado para operar como produto recorrente para personal trainers:

- competicao entre alunos online e presenciais no mesmo ranking
- desafio semanal com pontuacao e top 3 destacados
- historico completo de servicos, treinos e suporte
- base para monetizacao via assinaturas, personalizacoes e relatorios

## Stack

### Front-end

- React + Vite
- React Router DOM
- Axios
- Bootstrap 5 + Tailwind utilities
- React Icons
- Recharts
- Framer Motion
- Formik + Yup

### Back-end

- Node.js + Express
- MySQL (WAMP)
- JWT (access token curto + refresh token rotativo)
- RBAC: `admin`, `trainer`, `client`
- Rate limit + middlewares de seguranca

### Integracoes

- API REST
- Notificacao por email (Nodemailer)

## Estrutura de pastas

```text
TrainForge/
  backend/
    controllers/
    routes/
    models/
    utils/
    middlewares/
    db/
    tests/
    app.js
    server.js
    package.json

  frontend/
    src/
      components/
      pages/
      services/
      styles/
      utils/
    public/
    package.json

  database/
    schema.sql
    seed.sql

  tests/
    backend/
    frontend/

  TODO.md
  README.md
  index.html
```

## Setup local (WAMP + Node)

> Caminho local: `C:\wamp64\www\Fullstack MD\projects\TrainForge`

### 1) Base de dados

1. Criar DB `trainforge` no MySQL.
2. Executar:
   - `database/schema.sql`
   - `database/seed.sql`

### 2) Backend (Node/Express)

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

API em `http://localhost:8085/api/v1`.

Health check:

```bash
GET http://localhost:8085/api/v1/health
```

### 3) Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend em `http://localhost:5173`.

Opcional no `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8085/api/v1
```

## Credenciais demo

Todos os utilizadores seeded usam:

- password: `password`

Contas:

- `admin@trainforge.local` (admin)
- `kauai@trainforge.local` (trainer)
- `ana@trainforge.local` (client)
- `bruno@trainforge.local` (client)

## Endpoints principais

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `GET /auth/me`
- `POST /auth/logout`
- `POST /auth/logout-all`

### Usuarios / Area do cliente

- `GET /users/me`
- `PATCH /users/me`
- `GET /users/me/history`
- `GET /users/me/support`
- `POST /users/me/support`
- `GET /users?role=client` (admin/trainer)

### Desafios e ranking

- `GET /challenges`
- `POST /challenges` (admin/trainer)
- `PATCH /challenges/:id/toggle` (admin/trainer)
- `GET /challenges/:id/ranking?top=3`
- `POST /challenges/:id/complete`

### Workouts

- `GET /workouts/leaderboard`
- `GET /workouts/metrics`
- `GET /workouts/history`
- `POST /workouts`

### Servicos, solicitacoes e orcamentos

- `GET /services/catalog`
- `POST /services/catalog` (admin/trainer)
- `PATCH /services/catalog/:id/toggle` (admin/trainer)
- `POST /services/requests`
- `GET /services/requests`
- `PATCH /services/requests/:id/status` (admin/trainer)
- `POST /services/quotes` (admin/trainer)
- `GET /services/quotes`

### Feedback e admin

- `POST /feedback`
- `GET /feedback` (admin/trainer)
- `GET /admin/overview` (admin/trainer)
- `GET /admin/rankings` (admin/trainer)

## Testes

### Backend

```bash
cd backend
npm test
```

### Frontend

Use os testes em `tests/frontend` com a stack de testes que preferir (`vitest` ou `jest`).

## Notas de migracao

- O backend PHP antigo foi preservado em `backend/legacy-php/` apenas para referencia.
- A implementacao ativa agora e Node/Express em `backend/`.

## Proximos passos

- adicionar CI com testes + lint
- adicionar auditoria de eventos e observabilidade (logs estruturados)
- adicionar multi-tenant por organizacao para escalar o modelo SaaS
