<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Xkairos Tech - Solicite o seu orÃ§amento</title>
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
      /* Form simplificado */
      .hero-section{padding:48px 18px;background:linear-gradient(135deg,#0b1022,#12284a);color:#f5f7fb;}
      .hero-content h2{margin:0 0 10px;}
      .form-shell{max-width:900px;margin:0 auto;padding:22px 18px;}
      .card{background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:18px;color:#e7ecf7;box-shadow:0 20px 60px rgba(0,0,0,0.35);}
      .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;}
      label{font-weight:700;font-size:14px;margin-bottom:6px;display:block;}
      input, select, textarea{width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.04);color:#f5f7fb;}
      textarea{min-height:100px;resize:vertical;}
      .submit-btn{margin-top:12px;background:#22d3ee;color:#0b1224;border:none;border-radius:12px;padding:12px 16px;font-weight:800;cursor:pointer;box-shadow:0 12px 32px rgba(34,211,238,0.45);transition:transform .15s ease, box-shadow .15s ease;}
      .submit-btn:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(34,211,238,0.55);}
      .note{color:#c5cee0;font-size:14px;margin-top:8px;}
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
                <button class="nav-btn" onclick="location.href='orcamentos.php'">OrÃ§amentos</button>
                <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="menu-panel">Menu</button>
            </div>
        </div>
        <div class="menu-drawer" id="menu-drawer">
            <div class="menu-overlay"></div>
            <div class="menu-panel" id="menu-panel">
                <ul>
                    <li><a href="index.php">InÃ­cio</a></li>
                    <li><a href="index.php#servicos">ServiÃ§os</a></li>
                    <li><a href="index.php#projetos">Projetos</a></li>
                    <li><a href="orcamentos.php">OrÃ§amentos</a></li>
                    <li><a href="index.php#contato">Contacto</a></li>
                    <li><a href="cliente/login.php"><i class="fas fa-user"></i> Login / Ãrea do Cliente</a></li>
                </ul>
            </div>
        </div>
    </header>

    <div class="hero-section" id="hero">
        <div class="hero-content">
            <div class="hero-badge"><i class="fas fa-rocket"></i> Solicite o seu orÃ§amento</div>
            <h2>Montagem, manutenÃ§Ã£o ou consultoria</h2>
            <p>Preencha os detalhes e retornamos em atÃ© 24 horas. Este formulÃ¡rio Ã© demonstrativo no ambiente estÃ¡tico.</p>
        </div>
    </div>

    <div class="form-shell">
        <div class="card">
            <form>
                <div class="grid">
                    <div>
                        <label for="tipo_servico">Tipo de serviÃ§o</label>
                        <select id="tipo_servico" name="tipo_servico">
                            <option value="montagem">Montagem</option>
                            <option value="manutencao">ManutenÃ§Ã£o</option>
                            <option value="consultoria">Consultoria</option>
                        </select>
                    </div>
                    <div>
                        <label for="nome">Nome</label>
                        <input id="nome" name="nome" placeholder="Seu nome" />
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input id="email" name="email" type="email" placeholder="seu@email.com" />
                    </div>
                    <div>
                        <label for="telefone">Telefone</label>
                        <input id="telefone" name="telefone" placeholder="+351 ..." />
                    </div>
                    <div>
                        <label for="localidade">Localidade</label>
                        <input id="localidade" name="localidade" placeholder="Cidade / RegiÃ£o" />
                    </div>
                    <div>
                        <label for="urgencia">UrgÃªncia</label>
                        <select id="urgencia" name="urgencia">
                            <option value="normal">Normal</option>
                            <option value="baixa">Baixa</option>
                            <option value="alta">Alta</option>
                        </select>
                    </div>
                </div>

                <div class="grid" style="margin-top:12px;">
                    <div>
                        <label for="orcamento_max">OrÃ§amento MÃ¡ximo (â‚¬)</label>
                        <input id="orcamento_max" name="orcamento_max" type="number" placeholder="Ex: 1500" />
                    </div>
                    <div>
                        <label for="uso_pc">Uso pretendido</label>
                        <input id="uso_pc" name="uso_pc" placeholder="Gaming, ediÃ§Ã£o, trabalho..." />
                    </div>
                </div>

                <label for="observacoes" style="margin-top:12px;">ObservaÃ§Ãµes / requisitos</label>
                <textarea id="observacoes" name="observacoes" placeholder="Detalhe peÃ§as desejadas, problemas ou dÃºvidas."></textarea>

                <button type="button" class="submit-btn">Enviar (demo)</button>
                <div class="note">Ambiente estÃ¡tico: este formulÃ¡rio Ã© ilustrativo e nÃ£o grava no servidor.</div>
            </form>
        </div>
    </div>

    <footer class="footer">
        <div class="footer-inner">
            <span>Â© 2025 Xkairos Tech</span>
            <span>Montagem Â· ManutenÃ§Ã£o Â· Consultoria</span>
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
