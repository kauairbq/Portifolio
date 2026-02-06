# Plataforma de Assinaturas (SaaS Billing)

Stack (moderno):
- Frontend: React + Vite + TypeScript + Tailwind
- Backend: NestJS + TypeScript + Prisma
- DB: PostgreSQL local
- Auth: JWT + Refresh + RBAC

## Estrutura
- `apps/web` (frontend)
- `apps/api` (backend)
- `infra/db` (docker opcional)
- `docs` (arquitetura, fluxos, API)
- `tests` (testes adicionais)
- `scripts` (utilitários)

## Setup rápido (Windows)

### 1) Base de dados (PostgreSQL)
Usamos o PostgreSQL local (serviço `postgresql-x64-16`).

Credenciais padrão do projeto:
- User: `saas_user`
- Password: `03101812@`
- DB: `saas_billing`
- Port: `5432`

### 2) Backend (NestJS)
```bash
cd apps/api
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run start:dev
```
API: `http://localhost:4010/api`
Health: `http://localhost:4010/health`

### 3) Frontend (React)
```bash
cd apps/web
npm install
npm run dev
```
Frontend: `http://localhost:5175`

## Variáveis de ambiente
Backend (`apps/api/.env`):
- `DATABASE_URL=postgresql://saas_user:03101812%40@localhost:5432/saas_billing?schema=public`
- `PORT=4010`

Frontend (`apps/web/.env`):
- `VITE_API_URL=http://localhost:4010/api`

## Testes
```bash
cd apps/api
npm test
```

## Status
MVP funcional com CRUD de planos, subscrições e faturas.
