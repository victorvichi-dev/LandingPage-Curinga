# LandingPage-Curinga

Template de Landing Page profissional em HTML, CSS e JavaScript puro (Vanilla), otimizado para pequenos e médios negócios locais (Clínicas, Oficinas, Consultorias, Comércio em geral). 

**Características da versão atualizada:**
- 🛡️ **Seguro:** Sem dependências externas e sem uso de `innerHTML` para inserção de conteúdo sensível.
- 📱 **Responsivo & Acessível:** Funciona em qualquer tela, com navegação por teclado testada e suporte a leitores de tela (`aria-attributes`).
- ⚡ **Performance e SEO:** Estrutura otimizada, tags semânticas e carregamento rápido.
- ⚙️ **Configuração Centralizada:** Para personalizar todo o site (cores, textos, logos, telefones), basta editar um único objeto `SITE_CONFIG` no topo do `script.js`.

## Como utilizar

1. Baixe os arquivos (`index.html`, `style.css` e `script.js`).
2. Abra o arquivo `script.js` no seu editor de texto.
3. Edite as informações dentro do objeto `SITE_CONFIG`.

### Exemplo de Ocultação Automática
A lógica de renderização é inteligente. Se o cliente não possuir uma informação, basta deixar a string vazia (`""`) ou remover a chave do objeto.
- Não tem Instagram? Defina `instagram: ""` e o botão desaparece.
- Não tem Avaliações ainda? Defina `avaliacoes: []` e a seção correspondente sumirá do layout e do menu principal automaticamente, sem deixar buracos ou links quebrados.

### Segurança e SEO
- Os links de telefone e WhatsApp são sanitizados automaticamente (remover espaços, traços).
- Se uma URL de imagem configurada estiver incorreta ou sair do ar, o script injeta instantaneamente um *placeholder SVG*, impedindo que o layout quebre.
- Altere os atributos estáticos nas tags `<meta>` do `index.html` para as redes sociais indexarem corretamente o projeto na primeira vez que for publicado, o JS fará o restante da atualização de títulos dinamicamente.

## Implantação
Sendo HTML/CSS/JS estático puro, você pode hospedar gratuitamente em plataformas como GitHub Pages, Vercel, Netlify ou qualquer hospedagem tradicional (cPanel, HostGator, Locaweb).