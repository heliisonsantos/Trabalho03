import { Router } from 'express';

import { validarCorpo } from '../middlewares/validacao.js';

import { criarEmprestimoSchema } from '../schemas/emprestimo.schema.js';

export const criarEmprestimosRoutes = ({
  emprestimosController
}) => {
  const router = Router();

  router.get(
    '/',
    emprestimosController.listarEmprestimos
  );

  router.post(
    '/',
    validarCorpo(criarEmprestimoSchema),
    emprestimosController.criarEmprestimo
  );

  router.patch(
    '/:id/devolver',
    emprestimosController.devolverLivro
  );

  return router;
};