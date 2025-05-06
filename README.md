# 💰 FinanCE

**FinanCE** é um aplicativo simples e eficiente para controle de finanças pessoais. Com ele, você pode registrar entradas e saídas de dinheiro, visualizar relatórios por categoria e acompanhar sua saúde financeira com clareza.

👉 [Acesse o FinanCE aqui](https://finance-organizer.vercel.app)

## ✨ Funcionalidades

- ✅ Adição de **entradas** de saldo
- ✅ Registro de **despesas** por categorias:
  - 🏠 Casa
  - 🍔 Alimentação
  - 🚗 Transporte
  - 📚 Educação
  - 💳 Dívidas
  - 🎉 Lazer
  - 🧍 Pessoal
  - 🗂️ Outros
- ✅ **Resumo financeiro geral**, incluindo:
  - Total de entradas
  - Total de despesas
  - Saldo disponível
- ✅ **Gráfico** por categoria
- ✅ Geração de relatório em PDF

## 🧭 Como usar

1. Adicione suas **receitas** e **despesas** conforme elas ocorrem.
2. Acompanhe o **saldo atualizado** e seus **gastos por categoria**.
3. Gere **relatórios** periódicos para ter uma visão mais clara do seu comportamento financeiro.

## 🚀 Tecnologias utilizadas

- **Next.js** para o frontend
- **Prisma ORM** com **PostgreSQL** no backend
- **Sessão persistente** com **JWT**
- **Tailwind CSS** e componentes **Shadcn/UI** para o design responsivo
- **Recharts** para os gráficos
- **JSPDF** para exportar os relatórios

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
