# Sistema de Ordens de Serviço

## 📌 Sobre o Projeto
Este projeto é um **sistema de ordens de serviço robusto**, desenvolvido para facilitar o **gerenciamento de usuários, estoque e vendas**. O sistema conta com uma interface moderna e eficiente utilizando **React.js** no front-end, enquanto o back-end é desenvolvido com **NestJS** e **Prisma** para um gerenciamento de banco de dados eficiente.

## 🚀 Tecnologias Utilizadas
### **Front-end:**
- React.js
- CSS 

### **Back-end:**
- NestJS (Framework Node.js)
- Prisma ORM (para manipulação do banco de dados)
- PostgreSQL/MySQL (ou outro banco de dados escolhido)
- Autenticação JWT
- Validação com Class-validator

## 🔧 Funcionalidades Principais
✅ **Gerenciamento de Usuários** (Cadastro, Login, Controle de Acesso, Perfis de Usuário)
✅ **Controle de Ordens de Serviço** (Criar, Editar, Listar, Finalizar)
✅ **Gerenciamento de Estoque** (Adicionar/Remover Produtos, Relatórios de Disponibilidade)
✅ **Módulo de Vendas** (Registro de Vendas, Integração com Pagamentos)

## 🏗️ Como Rodar o Projeto Localmente

### **Pré-requisitos**
Certifique-se de ter instalado em sua máquina:
- Node.js (v16 ou superior)
- PostgreSQL/MySQL

### **Passo a Passo**
#### **1️⃣ Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

#### **2️⃣ Instale as dependências:**
##### **Backend:**
```bash
cd api-os-backend
npm install
```

##### **Frontend:**
```bash
cd Front-end_Queijo
npm install
```

#### **3️⃣ Configure as variáveis de ambiente**
Crie um arquivo `.env` no backend e adicione as configurações necessárias, como exemplo:
```
DATABASE_URL=postgresql://user:password@localhost:5432/meubanco
JWT_SECRET=sua_chave_secreta
```

#### **5️⃣ Rode a aplicação:**
##### **Backend:**
```bash
cd api-os-backend
npm run start:dev
```
##### **Frontend:**
```bash
cd Front-end_Queijo
npm run dev
```

Agora, acesse **`http://localhost:3000`** no seu navegador para ver a aplicação rodando! 🎉

## 📚 Estrutura do Projeto
```
/AplicationOrderService
├── api-os-backend/    # Código do NestJS
│   ├── src/
│   │   ├── modules/
│   │   ├── main.ts
│   │   ├── prisma/
│   └── package.json
│
├── Front-end_Queijo/   # Código do React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   ├── package.json
│
└── README.md   # Documentação do projeto
```

## 📌 Melhorias Futuras
- 📌 Implementação de Notificações por Email
- 📌 Dashboard de Relatórios

## 🤝 Contribuição
Se quiser contribuir com melhorias, siga os passos:
1. **Faça um fork** deste repositório
2. **Crie uma branch** com a feature/bugfix: `git checkout -b minha-feature`
3. **Commit suas alterações**: `git commit -m 'Adicionando nova funcionalidade'`
4. **Faça um push** para a branch: `git push origin minha-feature`
5. **Abra um Pull Request** 🚀

---
📩 Caso tenha dúvidas ou sugestões, entre em contato! 🚀

