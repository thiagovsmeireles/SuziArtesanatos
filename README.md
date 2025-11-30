# 🧶 Susi Artesanatos

> E-commerce desenvolvido com Next.js para exibição e venda de produtos artesanais.

[![Deploy](https://img.shields.io/badge/Deploy-Render-blue?style=for-the-badge&logo=render)](https://suziartesanatos.onrender.com)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🖼️ Preview do Projeto
<div align="center">
  <img src="https://github.com/user-attachments/assets/3d703054-7650-4d9a-b12b-8f607900d01d" width="250" />
  <img src="https://github.com/user-attachments/assets/36d29a5d-b365-4f8c-8c6c-cb515d1bc362" width="250" />
  <img src="https://github.com/user-attachments/assets/e060926c-085e-451f-a42c-1ba698a2d99d" width="250" />
</div>




---

## 💡 Sobre o Projeto

Este projeto é uma vitrine virtual desenvolvida para a **Susi Artesanatos**. O objetivo principal é apresentar o catálogo de produtos feitos à mão (Amigurumis e Tapetes) e facilitar o contato direto com o cliente através do WhatsApp.

### ✨ Funcionalidades

- **Catálogo Visual:** Exibição clara de produtos.
- **Botão CTA Inteligente:** Integração direta com a API do WhatsApp.
- **Design Responsivo:** Interface otimizada para mobile e desktop.
- **Performance:** Construído com Next.js para renderização rápida e SEO otimizado.

---

## 🛠️ Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/):** Framework React para produção, garantindo performance e escalabilidade.
- **[React](https://reactjs.org/):** Biblioteca para construção da interface.
- **[Tailwind CSS](https://tailwindcss.com/):** Framework de utilitários CSS para estilização rápida e responsiva.
- **TypeScript:** Para tipagem estática e segurança do código.## 🚀 Como rodar o projeto localmente

---

## 📂 Estrutura do Projeto

O projeto segue a arquitetura do **Next.js 13+ (App Router)**:

```text
src/
├── app/
│   ├── admin/           # Painel administrativo (protegido)
│   ├── login/           # Autenticação
│   ├── produtos/
│   │   └── [slug]/      # Página dinâmica de detalhes do produto
│   └── page.tsx         # Página Inicial (Landing Page)
├── components/
│   ├── ui/              # Componentes de Interface (Cards, Filtros, Hero)
│   └── WhatsApp...      # Formulário de integração com API do Whats
├── data/                # Mock de dados e configurações da loja
├── lib/                 # Funções utilitárias e lógica compartilhada
└── public/              # Assets estáticos (Logo, Uploads)
```

---


## 🚀 Como rodar o projeto localmente

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/thiagovsmeireles/SuziArtesanatos.git](https://github.com/thiagovsmeireles/SuziArtesanatos.git)


2. **Entre na pasta do projetos**
   ```bash

cd SuziArtesanatos
Instale as dependências

3. **Instale as dependências**
   ```bash

npm install
Rode o servidor de desenvolvimento

4. **Rode o servidor de desenvolvimento**
   ```bash

npm run dev
O projeto estará rodando em http://localhost:3000.

👨‍💻 Autor
Desenvolvido por Thiago Meireles.
