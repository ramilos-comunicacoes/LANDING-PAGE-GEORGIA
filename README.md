# 🏛️ Geórgia Andrade Advocacia – Landing Page

Landing page profissional para o escritório **Geórgia Andrade Advocacia**, especializado em causas contra o INSS.

## 🚀 Como usar

1. Abra o arquivo `index.html` no navegador
2. Para desenvolvimento, use uma extensão como **Live Server** no VS Code

## 📁 Estrutura de Pastas

```
├── index.html              → Página principal
├── css/
│   └── style.css           → Estilos completos
├── js/
│   ├── main.js             → Menu, scroll, animações, FAQ
│   ├── carousel.js         → Carrossel de depoimentos
│   └── accessibility.js    → Widget de acessibilidade
└── assets/
    ├── logo/               → Coloque o logo aqui (logo.png ou logo.svg)
    ├── doutora/            → Foto da Dra. Geórgia (georgia.jpg)
    ├── equipe/             → Fotos da equipe
    ├── atendimentos/       → Fotos de atendimentos
    ├── escritorio/         → Fotos dos escritórios (escritorio-01.jpg)
    ├── depoimentos/        → Fotos dos clientes (cliente-01.jpg ... cliente-05.jpg)
    ├── icons/              → Ícones extras
    └── favicon/            → Favicon do site
```

## 🎨 Personalização

### Trocar textos
Edite diretamente no `index.html` — todos os textos genéricos estão prontos para substituição.

### Trocar imagens
Coloque suas imagens nas pastas corretas dentro de `assets/`. Nomes esperados:
- `assets/logo/logo.png` – Logo do escritório
- `assets/doutora/georgia.jpg` – Foto profissional da Dra. Geórgia
- `assets/escritorio/escritorio-01.jpg` – Foto do escritório
- `assets/depoimentos/cliente-01.jpg` até `cliente-05.jpg` – Fotos para depoimentos

### Trocar cores
Edite as variáveis CSS no início de `css/style.css`:
```css
:root {
    --color-primary: #47132a;      /* Borgonha principal */
    --color-accent: #C9A96E;       /* Dourado */
    --color-bg-light: #F8F6F3;     /* Branco gelo */
}
```

### Trocar mapas
Substitua os links `src` dos iframes na seção de contato pelos embeds corretos do Google Maps.

## 📱 Funcionalidades

- ✅ **Design responsivo** – Mobile, tablet e desktop
- ✅ **WhatsApp flutuante** – Botão no canto inferior esquerdo
- ✅ **Widget de acessibilidade** – Fonte, contraste, escala de cinza
- ✅ **Carrossel de depoimentos** – Auto-play com swipe
- ✅ **FAQ accordion** – Perguntas com animação suave
- ✅ **Animações on-scroll** – Intersection Observer
- ✅ **Contadores animados** – Números que contam ao aparecer
- ✅ **SEO otimizado** – Meta tags, Schema.org, Open Graph
- ✅ **Menu mobile** – Hamburger com overlay

## 📞 Contatos configurados

- Escritório: (88) 9 9716-6290
- Dra. Geórgia: (88) 9 9804-9716
- Atendimento Online: (88) 9 9279-8152
- Instagram Escritório: @georgiaandradeadvocacia
- Instagram Dra. Geórgia: @georgiaandrade.adv

## 🔧 Tecnologias

- HTML5 semântico
- CSS3 (variáveis, grid, flexbox, animações)
- JavaScript vanilla (ES6+)
- Google Fonts (Playfair Display + Inter)

---

Desenvolvido por [Ramilos Comunicações](https://github.com/ramilos-comunicacoes)
