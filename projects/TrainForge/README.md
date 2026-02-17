# TrainForge - Plataforma de Gestão de Performance Fitness

SaaS para personal trainers e alunos com foco em performance, desafios semanais, ranking global, feedback e operação híbrida (presencial + online).

## Stack

- Front-end: React, React Router DOM, Axios, Bootstrap, React Icons, Recharts, Framer Motion, Formik, Yup
- Back-end: PHP 8, MySQL, JWT (access token), refresh token rotativo persistido
- Ferramentas: Vite, WAMP, Composer (opcional para PHPMailer), Postman/Insomnia

## Estrutura

```text
TrainForge/
  backend/
    api/
    config/
    utils/
  frontend/
    src/
    public/
  database/
    schema.sql
    seed.sql
  tests/
```

## Requisitos

- Node.js 18+
- PHP 8+
- MySQL 8+
- WAMP ou ambiente equivalente

## Configuração rápida

### 1. Base de dados

1. Criar DB `trainforge`.
2. Executar:
   - `database/schema.sql`
   - `database/seed.sql`

### 2. Backend

1. Copiar `backend/.env.example` para `backend/.env`.
2. Ajustar credenciais MySQL e chave JWT.
3. Servir via Apache/WAMP:
   - `http://localhost/Fullstack%20MD/projects/TrainForge/backend/api/health.php`

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend em `http://localhost:5173`.

## Endpoints principais

- `POST /auth.php?action=register`
- `POST /auth.php?action=login`
- `POST /auth.php?action=refresh`
- `POST /auth.php?action=logout`
- `POST /auth.php?action=logout-all`
- `GET /users.php`
- `GET|POST|PATCH /challenges.php`
- `GET|POST /workouts.php`
- `GET|POST /feedback.php`

## Observações de produção

- Substituir segredos de `.env` por variáveis seguras.
- Ativar SMTP real para e-mails.
- Reforçar rate limiting no edge/proxy (Nginx/Cloudflare).

