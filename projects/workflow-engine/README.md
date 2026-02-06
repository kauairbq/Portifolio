# Workflow Engine

## Stack
- NestJS + TypeScript
- Prisma + PostgreSQL
- BullMQ + Redis
- Swagger
- Jest

## Objetivo
Motor de workflow com versionamento, state machine, rules e auditoria.

## Endpoints minimos
POST /workflows
POST /workflows/:id/versions
GET  /workflows/:id
POST /instances
GET  /instances/:id
POST /instances/:id/transition
GET  /instances/:id/events

## Rodar
cp .env.example .env
npm install
npx prisma migrate dev
npm run start:dev
