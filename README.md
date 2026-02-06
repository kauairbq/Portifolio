# Portfolio Web — Fullstack MD

![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000)
![Vue](https://img.shields.io/badge/Vue-42b883?logo=vue.js&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=white)

Portfólio web moderno e responsivo com projetos front-end e full‑stack. Inclui páginas estáticas, apps React/Vue, APIs Node/Nest, bases de dados SQL/NoSQL e exemplos funcionais com foco em UX, desempenho e organização.

## Funcionalidades principais

- Design responsivo (desktop, tablet e mobile)
- Modo claro/escuro com preferência guardada
- Animações e scroll suave
- Galeria e página de projetos com dados em JSON
- Projetos separados em `projects/` com estrutura própria
- Servidor local para servir tudo via `server.js`

## Tecnologias (stack global do repositório)

**Base do portfólio**
- HTML5, CSS3, JavaScript (ES6+)
- JSON (dados do site)
- Node.js (server.js para servir localmente)
- PHP (WAMP para projetos que usam PHP)

**Frontend**
- React (CRA e Vite)
- Vue.js (Vite)
- TypeScript (em projetos específicos)
- Tailwind CSS, Bootstrap
- Font Awesome

**Backend / APIs**
- Node.js + Express
- NestJS (SaaS Billing)
- Prisma (ORM)
- Socket.IO (tempo real)
- JWT (autenticação)
- Swagger (documentação)

**Bases de dados**
- PostgreSQL
- MongoDB
- MySQL

**Testes / Qualidade**
- Jest

## Projetos incluídos (exemplos)

- **SaaS Billing** (NestJS + Prisma + PostgreSQL + React)
- **CRM Lookcar** (Vue + Node + PostgreSQL)
- **Taskflow** (Vue + MongoDB)
- **Xkairos Tech** (PHP/MySQL + front premium)
- **SmartConnect Home** (Flutter + Firebase)
- **Stand Automóveis** (landing com filtros e UX moderna)
- **Personal Trainer** (landing + calculadoras)
- **E-commerce demo** (React + API mock)
- **Dashboard Dados Reais** (React + TypeScript + API pública)

> A lista completa vive em `data/projects.json` e no próprio portfólio.

## Estrutura do projeto

```
Fullstack MD/
|-- assets/                  # Recursos estáticos (imagens, etc.)
|-- components/              # Componentes HTML reutilizáveis
|-- css/                     # Estilos globais e páginas
|-- data/                    # JSONs de projetos, serviços e preços
|-- img/                     # Imagens gerais do site
|-- js/                      # Scripts do site
|-- projects/                # Projetos individuais do portfólio
|-- public/                  # Arquivos públicos (se usados pelo build)
|-- scripts/                 # Scripts auxiliares
|-- src/                     # Código fonte (se usado por build)
|-- video/                   # Vídeos do site
|-- curriculo-e-carta/       # CV e carta de apresentação
|-- server.js                # Servidor local (quando usado)
|-- package.json             # Dependências
|-- index.html
|-- projects.html
|-- README.md
```

## Dados dinâmicos

- `data/projects.json`: lista de projetos do portfólio
- `data/services.json`: dados da secção de serviços
- `data/pricing.json`: dados da tabela de preços

## Como executar (local)

**Portfólio**

```bash
# Node.js (servidor do portfólio)
$env:PORT=8080; node server.js
# abrir: http://localhost:8080/
```

**Projetos em PHP (WAMP)**

- Inicie o Apache do WAMP
- Aceda via `http://localhost/`

**Exemplo: SaaS Billing**

```bash
# API (NestJS)
cd projects/saas-billing/apps/api
$env:PORT=4010; npm run start:dev

# Frontend (Vite + React)
cd projects/saas-billing/apps/web
npm run dev -- --host 0.0.0.0 --port 5175
```

## Configuração de ambiente (.env central)

1. Copie `.env.example` para `.env`
2. Preencha os valores de base de dados
3. Os projetos leem o `.env` da raiz com fallbacks locais

### Variáveis principais

- `POSTGRES_*` e/ou `DATABASE_URL`
- `MONGODB_URI`
- `MYSQL_*`

### Overrides por projeto (opcional)

- `CRM_DATABASE_URL`
- `ECOMMERCE_DATABASE_URL` e `ECOMMERCE_POSTGRES_*`
- `TODO_MONGODB_URI`
- `TASKFLOW_MONGODB_URI`
- `XKAIROS_MYSQL_*`

## Deploy (Vercel)

O repositório está ligado ao Vercel. Cada `git push` na branch `main` dispara um deploy automático.

## Contato

- Email: kauai_lucas@hotmail.com
- GitHub: https://github.com/kauairbq
- LinkedIn: https://linkedin.com/in/kauai-lucas-rocha-bozoli-quinup/
