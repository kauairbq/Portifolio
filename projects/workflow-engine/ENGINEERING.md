# Workflow Engine

## 1) Identificacao do Projeto
- Nome do projeto: Workflow Engine
- Nome do repositorio: (sem repositorio dedicado)
- Descricao: Motor de workflow versionado com regras e auditoria.
- Tipo: Backend
- Status: Em desenvolvimento
- Nivel alvo: Senior

## 2) Objetivo & Contexto de Negocio
- Problema que resolve: Automatizar processos e aprovacoes.
- Publico-alvo: Operacoes e produto.
- Caso de uso principal: aprovacao com regras.
- Por que esse projeto existe: Provar dominio de state machines.
- Valor entregue: consistencia e auditabilidade.

## 3) Arquitetura Geral
- Estilo: Monolito modular (NestJS)
- Diagrama (alto nivel): (inserir diagrama simples)
- Separacao de responsabilidades: workflows, versions, instances, rules, jobs.
- Fluxo principal de dados: criar workflow -> versao -> instancia -> transicao.

## 4) Stack Tecnica
### Backend
- Linguagem: TypeScript
- Framework: NestJS
- ORM / Query: Prisma
- Validacao: class-validator
- Auth / Security: JWT

### Frontend
- Framework: N/A
- State management: N/A
- UI library / design system: N/A
- Responsividade / A11y: N/A

### Base de Dados
- Tipo: SQL
- Engine: PostgreSQL
- Migracoes: Prisma Migrate
- Versionamento: Git

## 5) Funcionalidades Core
- CRUD principal: workflows, versions, instances
- Regras de negocio: transitions validas
- Estados / lifecycle: state machine
- Permissoes / papeis: RBAC (futuro)
- Casos de erro tratados: transicao invalida

## 6) Autenticacao & Autorizacao
- Login / Logout: sim
- Tokens / Sessions: JWT
- RBAC / ACL: planned
- Multi-tenant: planned
- Rate limit / protecao: planned

## 7) Seguranca
- Hash de passwords: N/A
- Protecao contra brute-force: rate limit
- Input validation: sim
- CORS configurado: sim
- Secrets fora do codigo: env
- Auditoria de acoes: sim

## 8) Observabilidade
- Logs estruturados: sim
- Tratamento de erros: sim
- Health check: sim
- Metricas basicas: mock
- Alertas: mock

## 9) Performance & Qualidade
- Queries otimizadas: sim
- Indexes relevantes: sim
- Cache: redis
- Codigo modular: sim
- Naming consistente: sim

## 10) Testes
- Unit tests: rule evaluator
- Integration tests: transition
- Regras criticas: state machine
- Seed de dados: sim

## 11) Infraestrutura & Deploy
- Docker: sim
- Docker Compose: sim
- Variaveis de ambiente: sim
- CI: GitHub Actions
- Estrategia de deploy: container

## 12) Documentacao
- README claro: sim
- Setup: sim
- Diagramas: a adicionar
- Exemplos de uso: sim
- Decisoes tecnicas: sim

## 13) UX / DX
- Mensagens de erro claras: sim
- Consistencia de API: sim
- Versionamento de endpoints: v1
- Scripts uteis: seed/reset

## 14) Avaliacao Final
- O que esta forte: state machine + versionamento
- O que esta fraco: falta API completa
- O que cortar: nada
- O que evoluir: jobs + rules
- Pronto para portefolio: Nao (ate completar)
