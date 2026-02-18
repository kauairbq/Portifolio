# TrainForge - TODO de desenvolvimento

## Fase 1 - Setup

- [x] Estrutura base do projeto criada no caminho WAMP
- [x] Frontend React (Vite) configurado
- [x] Backend Node.js + Express configurado
- [x] Pasta `backend/legacy-php` preservada para referencia
- [x] `.gitignore` configurado

## Fase 2 - Base de dados

- [x] `schema.sql` atualizado para modelo SaaS fitness
- [x] `seed.sql` com utilizadores, desafio, servicos e dados demo
- [x] Ligacao MySQL preparada via `backend/utils/db.js`
- [ ] Executar scripts SQL localmente no MySQL do WAMP

## Fase 3 - Backend API

- [x] Auth com JWT + refresh rotativo
- [x] RBAC (admin / trainer / client)
- [x] Endpoints de desafios e ranking
- [x] Endpoints de servicos, solicitacoes e orcamentos
- [x] Endpoints de historico e suporte
- [x] Endpoint de feedback com notificacao por email (Nodemailer)
- [x] Rate limit global e auth
- [ ] Testar todos endpoints no Postman/Insomnia

## Fase 4 - Frontend

- [x] Login e area autenticada
- [x] Dashboard com metricas e ranking global
- [x] Desafio semanal com top 3 e conclusao de treino
- [x] Gestao de servicos e historico de solicitacoes
- [x] Area do cliente com campos: nome, nascimento, morada, pagamento
- [x] Suporte e historico na pagina de settings
- [x] Painel admin com indicadores e ranking
- [x] Responsividade base para mobile/tablet/desktop
- [ ] Refinar UX visual premium (microinteracoes + empty states)

## Fase 5 - Qualidade e entrega

- [x] Testes backend base (`npm test` no backend)
- [ ] Testes de integracao completos (login -> refresh -> acao protegida)
- [ ] Testes frontend automatizados (componentes e paginas)
- [ ] Pipeline CI (lint + test + build)
- [x] README completo com stack, setup, endpoints e credenciais demo
- [ ] Deploy final (backend + frontend) e smoke test de producao

## Checkpoints obrigatorios

- [ ] Frontend funcional ligado ao backend Node
- [ ] Backend substituindo fluxo PHP antigo
- [ ] Conexao DB validada localmente
- [ ] Auth JWT validada (login, refresh, logout)
- [ ] Ranking e desafio semanal validados ponta a ponta
- [ ] Integracao final com portfolio validada
