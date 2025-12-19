<?php
include "includes/config.php";
session_start();
$is_logged_in = isset($_SESSION['cliente_id']);
$cliente_nome = $is_logged_in ? $_SESSION['cliente_nome'] : '';
?>

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xkairos Tech - Montagem e ManutenÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o de PCs</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/home.css">
    <link rel="stylesheet" href="assets/css/servicos.css">
    <link rel="stylesheet" href="assets/css/projetos.css">
    <link rel="stylesheet" href="assets/css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
      /* Menu compacto */
      .nav-shell{position:sticky;top:0;z-index:1000;background:linear-gradient(120deg,#0b1022,#101b34);border-bottom:1px solid rgba(255,255,255,0.06);box-shadow:0 12px 40px rgba(0,0,0,0.35);}
      .nav-inner{max-width:1200px;margin:0 auto;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;gap:14px;}
      .nav-brand{display:flex;align-items:center;gap:12px;color:#e7ecf7;font-weight:800;letter-spacing:.02em;text-transform:uppercase;}
      .nav-brand img{height:42px;width:42px;border-radius:50%;object-fit:cover;border:1px solid rgba(255,255,255,0.12);}
      .nav-actions{display:flex;align-items:center;gap:10px;}
      .nav-btn{background:#22d3ee;color:#0b1224;border:none;border-radius:12px;padding:10px 14px;font-weight:800;letter-spacing:.02em;cursor:pointer;box-shadow:0 8px 20px rgba(34,211,238,0.35);transition:transform .15s ease, box-shadow .15s ease;}
      .nav-btn:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(34,211,238,0.45);}
      .nav-toggle{background:#8b5cf6;color:#fff;border:none;border-radius:12px;padding:10px 14px;font-weight:800;letter-spacing:.04em;cursor:pointer;box-shadow:0 8px 20px rgba(139,92,246,0.35);transition:transform .15s ease, box-shadow .15s ease;}
      .nav-toggle:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(139,92,246,0.45);}
      .menu-drawer{position:fixed;inset:0;pointer-events:none;}
      .menu-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.55);opacity:0;transition:opacity .2s ease;}
      .menu-panel{position:absolute;right:16px;top:80px;width:280px;background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;box-shadow:0 22px 60px rgba(0,0,0,0.35);transform:translateY(-8px);opacity:0;transition:transform .2s ease, opacity .2s ease;}
      .menu-panel ul{list-style:none;margin:0;padding:12px;}
      .menu-panel li{border-bottom:1px solid rgba(255,255,255,0.06);}
      .menu-panel li:last-child{border-bottom:none;}
      .menu-panel a{display:block;padding:12px 10px;color:#f5f7fb;font-weight:700;border-radius:10px;transition:background .15s ease;}
      .menu-panel a:hover{background:rgba(255,255,255,0.06);}
      .menu-open .menu-drawer{pointer-events:auto;}
      .menu-open .menu-overlay{opacity:1;}
      .menu-open .menu-panel{transform:translateY(0);opacity:1;}
      @media(max-width:768px){.nav-inner{flex-wrap:wrap;gap:10px;} .nav-actions{width:100%;justify-content:flex-end;} .menu-panel{right:12px;left:12px;width:auto;}}
      .contact-section{padding:32px 18px;background:#0b1022;}
      .contact-card{max-width:900px;margin:0 auto;background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;box-shadow:0 18px 50px rgba(0,0,0,0.35);color:#e7ecf7;}
      .contact-actions{margin-top:12px;display:flex;gap:10px;flex-wrap:wrap;}
    </style>
</head>
<body>
    <header class="nav-shell">
        <div class="nav-inner" role="navigation" aria-label="Menu principal">
            <div class="nav-brand">
                <img src="imagens/favicon-32x32.png" alt="Xkairos Tech Logo">
                <span>Xkairos Tech</span>
            </div>
            <div class="nav-actions">
                <button class="nav-btn" onclick="location.href='orcamentos.php'">OrÃƒÆ’Ã‚Â§amentos</button>
                <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="menu-panel">Menu</button>
            </div>
        </div>
        <div class="menu-drawer" id="menu-drawer">
            <div class="menu-overlay"></div>
            <div class="menu-panel" id="menu-panel">
                <ul>
                    <li><a href="#hero">InÃƒÆ’Ã‚Â­cio</a></li>
                    <li><a href="#servicos">ServiÃƒÆ’Ã‚Â§os</a></li>
                    <li><a href="#projetos">Projetos</a></li>
                    <li><a href="orcamentos.php">OrÃƒÆ’Ã‚Â§amentos</a></li>
                    <li><a href="#contato">Contacto</a></li>
                    <?php if ($is_logged_in): ?>
                        <li><a href="cliente/dashboard.php"><i class="fas fa-user"></i> ÃƒÆ’rea do Cliente</a></li>
                    <?php else: ?>
                        <li><a href="cliente/login.php"><i class="fas fa-user"></i> Login</a></li>
                    <?php endif; ?>
                </ul>
            </div>
        </div>
    </header>

    <!-- HERO PRINCIPAL -->
    <div class="hero-section" id="hero">
        <div class="hero-content">
            <div class="hero-badge">
                <i class="fas fa-star"></i>
                <span>Atendimento Premium</span>
            </div>
            <h2><i class="fas fa-rocket"></i> Bem-vindo ÃƒÆ’Ã‚Â  Xkairos Tech</h2>
            <p>Consultoria e montagem de PCs gamers com performance, inovaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o e engenharia de precisÃƒÆ’Ã‚Â£o.</p>
            <div class="hero-stats">
                <div class="stat">
                    <i class="fas fa-users"></i>
                    <span>100+ Clientes</span>
                </div>
                <div class="stat">
                    <i class="fas fa-cogs"></i>
                    <span>500+ PCs Montados</span>
                </div>
                <div class="stat">
                    <i class="fas fa-star"></i>
                    <span>5.0 AvaliaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o</span>
                </div>
            </div>
        </div>
        <div class="hero-visual">
            <div class="floating-elements">
                <div class="floating-icon icon-1"><i class="fas fa-cogs"></i></div>
                <div class="floating-icon icon-2"><i class="fas fa-microchip"></i></div>
                <div class="floating-icon icon-3"><i class="fas fa-memory"></i></div>
                <div class="floating-icon icon-4"><i class="fas fa-hdd"></i></div>
            </div>
        </div>
    </div>

    <!-- SERVIÃƒÆ’Ã¢â‚¬Â¡OS -->
    <section id="servicos" class="services">
        <div class="services-header">
            <div class="services-badge">
                <i class="fas fa-bolt"></i>
                <span>ServiÃƒÆ’Ã‚Â§os</span>
            </div>
            <h2>Especialistas em hardware</h2>
            <p>Montagem, manutenÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o e consultoria com garantia e suporte dedicado.</p>
        </div>
        <div class="services-grid">
            <a href="orcamentos.php?tipo=montagem" class="service-card">
                <div class="service-icon-wrapper">
                    <i class="fas fa-microchip"></i>
                    <div class="service-glow"></div>
                </div>
                <div class="service-content">
                    <h3>Montagem personalizada</h3>
                    <div class="service-features">
                        <span><i class="fas fa-check"></i> PC ideal para gaming</span>
                        <span><i class="fas fa-check"></i> Testes de estabilidade</span>
                        <span><i class="fas fa-check"></i> Garantia e suporte</span>
                    </div>
                </div>
                <span class="cta">Pedir orÃƒÆ’Ã‚Â§amento</span>
            </a>

            <a href="orcamentos.php?tipo=manutencao" class="service-card">
                <div class="service-icon-wrapper">
                    <i class="fas fa-screwdriver-wrench"></i>
                    <div class="service-glow"></div>
                </div>
                <div class="service-content">
                    <h3>ManutenÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o</h3>
                    <div class="service-features">
                        <span><i class="fas fa-check"></i> Limpeza e troca de pasta tÃƒÆ’Ã‚Â©rmica</span>
                        <span><i class="fas fa-check"></i> Upgrades e otimizaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o</span>
                        <span><i class="fas fa-check"></i> MonitorizaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o de desempenho</span>
                    </div>
                </div>
                <span class="cta">Agendar serviÃƒÆ’Ã‚Â§o</span>
            </a>

            <a href="orcamentos.php?tipo=consultoria" class="service-card">
                <div class="service-icon-wrapper">
                    <i class="fas fa-headset"></i>
                    <div class="service-glow"></div>
                </div>
                <div class="service-content">
                    <h3>Consultoria</h3>
                    <div class="service-features">
                        <span><i class="fas fa-check"></i> Escolha de componentes</span>
                        <span><i class="fas fa-check"></i> Planeamento de upgrades</span>
                        <span><i class="fas fa-check"></i> ResoluÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o de dÃƒÆ’Ã‚Âºvidas</span>
                    </div>
                </div>
                <span class="cta">Falar com um especialista</span>
            </a>
        </div>
    </section>

    <!-- PROJETOS -->
    <section id="projetos" class="projects">
        <div class="projects-header">
            <h2>Projetos em destaque</h2>
            <p>Builds ÃƒÆ’Ã‚Âºnicas e setups otimizados para cada perfil.</p>
        </div>
        <div class="projects-grid">
            <div class="project-card">
                <div class="project-icon"><i class="fas fa-bolt"></i></div>
                <h3>RTX Ultra</h3>
                <p>PC gamer com arrefecimento lÃƒÆ’Ã‚Â­quido, pronto para 4K/120fps.</p>
            </div>
            <div class="project-card">
                <div class="project-icon"><i class="fas fa-shield-halved"></i></div>
                <h3>Workstation Pro</h3>
                <p>RenderizaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o e IA com GPUs profissionais e RAID NVMe.</p>
            </div>
            <div class="project-card">
                <div class="project-icon"><i class="fas fa-gamepad"></i></div>
                <h3>Compact Gaming</h3>
                <p>PotÃƒÆ’Ã‚Âªncia em formato ITX silencioso e eficiente.</p>
            </div>
        </div>
    </section>

    <!-- CONTACTO -->
    <section id="contato" class="contact-section">
        <div class="contact-card">
            <h2>Fale com a equipa</h2>
            <p>Respondemos em 1 dia ÃƒÆ’Ã‚Âºtil. OrÃƒÆ’Ã‚Â§amentos rÃƒÆ’Ã‚Â¡pidos e transparentes.</p>
            <div class="contact-actions">
                <a class="nav-btn" href="mailto:suporte@xkairos.pt"><i class="fas fa-envelope"></i> suporte@xkairos.pt</a>
                <a class="nav-btn" href="orcamentos.php"><i class="fas fa-clipboard-list"></i> Pedir orÃƒÆ’Ã‚Â§amento</a>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="footer-inner">
            <span>Ãƒâ€šÃ‚Â© <?php echo date('Y'); ?> Xkairos Tech</span>
            <span>Montagem Ãƒâ€šÃ‚Â· ManutenÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o Ãƒâ€šÃ‚Â· Consultoria</span>
        </div>
    </footer>

    <script>
      // Toggle menu drawer
      const navToggle = document.getElementById('nav-toggle');
      const menuDrawer = document.getElementById('menu-drawer');
      navToggle?.addEventListener('click', () => {
        const open = document.body.classList.toggle('menu-open');
        navToggle.setAttribute('aria-expanded', String(open));
      });
      menuDrawer?.addEventListener('click', (ev) => {
        if (ev.target.classList.contains('menu-overlay')) {
          document.body.classList.remove('menu-open');
          navToggle?.setAttribute('aria-expanded', 'false');
        }
      });
    </script>
</body>
</html>
