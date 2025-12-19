# Portfolio Web - Fullstack MD

![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222?logo=githubpages&logoColor=white)

Portfolio web moderno e responsivo em HTML, CSS e JavaScript, com paginas estaticas e dados dinamicos em JSON para projetos, servicos e precos.

## Funcionalidades

- Design responsivo para desktop, tablet e mobile
- Modo escuro/claro com preferencia salva
- Animacoes e scroll suave
- Galeria e pagina de projetos com dados em JSON
- Paginas institucionais (sobre, servicos, contactos, galeria)
- Componentes reutilizaveis em HTML

## Tecnologias

- HTML5
- CSS3
- JavaScript (ES6+)
- JSON (dados do site)

## Paginas principais

- `index.html`
- `sobre.html`
- `sobre-detalhado.html`
- `servicos.html`
- `galeria.html`
- `projects.html`
- `contactos.html`
- `calculadora-media.html`

## Estrutura do projeto

```
Fullstack MD/
|-- assets/                  # Recursos estaticos (imagens, etc.)
|-- components/              # Componentes HTML reutilizaveis
|-- css/                     # Estilos globais e paginas
|-- data/                    # JSONs de projetos, servicos e precos
|-- img/                     # Imagens gerais do site
|-- js/                      # Scripts do site
|-- projects/                # Projetos individuais do portfolio
|-- public/                  # Arquivos publicos (se usados pelo build)
|-- scripts/                 # Scripts auxiliares
|-- src/                     # Codigo fonte (se usado pelo build)
|-- video/                   # Videos do site
|-- curriculo-e-carta/       # CV e carta de apresentacao
|-- server.js                # Servidor local (quando usado)
|-- package.json             # Dependencias
|-- index.html
|-- projects.html
|-- README.md
```

## Dados dinamicos

- `data/projects.json`: lista de projetos do portfolio
- `data/services.json`: dados da secao de servicos
- `data/pricing.json`: dados da tabela de precos

## Configuracao de ambiente (.env central)

1. Copie `.env.example` para `.env`
2. Preencha os valores de banco
3. Os projetos leem o `.env` da raiz com fallbacks locais

### Variaveis principais

- `POSTGRES_*` e/ou `DATABASE_URL`
- `MONGODB_URI`
- `MYSQL_*`

### Overrides por projeto (opcional)

- `CRM_DATABASE_URL`
- `ECOMMERCE_DATABASE_URL` e `ECOMMERCE_POSTGRES_*`
- `TODO_MONGODB_URI`
- `TASKFLOW_MONGODB_URI`
- `XKAIROS_MYSQL_*`

## Fluxo para novos projetos

1. Crie o projeto em `projects/`
2. Adicione variaveis com prefixo do projeto em `.env.example`
3. No backend, carregue o `.env` da raiz e use fallbacks do prefixo
4. Para bancos SQL, crie a conexao no SQLTools usando as variaveis do `.env`

## Como executar

1. Abrir `index.html` no navegador
2. Ou usar um servidor local:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## Como atualizar projetos

1. Edite `data/projects.json`
2. Adicione imagens em `assets/img/projects/` (ou o caminho usado no JSON)
3. Confirme o link do projeto em `projects/` ou para um URL externo

## Deploy (GitHub Pages)

1. Acesse `Settings -> Pages`
2. Source: `Deploy from a branch`
3. Branch: `main` e pasta `/(root)`
4. Aguarde o build e acesse `https://kauairbq.github.io/Portifolio/`

## Contribuicao

- Abra uma issue descrevendo a melhoria
- Crie um branch com o nome da feature
- Envie um pull request com descricao objetiva

## Contato

- Email: kauai_lucas@hotmail.com
- GitHub: https://github.com/kauairbq
- LinkedIn: https://linkedin.com/in/kauai-lucas-rocha-bozoli-quinup/
