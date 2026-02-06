# IAM API

## Stack
- NestJS + TypeScript
- Prisma + PostgreSQL
- JWT (RS256) + Argon2id
- Redis (rate limit / sessions)
- Swagger
- Jest

## Objetivo
IAM multi-tenant com RBAC, refresh token rotativo, auditoria e session tracking.

## Endpoints minimos
POST /auth/login
POST /auth/refresh
POST /auth/logout
POST /auth/logout-all
POST /tenants
POST /tenants/:id/invite
GET  /tenants/:id/users
PATCH /tenants/:id/users/:userId/role
GET  /roles
POST /roles
GET  /permissions
GET  /audit-logs

## Rodar
cp .env.example .env
npm install
npx prisma migrate dev
npm run start:dev
