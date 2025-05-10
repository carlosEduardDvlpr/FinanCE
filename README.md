# 💰 FinanCE

**FinanCE** é um aplicativo simples e eficiente para controle de finanças pessoais. Com ele, você pode registrar entradas e saídas de dinheiro, visualizar relatórios e acompanhar sua saúde financeira.

👉 [Acesse o FinanCE aqui](https://finance-organizer.vercel.app)

## ✨ Funcionalidades

- ✅ Adição de **entradas** de saldo
- ✅ Adição de **despesas** por categorias
- ✅ **Resumo financeiro**
- ✅ **Gráfico** das suas despesas por categoria
- ✅ Geração de relatórios em PDF

## 🧭 Como usar

1. Adicione suas **entradas** e **despesas** conforme elas ocorrem.
2. Acompanhe o **saldo atualizado** e seus **gastos por categoria**.
3. Gere **relatórios** periódicos para ter uma visão mais clara do seu financeiro.

<img src="https://i.ibb.co/MmTfGSx/May-6-2025-9-57-39-PM-Screenshot.jpg" style="margin-block: 50px">

## 🚀 Tecnologias utilizadas

- **Next.js**
- **Prisma ORM** com **PostgreSQL**
- **JWT** para autenticação
- **Tailwind CSS** + **Shadcn/UI** para design responsivo
- **Recharts** para o gráficos de despesas
- **JSPDF** para exportação dos relatórios em PDF

## 📦 Instalação

### Pré-Requisitos:

- Ter um banco postgresql ou mysql.

### Clone o projeto:

```bash
git clone https://github.com/carlosEduardDvlpr/FinanCE.git
cd FinanCE
npm install
```

- Crie na raiz do projeto um arquivo .env e configure suas variáveis de ambiente:

```javascript
DATABASE_URL = 'postgresql://*********************'; // sua string de conexão com o banco de dados (altere o provedor em /prisma/schema.prisma se for usar um banco diferente de postgresql)
SECRET_KEY = 'minhahashsecretaparaJWT'; // chave secreta para o JWT
TOKEN_NAME = 'nomeparameutoken'; // nome do token de acesso (salvo nos cookies)
```

- Para gerar as tabelas no seu banco, execute no termininal:

```bash
npx prisma migrate dev --name init
```

- Gere o client do Prisma:

```bash
npx prisma generate
```

Por fim, execute o projeto:

```bash
npm run dev
```

| Desenvolvido por Carlos Eduardo
