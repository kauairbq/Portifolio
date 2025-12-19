# Portfolio Web - Fullstack MD

Portfolio web moderno e responsivo em HTML, CSS e JavaScript, com paginas estaticas e dados dinamicos em JSON para projetos, servicos e precos.

## Funcionalidades

- Design responsivo para desktop, tablet e mobile
- Modo escuro/claro com preferencia salva
- Animações e scroll suave
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

## Contato

- Email: kauai_lucas@hotmail.com
- GitHub: https://github.com/kauairbq
- LinkedIn: https://linkedin.com/in/kauai-lucas-rocha-bozoli-quinup/
