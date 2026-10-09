# API REST - Sistema de Biblioteca Escolar

API REST desenvolvida em Node.js e Express para gerenciamento de acervo bibliotecário e controle de empréstimos.

O projeto utiliza PostgreSQL como banco de dados, Prisma como ORM e Zod para validação dos dados.

A aplicação foi refatorada no Trabalho 3 utilizando arquitetura em camadas e padrões de projeto, mantendo o comportamento externo da API desenvolvido nos trabalhos anteriores.

---

## 🛠️ Tecnologias e Ferramentas

* **Runtime:** Node.js
* **Framework Web:** Express
* **ORM:** Prisma v6
* **Banco de Dados:** PostgreSQL
* **Validação:** Zod
* **Documentação da API:** Swagger / OpenAPI
* **Execução em desenvolvimento:** Nodemon
* **Padronização de código:** ESLint

---

## 🏛️ Modelagem de Dados

O banco de dados possui os seguintes modelos:

* **Estudantes (`estudantes`):** registros dos alunos, com matrícula e e-mail únicos.
* **Livros (`livros`):** catálogo de obras, controle de exemplares totais e disponíveis.
* **Categorias (`categorias`):** classificação temática dos livros.
* **LivroCategoria (`livro_categorias`):** tabela de junção utilizada no relacionamento N:N entre livros e categorias.
* **Empréstimos (`emprestimos`):** registros dos empréstimos realizados pelos estudantes.

### Recursos de banco de dados

* Campos `created_at` e `updated_at`.
* Exclusão lógica através do campo `deleted_at`.
* Índices para campos utilizados frequentemente em consultas.
* Chaves primárias e estrangeiras.
* Restrição de valores únicos para matrícula, e-mail e categoria.
* Integridade referencial entre as tabelas.
* Relacionamento 1:N entre estudantes e empréstimos.
* Relacionamento N:N entre livros e categorias através da tabela `livro_categorias`.

---

## 🏗️ Arquitetura

A aplicação utiliza uma arquitetura em camadas, separando as responsabilidades de cada parte do sistema.

O fluxo principal é:

```text
Cliente
   ↓
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
Prisma
   ↓
PostgreSQL
```

### Camadas

**Routes**

Responsáveis pela definição dos endpoints e pelo encaminhamento das requisições para os Controllers.

**Controllers**

Responsáveis pela comunicação entre HTTP e a aplicação. Recebem `req` e `res`, chamam os Services e retornam as respostas HTTP.

**Services**

Responsáveis pelas regras de negócio e pela organização dos casos de uso.

**Repositories**

Responsáveis pelo acesso aos dados. O acesso ao Prisma fica concentrado nessa camada.

**Models**

Representam as entidades utilizadas pela aplicação, como livros e empréstimos.

**Middlewares**

Responsáveis por funções que podem ser utilizadas por diferentes partes da aplicação, como validação e tratamento de erros.

Mais detalhes sobre a arquitetura estão disponíveis em:

`ARQUITETURA.md`

---

## 🎯 Padrões de Projeto

Durante a refatoração foram utilizados três padrões principais.

### Repository Pattern

O Repository separa o acesso ao banco de dados das demais camadas.

Os principais arquivos são:

```text
data/livros.repository.js
data/emprestimos.repository.js
```

Sem esse padrão, as consultas ao banco poderiam ficar espalhadas pelos Controllers e Services, aumentando o acoplamento.

---

### Dependency Injection

As dependências são criadas e organizadas no `app.js` e depois passadas para os componentes que precisam delas.

Exemplo:

```js
const livrosService = criarLivrosService({
  livrosRepository
});
```

Isso reduz o acoplamento e facilita a substituição de implementações.

---

### Factory Pattern

As funções `criar...` são utilizadas para criar os componentes da aplicação já recebendo suas dependências.

Exemplos:

```text
criarLivrosRepository()
criarLivrosService()
criarLivrosController()
criarLivrosRoutes()
```

O uso dessas funções deixa a montagem da aplicação mais organizada.

---

## 📚 Documentação da Arquitetura

As decisões arquiteturais estão documentadas nos seguintes arquivos:

```text
ARQUITETURA.md

ADR/
├── ADR-001-repository.md
└── ADR-002-dependency-injection.md
```

Os ADRs apresentam o contexto, a decisão tomada e as consequências das escolhas arquiteturais.

---

## ⚙️ Instalação e Execução

### 1. Pré-requisitos

É necessário ter instalado:

* Node.js v20 ou superior
* PostgreSQL
* npm

O PostgreSQL deve estar em execução na porta `5432`.

### 2. Instalar as dependências

Na pasta do projeto, execute:

```bash
npm install
```

### 3. Configurar o banco de dados

Crie um banco PostgreSQL chamado:

```text
biblioteca_escolar
```

### 4. Configurar o arquivo `.env`

Crie o arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://postgres:SENHA@localhost:5432/biblioteca_escolar?schema=public"
```

Substitua `SENHA` pela senha configurada no PostgreSQL.

### 5. Executar as migrations

```bash
npx prisma migrate deploy
```

### 6. Gerar o Prisma Client

```bash
npx prisma generate
```

### 7. Executar a aplicação

Para iniciar normalmente:

```bash
npm start
```

Para desenvolvimento:

```bash
npm run dev
```

A API será executada em:

```text
http://localhost:3000
```

---

## 📖 Swagger / OpenAPI

A documentação dos endpoints está disponível através do Swagger:

```text
http://localhost:3000/docs
```

O Swagger permite visualizar e testar os endpoints da API.

---

## 🔗 Endpoints

### Livros

| Método | Endpoint      | Descrição              |
| ------ | ------------- | ---------------------- |
| GET    | `/livros`     | Lista os livros        |
| GET    | `/livros/:id` | Busca um livro pelo ID |
| POST   | `/livros`     | Cadastra um livro      |
| PUT    | `/livros/:id` | Atualiza um livro      |
| DELETE | `/livros/:id` | Remove um livro        |

### Empréstimos

| Método | Endpoint                    | Descrição                       |
| ------ | --------------------------- | ------------------------------- |
| GET    | `/emprestimos`              | Lista os empréstimos            |
| POST   | `/emprestimos`              | Cria um empréstimo              |
| PATCH  | `/emprestimos/:id/devolver` | Realiza a devolução de um livro |

---

## 🧪 Validação do projeto

O projeto possui ESLint configurado para verificar possíveis problemas no código.

Para executar a verificação:

```bash
npm run lint
```

O projeto também teve os principais endpoints testados após a refatoração para verificar se o comportamento externo da API foi preservado.

---

## 📁 Estrutura do Projeto

```text
ativ03/
│
├── controllers/
├── data/
├── docs/
├── middlewares/
├── models/
├── routes/
├── schemas/
├── services/
│
├── ADR/
│   ├── ADR-001-repository.md
│   └── ADR-002-dependency-injection.md
│
├── prisma/
├── app.js
├── database.js
├── prisma.config.ts
├── ARQUITETURA.md
├── README.md
└── package.json
```

---

## ✅ Resultado da Refatoração

A refatoração teve como objetivo melhorar a organização interna da API sem alterar o comportamento esperado pelos clientes.

Foram aplicados:

* Arquitetura em camadas;
* Separação entre Routes, Controllers, Services e Repositories;
* Repository Pattern;
* Dependency Injection;
* Factory Pattern;
* Validação através de middleware e Zod;
* Tratamento centralizado de erros;
* Isolamento do acesso ao Prisma;
* Documentação através de Swagger/OpenAPI;
* Documentação das decisões arquiteturais através de ADRs.

Dessa forma, a aplicação fica mais organizada, com responsabilidades mais claras e preparada para futuras alterações.
