# Migração de servidor e domínio

Site estático (HTML/CSS/JS, sem build). Para publicar em outro servidor, basta
copiar todos os arquivos do repositório para a raiz do novo site.

Domínio atual: `https://georgiaandrade.nabio.pro/`

## Onde o domínio aparece (trocar todos)

Todos em `index.html`:

| Linha (aprox.) | Item |
|---|---|
| 17 | `<link rel="canonical">` |
| 24 | `og:url` |
| 26 | `og:image` |
| 27 | `og:image:secure_url` |
| 38 | `twitter:image` |
| 61 | `"url"` no JSON-LD (Schema.org) |

Troca rápida (PowerShell, na pasta do projeto):

```powershell
(Get-Content index.html -Raw -Encoding UTF8).Replace('https://georgiaandrade.nabio.pro/', 'https://NOVO-DOMINIO/') | Set-Content index.html -Encoding UTF8 -NoNewline
```

Confira depois: `git diff` deve mostrar só essas 6 linhas.

## Checklist

1. Trocar o domínio no `index.html` (acima), commit e push.
2. Enviar os arquivos ao novo servidor (inclui `assets/`, `css/`, `js/`).
3. Apontar o DNS do novo domínio e ativar HTTPS.
4. Se possível, redirecionar (301) o domínio antigo para o novo.
5. Testar a prévia de compartilhamento: <https://developers.facebook.com/tools/debug/>
   (clicar em "Scrape Again") para atualizar a imagem no WhatsApp/Instagram.
6. Atualizar o link do site no Google Meu Negócio, Instagram e WhatsApp Business.

Links externos que **não** dependem do domínio (não precisam mudar): WhatsApp,
Instagram, Google Maps, Google Fonts, Lucide, Unsplash, Receita Federal e o
crédito do desenvolvedor (`emannuel.nabio.pro`).
