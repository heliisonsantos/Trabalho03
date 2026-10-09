import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { swaggerSpec } from './docs/openapi.js';
import { prisma } from './database.js';

import { criarLivrosRepository } from './data/livros.repository.js';
import { criarLivrosService } from './services/livros.service.js';
import { criarLivrosController } from './controllers/livros.controller.js';
import { criarLivrosRoutes } from './routes/livros.routes.js';

import { criarEmprestimosRepository } from './data/emprestimos.repository.js';
import { criarEmprestimosService } from './services/emprestimos.service.js';
import { criarEmprestimosController } from './controllers/emprestimos.controller.js';
import { criarEmprestimosRoutes } from './routes/emprestimos.routes.js';

import { tratamentoDeErros } from './middlewares/erro.middleware.js';

const app = express();

app.use(express.json());

// Swagger
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// ===============================
// INJEÇÃO DE DEPENDÊNCIAS - LIVROS
// ===============================

const livrosRepository = criarLivrosRepository({
  prisma
});

const livrosService = criarLivrosService({
  livrosRepository
});

const livrosController = criarLivrosController({
  livrosService
});

const livrosRoutes = criarLivrosRoutes({
  livrosController
});

// ====================================
// INJEÇÃO DE DEPENDÊNCIAS - EMPRÉSTIMOS
// ====================================

const emprestimosRepository = criarEmprestimosRepository({
  prisma
});

const emprestimosService = criarEmprestimosService({
  emprestimosRepository
});

const emprestimosController = criarEmprestimosController({
  emprestimosService
});

const emprestimosRoutes = criarEmprestimosRoutes({
  emprestimosController
});

// ===============================
// ROTAS
// ===============================

app.use('/livros', livrosRoutes);
app.use('/emprestimos', emprestimosRoutes);

// ===============================
// TRATAMENTO GLOBAL DE ERROS
// ===============================

app.use(tratamentoDeErros);

// ===============================
// SERVIDOR
// ===============================

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`API REST da biblioteca rodando na porta ${PORT}`);
});