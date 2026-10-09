import { Router } from 'express';

export const criarLivrosRoutes = ({ livrosController }) => {
  const router = Router();

  router.get('/', livrosController.listarLivros);

  router.get('/:id', livrosController.obterLivroPorId);

  router.post('/', livrosController.criarLivro);

  router.put('/:id', livrosController.atualizarLivro);

  router.delete('/:id', livrosController.apagarLivro);

  return router;
};