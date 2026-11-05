/* =======================================================================
   AREA DE CONFIGURAÇÃO (SITE_CONFIG)
   Altere os valores abaixo para personalizar a Landing Page do cliente.
   Todas as seções que estiverem vazias ou sem itens serão ocultadas automaticamente.
   ======================================================================= */
const SITE_CONFIG = {
    // 1. IDENTIDADE VISUAL E SEO
    tema: {
        corPrincipal: '#2563EB', // Ex: '#2563EB' (Azul), '#059669' (Verde), '#E11D48' (Rosa)
        corHover: '#1D4ED8',
    },
    seo: {
        descricao: 'Bem-vindo à nossa empresa. Oferecemos as melhores soluções para você.', // Descrição para o Google
        imagemCompartilhamento: '' // URL da imagem para WhatsApp/Facebook (opcional)
    },
    
    // 2. INFORMAÇÕES GERAIS E CONTATO
    empresa: {
        nome: '[DEMONSTRAÇÃO] Nome da Empresa',
        telefoneFixo: '(00) 0000-0000', // Deixe vazio '' para ocultar
        whatsapp: '5511900000000', // Apenas números, com DDI (55 para Brasil)
        whatsappTextoApp: 'Olá! Vim pelo site e gostaria de mais informações.', 
        endereco: 'Rua Exemplo Fictício, 123 - Centro, Cidade - UF', // Deixe vazio '' para ocultar
        horario: 'Seg a Sex: 08h às 18h', // Deixe vazio '' para ocultar
        instagram: 'https://instagram.com/', // Deixe vazio '' para ocultar
        facebook: 'https://facebook.com/',   // Deixe vazio '' para ocultar
        linkMapsIframe: '' // Cole o src do iframe do Google Maps aqui. Se vazio, oculta o mapa.
    },

    // 3. PRIMEIRA DOBRA (HERO)
    hero: {
        titulo: 'Título principal impactante do seu negócio.',
        subtitulo: 'Apresente sua proposta de valor em uma linha clara e objetiva para o cliente.',
        textoBotaoPrimario: 'Fale Conosco',
        textoBotaoSecundario: 'Ver Serviços', // Deixe vazio para ocultar este botão
        imagemDestaque: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Pode usar local: './img/hero.jpg'
        altImagemDestaque: 'Equipe trabalhando e atendendo cliente'
    },

    // 4. DIFERENCIAIS (Deixe o array vazio [] para ocultar)
    diferenciais: [
        { icone: 'bx-time-five', titulo: 'Agilidade', texto: 'Entrega rápida e no prazo.' },
        { icone: 'bx-shield-check', titulo: 'Qualidade', texto: 'Garantia de serviço bem feito.' },
        { icone: 'bx-smile', titulo: 'Atendimento', texto: 'Foco total na sua satisfação.' }
    ],

    // 5. SOBRE A EMPRESA (Deixe o array de paragrafos vazio para ocultar)
    sobre: {
        imagem: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        altImagem: 'Nossa equipe em reunião',
        paragrafos: [
            'Este é um texto de demonstração. Você pode adicionar quantos parágrafos quiser configurando o arquivo script.js.',
            'Nossa missão é entregar valor com profissionalismo, transparência e responsabilidade para todos os nossos clientes.'
        ]
    },

    // 6. SERVIÇOS OU PRODUTOS (Deixe o array vazio [] para ocultar)
    servicosSubtitle: 'Conheça o que temos de melhor para você.',
    servicos: [
        { icone: 'bx-check-circle', titulo: 'Serviço Exemplo 1', texto: 'Descrição breve do primeiro serviço prestado pela sua empresa.' },
        { icone: 'bx-check-circle', titulo: 'Serviço Exemplo 2', texto: 'Descrição breve do segundo serviço prestado pela sua empresa.' },
        { icone: 'bx-check-circle', titulo: 'Serviço Exemplo 3', texto: 'Descrição breve do terceiro serviço prestado pela sua empresa.' }
    ],

    // 7. GALERIA DE FOTOS (Deixe o array vazio [] para ocultar)
    galeria: [
        { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', alt: 'Foto do estabelecimento 1' },
        { url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', alt: 'Foto do estabelecimento 2' },
        { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', alt: 'Foto do estabelecimento 3' }
    ],

    // 8. AVALIAÇÕES (Deixe o array vazio [] para ocultar)
    // Exemplo: { nome: 'João', texto: 'Ótimo serviço', estrelas: 5 }
    avaliacoes: [],

    // 9. CHAMADA PARA AÇÃO FINAL (Deixe o titulo vazio '' para ocultar)
    cta: {
        titulo: 'Pronto para dar o próximo passo?',
        subtitulo: 'Entre em contato agora mesmo e faça um orçamento sem compromisso.',
    }
};

/* =======================================================================
   LÓGICA DE INJEÇÃO E PREVENÇÃO DE XSS (NÃO PRECISA ALTERAR NADA ABAIXO)
   ======================================================================= */

// Função auxiliar segura para criar elementos DOM (Evita uso de innerHTML / XSS)
function createSafeElement(tag, classNames = '', textContent = '') {
    const el = document.createElement(tag);
    if (classNames) el.className = classNames;
    if (textContent) el.textContent = textContent;
    return el;
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Identidade Visual e SEO
    document.documentElement.style.setProperty('--primary-color', SITE_CONFIG.tema.corPrincipal);
    document.documentElement.style.setProperty('--primary-hover', SITE_CONFIG.tema.corHover);
    
    document.title = SITE_CONFIG.empresa.nome;
    document.getElementById('meta-description').content = SITE_CONFIG.seo.descricao;
    document.getElementById('meta-og-title').content = SITE_CONFIG.empresa.nome;
    document.getElementById('meta-og-description').content = SITE_CONFIG.seo.descricao;
    if(SITE_CONFIG.seo.imagemCompartilhamento) {
        document.getElementById('meta-og-image').content = SITE_CONFIG.seo.imagemCompartilhamento;
    }

    // 2. Informações Gerais
    document.getElementById('logo-text').textContent = SITE_CONFIG.empresa.nome;
    document.getElementById('footer-company').textContent = SITE_CONFIG.empresa.nome;
    document.getElementById('footer-year').textContent = new Date().getFullYear();

    // 3. Hero Section
    document.getElementById('hero-title').textContent = SITE_CONFIG.hero.titulo;
    document.getElementById('hero-subtitle').textContent = SITE_CONFIG.hero.subtitulo;
    
    const heroImg = document.getElementById('hero-img');
    heroImg.src = SITE_CONFIG.hero.imagemDestaque;
    heroImg.alt = SITE_CONFIG.hero.altImagemDestaque;

    document.getElementById('hero-btn-primary').textContent = SITE_CONFIG.hero.textoBotaoPrimario;
    
    const btnSecondary = document.getElementById('hero-btn-secondary');
    if (SITE_CONFIG.hero.textoBotaoSecundario) {
        btnSecondary.textContent = SITE_CONFIG.hero.textoBotaoSecundario;
    } else {
        btnSecondary.style.display = 'none';
    }

    // 4. Diferenciais
    const diffSection = document.getElementById('diferenciais');
    const diffGrid = document.getElementById('diff-grid');
    if (SITE_CONFIG.diferenciais && SITE_CONFIG.diferenciais.length > 0) {
        SITE_CONFIG.diferenciais.forEach(diff => {
            const card = createSafeElement('div', 'diff-card');
            
            const icon = createSafeElement('i', `bx ${diff.icone}`);
            const textDiv = createSafeElement('div');
            const h3 = createSafeElement('h3', '', diff.titulo);
            const p = createSafeElement('p', '', diff.texto);
            
            textDiv.appendChild(h3);
            textDiv.appendChild(p);
            card.appendChild(icon);
            card.appendChild(textDiv);
            diffGrid.appendChild(card);
        });
    } else {
        diffSection.style.display = 'none';
    }

    // 5. Sobre
    const sobreSection = document.getElementById('sobre');
    const navSobre = document.getElementById('nav-sobre');
    if (SITE_CONFIG.sobre.paragrafos && SITE_CONFIG.sobre.paragrafos.length > 0) {
        const aboutImg = document.getElementById('about-img');
        aboutImg.src = SITE_CONFIG.sobre.imagem;
        aboutImg.alt = SITE_CONFIG.sobre.altImagem;

        const aboutContent = document.getElementById('about-content');
        SITE_CONFIG.sobre.paragrafos.forEach(texto => {
            aboutContent.appendChild(createSafeElement('p', '', texto));
        });
    } else {
        sobreSection.style.display = 'none';
        if(navSobre) navSobre.parentElement.style.display = 'none';
    }

    // 6. Serviços
    const servicosSection = document.getElementById('servicos');
    const navServicos = document.getElementById('nav-servicos');
    if (SITE_CONFIG.servicos && SITE_CONFIG.servicos.length > 0) {
        document.getElementById('servicos-subtitle').textContent = SITE_CONFIG.servicosSubtitle;
        const servicesGrid = document.getElementById('services-grid');
        
        SITE_CONFIG.servicos.forEach(serv => {
            const card = createSafeElement('div', 'service-card');
            const icon = createSafeElement('i', `bx ${serv.icone}`);
            const h3 = createSafeElement('h3', '', serv.titulo);
            const p = createSafeElement('p', '', serv.texto);
            
            card.appendChild(icon);
            card.appendChild(h3);
            card.appendChild(p);
            servicesGrid.appendChild(card);
        });
    } else {
        servicosSection.style.display = 'none';
        if(navServicos) navServicos.parentElement.style.display = 'none';
    }

    // 7. Galeria
    const galeriaSection = document.getElementById('galeria');
    const navGaleria = document.getElementById('nav-galeria');
    if (SITE_CONFIG.galeria && SITE_CONFIG.galeria.length > 0) {
        const galleryGrid = document.getElementById('gallery-grid');
        SITE_CONFIG.galeria.forEach(item => {
            const img = createSafeElement('img');
            img.src = item.url;
            img.alt = item.alt;
            img.loading = 'lazy';
            galleryGrid.appendChild(img);
        });
    } else {
        galeriaSection.style.display = 'none';
        if(navGaleria) navGaleria.parentElement.style.display = 'none';
    }

    // 8. Avaliações
    const reviewsSection = document.getElementById('avaliacoes');
    if (SITE_CONFIG.avaliacoes && SITE_CONFIG.avaliacoes.length > 0) {
        const reviewsGrid = document.getElementById('reviews-grid');
        SITE_CONFIG.avaliacoes.forEach(av => {
            const card = createSafeElement('div', 'review-card');
            const starsDiv = createSafeElement('div', 'review-stars');
            
            // Tratamento de estrelas seguro
            for(let i=0; i<Math.min(av.estrelas, 5); i++) {
                starsDiv.appendChild(createSafeElement('i', 'bx bxs-star'));
            }

            const pText = createSafeElement('p', 'review-text', `"${av.texto}"`);
            const pAuthor = createSafeElement('p', 'review-author', `- ${av.nome}`);
            
            card.appendChild(starsDiv);
            card.appendChild(pText);
            card.appendChild(pAuthor);
            reviewsGrid.appendChild(card);
        });
    } else {
        reviewsSection.style.display = 'none';
    }

    // 9. CTA
    const ctaSection = document.getElementById('cta-section');
    if (SITE_CONFIG.cta && SITE_CONFIG.cta.titulo) {
        document.getElementById('cta-title').textContent = SITE_CONFIG.cta.titulo;
        document.getElementById('cta-subtitle').textContent = SITE_CONFIG.cta.subtitulo;
    } else {
        ctaSection.style.display = 'none';
    }

    // 10. Contato e Localização
    const mapContainer = document.getElementById('map-container');
    const contactInfoBox = document.getElementById('contact-info');
    
    // Injeção de Iframe do Mapa (se houver)
    if (SITE_CONFIG.empresa.linkMapsIframe) {
        const iframe = document.createElement('iframe');
        iframe.src = SITE_CONFIG.empresa.linkMapsIframe;
        iframe.allowFullscreen = true;
        iframe.loading = "lazy";
        iframe.referrerPolicy = "no-referrer-when-downgrade";
        mapContainer.appendChild(iframe);
    } else {
        mapContainer.style.display = 'none';
        contactInfoBox.style.gridColumn = '1 / -1';
        contactInfoBox.style.textAlign = 'center';
        document.querySelector('.contact-list').style.display = 'inline-block';
        document.querySelector('.contact-list').style.textAlign = 'left';
    }

    // Textos de Contato (Ocultar li's se dados não existirem)
    const setContactData = (idText, idLi, data) => {
        const li = document.getElementById(idLi);
        if(data) {
            document.getElementById(idText).textContent = data;
        } else {
            if(li) li.style.display = 'none';
        }
    };

    setContactData('contact-address', 'li-address', SITE_CONFIG.empresa.endereco);
    setContactData('contact-phone', 'li-phone', SITE_CONFIG.empresa.telefoneFixo);
    setContactData('contact-hours', 'li-hours', SITE_CONFIG.empresa.horario);
    setContactData('contact-wa-text', 'li-wa', SITE_CONFIG.empresa.whatsapp);

    // Links de WhatsApp
    if (SITE_CONFIG.empresa.whatsapp) {
        const msgEncoded = encodeURIComponent(SITE_CONFIG.empresa.whatsappTextoApp);
        const linkWa = `https://wa.me/${SITE_CONFIG.empresa.whatsapp}?text=${msgEncoded}`;
        document.querySelectorAll('.wa-link').forEach(btn => btn.href = linkWa);
    } else {
        document.querySelectorAll('.wa-link').forEach(btn => btn.style.display = 'none');
        document.getElementById('li-wa').style.display = 'none';
    }

    // Redes Sociais
    const socialLinks = document.getElementById('social-links');
    if(SITE_CONFIG.empresa.instagram) {
        const a = createSafeElement('a');
        a.href = SITE_CONFIG.empresa.instagram;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.ariaLabel = "Instagram";
        a.appendChild(createSafeElement('i', 'bx bxl-instagram'));
        socialLinks.appendChild(a);
    }
    if(SITE_CONFIG.empresa.facebook) {
        const a = createSafeElement('a');
        a.href = SITE_CONFIG.empresa.facebook;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.ariaLabel = "Facebook";
        a.appendChild(createSafeElement('i', 'bx bxl-facebook-circle'));
        socialLinks.appendChild(a);
    }

    // 11. Menu Mobile e Acessibilidade
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = menuToggle.querySelector('i');
    
    function toggleMenu() {
        const isActive = navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive);
        navMenu.setAttribute('aria-hidden', !isActive);
        
        if(isActive) {
            menuIcon.classList.replace('bx-menu', 'bx-x');
        } else {
            menuIcon.classList.replace('bx-x', 'bx-menu');
        }
    }

    menuToggle.addEventListener('click', toggleMenu);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if(navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});