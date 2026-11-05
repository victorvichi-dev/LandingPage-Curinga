# Landing Page Curinga B2B (Segura, Responsiva e Otimizada)

Este projeto é um framework minimalista de Landing Page para pequenos negócios, otimizado para segurança (prevenção de XSS), acessibilidade, performance (sem dependências pesadas) e facilidade de manutenção.

## Como configurar para um novo cliente?
Toda a configuração é centralizada no arquivo `script.js`. **Você não precisa abrir os arquivos HTML e CSS.**

1. Abra o arquivo `script.js`.
2. Localize o objeto `SITE_CONFIG`.
3. Substitua os dados de `[DEMONSTRAÇÃO]` pelos dados reais do cliente.

### Destaques do Sistema Automático:
* **Ocultação Inteligente:** Se o seu cliente não tem telefone fixo, endereço físico ou mapa, basta deixar a propriedade vazia `''` no JS. A página oculta o campo automaticamente, sem quebrar o layout.
* **Sem Depoimentos Falsos:** O array de avaliações `avaliacoes: []` já começa vazio. O bloco inteiro se oculta sozinho. Adicione itens apenas se existirem dados reais.
* **Prevenção de XSS:** A injeção de dados no DOM é feita via `createElement` e `textContent`. Nenhum script malicioso digitado nos textos será interpretado pelo navegador.
* **Acessibilidade e SEO:** Metadados gerados dinamicamente e menu mobile otimizado com `aria-expanded` para leitores de tela.

## Como usar imagens locais?
Se você não quiser usar URLs de imagens (como Unsplash), crie uma pasta chamada `img` junto com o arquivo `index.html`. 
No `script.js`, altere as propriedades apontando para o caminho relativo:
```javascript
imagemDestaque: './img/hero.jpg',