# LandingPage-Curinga

Modelo reutilizável de landing page em HTML, CSS e JavaScript puro para pequenos negócios.

## Arquivos

- `index.html`: estrutura e metadados.
- `style.css`: aparência e responsividade.
- `script.js`: configuração da empresa e comportamento da página.

## Personalização

Edite o objeto `SITE_CONFIG`, no início de `script.js`.

- `empresa`: nome, logotipo, cores e URL pública.
- `seo`: título, descrição e imagem de compartilhamento.
- `hero`: título, texto, imagem e texto do botão.
- `contato`: WhatsApp (número ou URL HTTPS), telefone, endereço, redes sociais e mapa.
- `servicos`, `diferenciais`, `galeria` e `avaliacoes`: listas de conteúdo.

O modelo começa sem dados fictícios. Preencha apenas informações reais e autorizadas pelo cliente. Listas vazias ou sem itens válidos ocultam a seção e seu link no menu.

### Exemplo de configuração

```js
empresa: {
    nome: "Nome da empresa",
    logoUrl: "https://exemplo.com/logo.png",
    corPrimaria: "#0056b3",
    corSecundaria: "#f8f9fa",
    urlSite: "https://exemplo.com"
},
contato: {
    whatsapp: "5511999999999",
    whatsappUrl: "https://exemplo.com/atendimento", // opcional; tem prioridade sobre o número
    telefone: "1133333333",
    endereco: "Rua Exemplo, 100",
    redesSociais: [{ nome: "Instagram", url: "https://instagram.com/empresa" }],
    mapaUrl: "https://www.google.com/maps/embed?..."
}
```

Use o código do país no número do WhatsApp. Se o atendimento usar um link HTTPS (por exemplo, um link curto), informe `whatsappUrl`; ele terá prioridade. Espaços, parênteses e traços são removidos ao montar links de telefone.

## Segurança e imagens

- Textos usam `textContent`, não `innerHTML`.
- Imagens aceitam HTTPS ou caminhos relativos locais.
- Redes sociais e metadados externos exigem HTTPS.
- O mapa aceita somente URLs HTTPS de incorporação do Google Maps em domínios permitidos.
- Telefones são validados antes de gerar links `tel:` e `wa.me`.
- Imagens quebradas exibem um placeholder SVG local.
- Links de seções ocultas também são ocultados no menu.

## SEO e compartilhamento

O JavaScript atualiza metadados durante a execução. Alguns robôs de redes sociais não executam JavaScript; preencha também os metadados estáticos no `index.html` antes de publicar cada versão personalizada.

## Publicação

Hospede no GitHub Pages, Netlify, Vercel ou em uma hospedagem estática tradicional. Para cada cliente, publique uma cópia personalizada com domínio e conteúdo autorizados.
