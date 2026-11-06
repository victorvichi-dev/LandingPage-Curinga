const SITE_CONFIG = {
    empresa: {
        nome: "Empresa Demo", 
        logoUrl: "", 
        corPrimaria: "#0056b3",
        corSecundaria: "#f8f9fa",
        urlSite: "https://meusite.com" 
    },
    seo: {
        titulo: "Empresa Demo - Excelência em Serviços",
        descricao: "Soluções completas para você.",
        imagemOg: "" 
    },
    hero: {
        titulo: "Bem-vindo à Empresa Demo",
        texto: "Soluções rápidas e eficientes para o seu negócio.",
        imagemUrl: "", 
        textoBotao: "Fale Conosco"
    },
    contato: {
        whatsapp: "5511999999999", 
        telefone: "1133333333", 
        endereco: "Rua Demo, 123 - Centro", 
        redesSociais: [
            { nome: "Instagram", url: "https://instagram.com" }
        ], 
        mapaUrl: "" 
    },
    servicos: [
        { titulo: "Serviço A", descricao: "Descrição do serviço A." }
    ], 
    diferenciais: [
        { titulo: "Qualidade", descricao: "Nossos padrões são altos." }
    ], 
    galeria: [], 
    avaliacoes: [] 
};

document.addEventListener("DOMContentLoaded", () => {
    inicializarSite();
    configurarMenuMobile();
});

/* =========================================================================
   FUNÇÕES DE VALIDAÇÃO (Protocol-Relative / Injeções)
   ========================================================================= */
function isSafeUrl(url) {
    if (!url || typeof url !== 'string') return false;
    
    // Bloqueia ataques protocol-relative
    if (url.startsWith('//')) return false;

    try {
        const parsed = new URL(url);
        // Exige protocolo seguro em URLs absolutas
        return parsed.protocol === 'https:';
    } catch (e) {
        // Se cair aqui, é um caminho relativo.
        // Bloqueia tentativas de injetar protocolos perigosos como 'javascript:' ou 'data:'
        if (url.includes(':')) return false;
        
        // Permite caminhos relativos legítimos iniciados em '/' ou alphanumerics
        return true; 
    }
}

function isValidGoogleMapsUrl(url) {
    if (!url || typeof url !== 'string') return false;
    if (url.startsWith('//')) return false;

    try {
        const parsed = new URL(url);
        const isHttps = parsed.protocol === 'https:';
        const isGoogle = parsed.hostname.includes('google.com');
        const isEmbed = parsed.pathname.startsWith('/maps/embed');
        return isHttps && isGoogle && isEmbed;
    } catch (e) {
        return false;
    }
}

function isValidPhoneNumber(phone) {
    if (!phone || typeof phone !== 'string') return false;
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 8 && digits.length <= 15;
}

function getPhoneDigits(phone) {
    return phone.replace(/\D/g, '');
}

/* =========================================================================
   INICIALIZAÇÃO DO DOM
   ========================================================================= */
function inicializarSite() {
    if (SITE_CONFIG.empresa.corPrimaria) {
        document.documentElement.style.setProperty('--primary-color', SITE_CONFIG.empresa.corPrimaria);
    }
    if (SITE_CONFIG.empresa.corSecundaria) {
        document.documentElement.style.setProperty('--secondary-color', SITE_CONFIG.empresa.corSecundaria);
    }

    safeSetText('meta-title', SITE_CONFIG.seo.titulo || SITE_CONFIG.empresa.nome);
    safeSetAttribute('meta-description', 'content', SITE_CONFIG.seo.descricao);
    safeSetAttribute('og-title', 'content', SITE_CONFIG.seo.titulo || SITE_CONFIG.empresa.nome);
    safeSetAttribute('og-description', 'content', SITE_CONFIG.seo.descricao);
    
    if (isSafeUrl(SITE_CONFIG.seo.imagemOg)) safeSetAttribute('og-image', 'content', SITE_CONFIG.seo.imagemOg);
    if (isSafeUrl(SITE_CONFIG.empresa.urlSite)) safeSetAttribute('og-url', 'content', SITE_CONFIG.empresa.urlSite);

    safeSetText('company-name', SITE_CONFIG.empresa.nome);
    if (isSafeUrl(SITE_CONFIG.empresa.logoUrl)) safeSetImage('header-logo', SITE_CONFIG.empresa.logoUrl);

    safeSetText('hero-title', SITE_CONFIG.hero.titulo);
    safeSetText('hero-text', SITE_CONFIG.hero.texto);
    if (isSafeUrl(SITE_CONFIG.hero.imagemUrl)) safeSetImage('hero-img', SITE_CONFIG.hero.imagemUrl);
    
    const heroCta = document.getElementById('hero-cta');
    if (heroCta && isValidPhoneNumber(SITE_CONFIG.contato.whatsapp)) {
        heroCta.textContent = SITE_CONFIG.hero.textoBotao || "Fale Conosco";
        heroCta.href = `https://wa.me/${getPhoneDigits(SITE_CONFIG.contato.whatsapp)}`;
        heroCta.style.display = 'inline-block';
    }

    // Grid e classes CSS injetadas de forma correspondente
    renderizarGrid('servicos-grid', SITE_CONFIG.servicos, buildCardTexto, 'service-card');
    alternarVisibilidadeSecao('servicos', SITE_CONFIG.servicos);

    renderizarGrid('diferenciais-grid', SITE_CONFIG.diferenciais, buildCardTexto, 'diff-card');
    alternarVisibilidadeSecao('diferenciais', SITE_CONFIG.diferenciais);

    renderizarGrid('galeria-grid', SITE_CONFIG.galeria, buildCardImagem, 'gallery-card');
    alternarVisibilidadeSecao('galeria', SITE_CONFIG.galeria);

    renderizarGrid('avaliacoes-grid', SITE_CONFIG.avaliacoes, buildCardAvaliacao, 'review-card');
    alternarVisibilidadeSecao('avaliacoes', SITE_CONFIG.avaliacoes);

    configurarContato();
    
    if (SITE_CONFIG.empresa.nome) {
        safeSetText('footer-text', `© ${new Date().getFullYear()} ${SITE_CONFIG.empresa.nome}. Todos os direitos reservados.`);
    }
}

/* =========================================================================
   FUNÇÕES AUXILIARES (Sem innerHTML)
   ========================================================================= */
function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (!el) return;
    if (text) {
        el.textContent = text;
        el.style.display = '';
    } else {
        el.style.display = 'none';
    }
}

function safeSetAttribute(id, attr, value) {
    const el = document.getElementById(id);
    if (!el) return;
    if (value) {
        el.setAttribute(attr, value);
    } else {
        el.removeAttribute(attr);
    }
}

function safeSetImage(id, url) {
    const el = document.getElementById(id);
    if (!el) return;
    if (url) {
        el.src = url;
        el.style.display = 'block';
    } else {
        el.style.display = 'none';
    }
}

// NOVO: Adicionado cardClass para inserir classes como service-card, diff-card, etc.
function renderizarGrid(id, items, buildFn, cardClass) {
    const grid = document.getElementById(id);
    if (!grid) return;
    
    grid.replaceChildren(); // Seguro em vez de innerHTML = ''
    
    if (Array.isArray(items) && items.length > 0) {
        items.forEach(item => {
            const card = document.createElement('div');
            // Anexa a classe base 'card' E a classe específica de estilo
            card.className = `card ${cardClass}`;
            buildFn(item, card);
            grid.appendChild(card);
        });
    }
}

function alternarVisibilidadeSecao(sectionId, dataArray) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = (Array.isArray(dataArray) && dataArray.length > 0) ? 'block' : 'none';
    }
}

function buildCardTexto(item, card) {
    const h3 = document.createElement('h3');
    h3.textContent = item.titulo;
    const p = document.createElement('p');
    p.textContent = item.descricao;
    card.appendChild(h3);
    card.appendChild(p);
}

function buildCardImagem(item, card) {
    if (isSafeUrl(item.url)) {
        const img = document.createElement('img');
        img.alt = item.alt || 'Imagem da galeria';
        img.loading = 'lazy'; 
        img.src = item.url;
        card.appendChild(img);
    }
}

function buildCardAvaliacao(item, card) {
    const p = document.createElement('p');
    const em = document.createElement('em');
    em.textContent = `"${item.texto}"`;
    p.appendChild(em);
    
    const strong = document.createElement('strong');
    strong.textContent = `- ${item.nome}`;
    
    card.appendChild(p);
    card.appendChild(strong);
}

/* =========================================================================
   CONTATO & MENU
   ========================================================================= */
function configurarContato() {
    const enderecoContainer = document.getElementById('endereco-container');
    const enderecoText = document.getElementById('endereco-text');
    if (enderecoContainer && enderecoText) {
        if (SITE_CONFIG.contato.endereco) {
            enderecoText.textContent = SITE_CONFIG.contato.endereco;
            enderecoContainer.style.display = '';
        } else {
            enderecoContainer.style.display = 'none';
        }
    }

    const telefoneContainer = document.getElementById('telefone-container');
    const telefoneLink = document.getElementById('telefone-link');
    if (telefoneContainer && telefoneLink) {
        if (isValidPhoneNumber(SITE_CONFIG.contato.telefone)) {
            telefoneLink.textContent = SITE_CONFIG.contato.telefone;
            telefoneLink.href = `tel:${getPhoneDigits(SITE_CONFIG.contato.telefone)}`;
            telefoneContainer.style.display = '';
        } else {
            telefoneContainer.style.display = 'none';
        }
    }

    const whatsappContainer = document.getElementById('whatsapp-container');
    const whatsappLink = document.getElementById('whatsapp-link');
    if (whatsappContainer && whatsappLink) {
        if (isValidPhoneNumber(SITE_CONFIG.contato.whatsapp)) {
            whatsappLink.textContent = SITE_CONFIG.contato.whatsapp;
            whatsappLink.href = `https://wa.me/${getPhoneDigits(SITE_CONFIG.contato.whatsapp)}`;
            whatsappContainer.style.display = '';
        } else {
            whatsappContainer.style.display = 'none';
        }
    }

    const redesContainer = document.getElementById('redes-sociais-container');
    if (redesContainer) {
        redesContainer.replaceChildren();
        if (Array.isArray(SITE_CONFIG.contato.redesSociais)) {
            SITE_CONFIG.contato.redesSociais.forEach(rede => {
                if (isSafeUrl(rede.url)) {
                    const a = document.createElement('a');
                    a.href = rede.url;
                    a.textContent = rede.nome;
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    redesContainer.appendChild(a);
                }
            });
        }
    }

    const mapaContainer = document.getElementById('mapa-container');
    if (mapaContainer) {
        mapaContainer.replaceChildren();
        if (isValidGoogleMapsUrl(SITE_CONFIG.contato.mapaUrl)) {
            const iframe = document.createElement('iframe');
            iframe.src = SITE_CONFIG.contato.mapaUrl;
            iframe.allowFullscreen = true;
            iframe.loading = 'lazy';
            mapaContainer.appendChild(iframe);
            mapaContainer.style.display = '';
        } else {
            mapaContainer.style.display = 'none';
        }
    }
}

function configurarMenuMobile() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('main-menu');
    const links = document.querySelectorAll('.menu-list a');

    if (!btn || !menu) return;

    const toggleMenu = () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !isExpanded);
        btn.setAttribute('aria-label', !isExpanded ? 'Fechar menu' : 'Abrir menu');
        menu.classList.toggle('active');
    };

    btn.addEventListener('click', toggleMenu);

    links.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('active')) toggleMenu();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            toggleMenu();
            btn.focus();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && menu.classList.contains('active')) {
            toggleMenu();
        }
    });
}