const SITE_CONFIG = {
    empresa: {
        nome: "", 
        logoUrl: "", 
        corPrimaria: "",
        corSecundaria: "",
        urlSite: "" 
    },
    seo: {
        titulo: "",
        descricao: "",
        imagemOg: "" 
    },
    hero: {
        titulo: "",
        texto: "",
        imagemUrl: "", 
        textoBotao: ""
    },
    contato: {
        whatsapp: "", 
        telefone: "", 
        endereco: "", 
        redesSociais: [], 
        mapaUrl: "" 
    },
    servicos: [], 
    diferenciais: [], 
    galeria: [], 
    avaliacoes: [] 
};

document.addEventListener("DOMContentLoaded", () => {
    inicializarSite();
    configurarMenuMobile();
});

/* =========================================================================
   FUNÇÕES DE VALIDAÇÃO ESTritas
   ========================================================================= */

// Verifica se a URL é expressamente HTTPS (ou caminho relativo seguro, barrando payloads "javascript:")
function isHttpsUrl(url) {
    if (!url) return false;
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'https:';
    } catch (e) {
        // Fallback para caminhos relativos (ex: "./img.png"), bloqueando uso de protocolos explícitos injetados
        return !url.includes(':');
    }
}

// Verifica protocolo, domínio oficial e o caminho exato de incorporação.
function isValidGoogleMapsUrl(url) {
    if (!url) return false;
    try {
        const parsed = new URL(url);
        const isHttps = parsed.protocol === 'https:';
        const isGoogleDomain = parsed.hostname === 'www.google.com' || parsed.hostname === 'google.com' || parsed.hostname.endsWith('.google.com');
        const isEmbedPath = parsed.pathname.startsWith('/maps/embed');
        return isHttps && isGoogleDomain && isEmbedPath;
    } catch (e) {
        return false;
    }
}

// Garante que o telefone tem ao menos 8 dígitos numéricos, prevenindo links defeituosos
function isValidPhoneNumber(phone) {
    if (!phone) return false;
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 8 && digits.length <= 15;
}

// Extrai somente números do telefone
function getPhoneDigits(phone) {
    return phone.replace(/\D/g, '');
}

/* =========================================================================
   INICIALIZAÇÃO
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
    
    if (isHttpsUrl(SITE_CONFIG.seo.imagemOg)) safeSetAttribute('og-image', 'content', SITE_CONFIG.seo.imagemOg);
    if (isHttpsUrl(SITE_CONFIG.empresa.urlSite)) safeSetAttribute('og-url', 'content', SITE_CONFIG.empresa.urlSite);

    safeSetText('company-name', SITE_CONFIG.empresa.nome);
    if (isHttpsUrl(SITE_CONFIG.empresa.logoUrl)) safeSetImage('header-logo', SITE_CONFIG.empresa.logoUrl);

    safeSetText('hero-title', SITE_CONFIG.hero.titulo);
    safeSetText('hero-text', SITE_CONFIG.hero.texto);
    if (isHttpsUrl(SITE_CONFIG.hero.imagemUrl)) safeSetImage('hero-img', SITE_CONFIG.hero.imagemUrl);
    
    const heroCta = document.getElementById('hero-cta');
    if (heroCta && isValidPhoneNumber(SITE_CONFIG.contato.whatsapp)) {
        heroCta.textContent = SITE_CONFIG.hero.textoBotao || "Fale Conosco";
        heroCta.href = `https://wa.me/${getPhoneDigits(SITE_CONFIG.contato.whatsapp)}`;
        heroCta.style.display = 'inline-block';
    }

    renderizarGrid('servicos-grid', SITE_CONFIG.servicos, buildCardTexto);
    alternarVisibilidadeSecao('servicos', SITE_CONFIG.servicos);

    renderizarGrid('diferenciais-grid', SITE_CONFIG.diferenciais, buildCardTexto);
    alternarVisibilidadeSecao('diferenciais', SITE_CONFIG.diferenciais);

    renderizarGrid('galeria-grid', SITE_CONFIG.galeria, buildCardImagem);
    alternarVisibilidadeSecao('galeria', SITE_CONFIG.galeria);

    renderizarGrid('avaliacoes-grid', SITE_CONFIG.avaliacoes, buildCardAvaliacao);
    alternarVisibilidadeSecao('avaliacoes', SITE_CONFIG.avaliacoes);

    configurarContato();
    
    if (SITE_CONFIG.empresa.nome) {
        safeSetText('footer-text', `© ${new Date().getFullYear()} ${SITE_CONFIG.empresa.nome}. Todos os direitos reservados.`);
    }
}

/* =========================================================================
   FUNÇÕES AUXILIARES SEGURAS (DOM Manipulation)
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
        el.onerror = applyImageFallback; // Definido ANTES de atribuir src
        el.src = url;
        el.style.display = 'block';
    } else {
        el.style.display = 'none';
    }
}

function applyImageFallback() {
    this.onerror = null; 
    const svgFallback = `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"%3E%3Crect fill="%23e9ecef" width="300" height="200"/%3E%3Ctext fill="%236c757d" x="50%25" y="50%25" font-family="sans-serif" font-size="16" text-anchor="middle" dominant-baseline="middle"%3EImagem Indispon%C3%ADvel%3C/text%3E%3C/svg%3E`;
    this.src = svgFallback;
    this.style.objectFit = 'cover';
}

function renderizarGrid(id, items, buildFn) {
    const grid = document.getElementById(id);
    if (!grid) return;
    grid.innerHTML = ''; 
    
    if (Array.isArray(items) && items.length > 0) {
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
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
    const img = document.createElement('img');
    if (isHttpsUrl(item.url)) {
        img.alt = item.alt || 'Imagem da galeria';
        img.loading = 'lazy'; 
        img.decoding = 'async';
        img.onerror = applyImageFallback; // Definido ANTES de atribuir src
        img.src = item.url;
        card.appendChild(img);
    }
}

function buildCardAvaliacao(item, card) {
    const p = document.createElement('p');
    const em = document.createElement('em');
    em.textContent = `"${item.texto}"`;
    p.appendChild(em);
    
    const br = document.createElement('br');
    const strong = document.createElement('strong');
    strong.textContent = `- ${item.nome}`;
    
    card.appendChild(p);
    card.appendChild(br);
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
        redesContainer.innerHTML = '';
        if (Array.isArray(SITE_CONFIG.contato.redesSociais)) {
            SITE_CONFIG.contato.redesSociais.forEach(rede => {
                if (isHttpsUrl(rede.url)) {
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
        mapaContainer.innerHTML = '';
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