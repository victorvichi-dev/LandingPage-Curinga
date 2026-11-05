/**
 * SITE_CONFIG: Arquivo central de configurações do negócio.
 * Deixe vazio ("") ou null para ocultar a seção correspondente automaticamente.
 */
const SITE_CONFIG = {
    empresa: {
        nome: "Oficina Padrão Ouro",
        logoUrl: "", // Se vazio, usa o nome em texto
        descricao: "Somos especialistas em manutenção automotiva com mais de 15 anos de mercado. Garantimos qualidade e transparência em cada serviço.",
        horarioFuncionamento: "Segunda a Sexta, das 08h às 18h | Sábado das 08h às 12h",
        cores: {
            primaria: "#d32f2f", // Ex: Vermelho mecânica
            secundaria: "#f5f5f5"
        }
    },
    seo: {
        metaDescription: "Oficina Padrão Ouro: Manutenção automotiva de confiança e qualidade.",
    },
    hero: {
        titulo: "O Cuidado que seu Carro Merece",
        subtitulo: "Revisão completa, diagnóstico computadorizado e troca de óleo.",
        textoBotao: "Agendar Revisão"
    },
    imagens: {
        sobre: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=800&auto=format&fit=crop", // Coloque URL real
        sobreAlt: "Mecânico inspecionando motor do carro"
    },
    diferenciais: [
        { icone: "⚙️", titulo: "Peças Originais", descricao: "Trabalhamos apenas com peças de procedência certificada." },
        { icone: "⏱️", titulo: "Agilidade", descricao: "Entrega no prazo combinado, sem surpresas." },
        { icone: "🛡️", titulo: "Garantia", descricao: "Todos os serviços possuem garantia de 90 dias." }
    ],
    servicos: {
        tituloSecao: "O que fazemos",
        lista: [
            { imagem: "", titulo: "Troca de Óleo", descricao: "Lubrificantes de alta performance.", alt: "Troca de óleo" },
            { imagem: "", titulo: "Alinhamento", descricao: "Tecnologia 3D para maior precisão.", alt: "Alinhamento" },
            { imagem: "", titulo: "Freios", descricao: "Revisão de pastilhas e discos.", alt: "Freios" }
        ]
    },
    avaliacoes: [
        { nome: "Carlos Silva", texto: "Excelente atendimento, resolveram meu problema no mesmo dia!" },
        // Deixe a lista vazia [] para ocultar a seção de avaliações inteira
    ],
    contato: {
        whatsapp: "5511999999999", // Apenas números
        telefone: "1133334444",     // Apenas números (opcional)
        endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
        mapaIframe: '<iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>', // Pode ser vazio
        redes: {
            instagram: "oficinapadraoouro", // Apenas o @ ou nome do usuário. Vazio oculta.
            facebook: "" // Vazio oculta.
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    aplicarIdentidadeVisual();
    aplicarSEO();
    preencherTextosBase();
    construirDiferenciais();
    construirServicos();
    construirAvaliacoes();
    construirContatos();
    configurarMenuMobile();
    configurarFallbackImagens();
});

// ==========================================
// FUNÇÕES DE APLICAÇÃO SEGURA DE DADOS
// ==========================================

function aplicarIdentidadeVisual() {
    const root = document.documentElement;
    if (SITE_CONFIG.empresa.cores.primaria) root.style.setProperty('--primary-color', SITE_CONFIG.empresa.cores.primaria);
    if (SITE_CONFIG.empresa.cores.secundaria) root.style.setProperty('--secondary-color', SITE_CONFIG.empresa.cores.secundaria);

    const logoText = document.getElementById('logo-text');
    const logoImg = document.getElementById('logo-img');

    if (SITE_CONFIG.empresa.logoUrl && SITE_CONFIG.empresa.logoUrl.trim() !== "") {
        logoImg.src = SITE_CONFIG.empresa.logoUrl;
        logoImg.classList.remove('hidden');
        logoText.classList.add('hidden');
    } else {
        logoText.textContent = SITE_CONFIG.empresa.nome;
    }
}

function aplicarSEO() {
    document.title = SITE_CONFIG.empresa.nome;
    const metaDesc = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    
    if(metaDesc && SITE_CONFIG.seo.metaDescription) metaDesc.content = SITE_CONFIG.seo.metaDescription;
    if(ogTitle) ogTitle.content = SITE_CONFIG.empresa.nome;
    if(ogDesc && SITE_CONFIG.seo.metaDescription) ogDesc.content = SITE_CONFIG.seo.metaDescription;
}

function preencherTextosBase() {
    safeSetText('hero-title', SITE_CONFIG.hero.titulo);
    safeSetText('hero-subtitle', SITE_CONFIG.hero.subtitulo);
    safeSetText('hero-cta', SITE_CONFIG.hero.textoBotao);
    safeSetText('sobre-descricao', SITE_CONFIG.empresa.descricao);
    safeSetText('servicos-titulo', SITE_CONFIG.servicos.tituloSecao);
    safeSetText('footer-name', SITE_CONFIG.empresa.nome);
    safeSetText('footer-year', new Date().getFullYear().toString());

    // Imagem Sobre
    const imgSobre = document.getElementById('sobre-img');
    if (imgSobre && SITE_CONFIG.imagens.sobre) {
        imgSobre.src = SITE_CONFIG.imagens.sobre;
        imgSobre.alt = SITE_CONFIG.imagens.sobreAlt || "Imagem sobre a empresa";
    } else if (imgSobre) {
        imgSobre.parentElement.style.display = 'none';
    }
}

function construirDiferenciais() {
    const container = document.getElementById('diferenciais-grid');
    const secao = document.getElementById('diferenciais');
    
    if (!SITE_CONFIG.diferenciais || SITE_CONFIG.diferenciais.length === 0) {
        secao.classList.add('hidden');
        return;
    }

    SITE_CONFIG.diferenciais.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        const icone = document.createElement('div');
        icone.className = 'card-icon';
        icone.textContent = item.icone; // emojis ou texto
        
        const titulo = document.createElement('h3');
        titulo.textContent = item.titulo;
        
        const desc = document.createElement('p');
        desc.textContent = item.descricao;

        card.appendChild(icone);
        card.appendChild(titulo);
        card.appendChild(desc);
        container.appendChild(card);
    });
}

function construirServicos() {
    const container = document.getElementById('servicos-grid');
    const secao = document.getElementById('servicos');
    
    if (!SITE_CONFIG.servicos.lista || SITE_CONFIG.servicos.lista.length === 0) {
        secao.classList.add('hidden');
        return;
    }

    SITE_CONFIG.servicos.lista.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        if (item.imagem) {
            const img = document.createElement('img');
            img.src = item.imagem;
            img.alt = item.alt || item.titulo;
            img.loading = "lazy";
            card.appendChild(img);
        }
        
        const titulo = document.createElement('h3');
        titulo.textContent = item.titulo;
        
        const desc = document.createElement('p');
        desc.textContent = item.descricao;

        card.appendChild(titulo);
        card.appendChild(desc);
        container.appendChild(card);
    });
}

function construirAvaliacoes() {
    const container = document.getElementById('avaliacoes-grid');
    const secao = document.getElementById('avaliacoes');
    const navLink = document.getElementById('nav-avaliacoes');
    
    if (!SITE_CONFIG.avaliacoes || SITE_CONFIG.avaliacoes.length === 0) {
        secao.classList.add('hidden');
        if(navLink) navLink.parentElement.classList.add('hidden'); // Remove do menu
        return;
    }

    SITE_CONFIG.avaliacoes.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        const quote = document.createElement('p');
        quote.textContent = `"${item.texto}"`;
        quote.style.fontStyle = "italic";
        
        const autor = document.createElement('h4');
        autor.textContent = `- ${item.nome}`;
        autor.style.marginTop = "15px";

        card.appendChild(quote);
        card.appendChild(autor);
        container.appendChild(card);
    });
}

function construirContatos() {
    const contactList = document.getElementById('contact-list');
    const socialLinks = document.getElementById('social-links');
    
    // Contatos primários (WhatsApp, Telefone, Endereço)
    if (SITE_CONFIG.contato.whatsapp) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `https://wa.me/${SITE_CONFIG.contato.whatsapp.replace(/\D/g, '')}`;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = `📱 WhatsApp: ${formatarTelefone(SITE_CONFIG.contato.whatsapp)}`;
        li.appendChild(a);
        contactList.appendChild(li);
    }

    if (SITE_CONFIG.contato.telefone) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `tel:+55${SITE_CONFIG.contato.telefone.replace(/\D/g, '')}`;
        a.textContent = `📞 Telefone: ${formatarTelefone(SITE_CONFIG.contato.telefone)}`;
        li.appendChild(a);
        contactList.appendChild(li);
    }

    if (SITE_CONFIG.contato.endereco) {
        const li = document.createElement('li');
        li.textContent = `📍 ${SITE_CONFIG.contato.endereco}`;
        contactList.appendChild(li);
    }

    // Redes Sociais
    if (SITE_CONFIG.contato.redes.instagram) {
        const a = document.createElement('a');
        a.href = `https://instagram.com/${SITE_CONFIG.contato.redes.instagram.replace('@', '')}`;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = "Instagram";
        socialLinks.appendChild(a);
    }
    if (SITE_CONFIG.contato.redes.facebook) {
        const a = document.createElement('a');
        a.href = `https://facebook.com/${SITE_CONFIG.contato.redes.facebook}`;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = "Facebook";
        socialLinks.appendChild(a);
    }

    // Horários
    const hrContainer = document.getElementById('horarios-container');
    if (SITE_CONFIG.empresa.horarioFuncionamento) {
        document.getElementById('horarios-texto').textContent = SITE_CONFIG.empresa.horarioFuncionamento;
    } else {
        hrContainer.classList.add('hidden');
    }

    // Mapa
    const mapaContainer = document.getElementById('mapa-container');
    if (SITE_CONFIG.contato.mapaIframe && SITE_CONFIG.contato.mapaIframe.includes('<iframe')) {
        const div = document.createElement('div');
        div.className = 'iframe-container';
        // Usamos innerHTML com cautela aqui, mas o dev é instruído a colar o iframe do Google.
        div.innerHTML = SITE_CONFIG.contato.mapaIframe; 
        mapaContainer.appendChild(div);
    } else {
        mapaContainer.classList.add('hidden');
    }
}

// ==========================================
// FUNÇÕES AUXILIARES E UTILITÁRIAS
// ==========================================

function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el && text) {
        el.textContent = text;
    }
}

function formatarTelefone(str) {
    const numeros = str.replace(/\D/g, '');
    if (numeros.length === 11) {
        return `(${numeros.slice(0,2)}) ${numeros.slice(2,7)}-${numeros.slice(7)}`;
    } else if (numeros.length === 10) {
        return `(${numeros.slice(0,2)}) ${numeros.slice(2,6)}-${numeros.slice(6)}`;
    }
    return str;
}

// Tratamento de Imagens Quebradas (Fallback)
function configurarFallbackImagens() {
    const svgFallback = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" style="background:%23e0e0e0"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23888" font-family="sans-serif" font-size="16">Imagem indisponível</text></svg>';
    
    document.addEventListener('error', function(e) {
        if (e.target.tagName.toLowerCase() === 'img') {
            e.target.src = svgFallback;
            e.target.alt = "Imagem não encontrada";
        }
    }, true);
}

// Acessibilidade e Menu Mobile
function configurarMenuMobile() {
    const btn = document.getElementById('menu-toggle');
    const menu = document.getElementById('main-menu');
    const links = menu.querySelectorAll('a');

    function toggleMenu() {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !isExpanded);
        menu.setAttribute('aria-hidden', isExpanded);
    }

    btn.addEventListener('click', toggleMenu);

    // Fechar ao clicar em um link (mobile)
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                btn.setAttribute('aria-expanded', 'false');
                menu.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // Fechar ao pressionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
            toggleMenu();
            btn.focus(); // Retorna o foco para o botão
        }
    });
}