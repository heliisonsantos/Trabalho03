export const criarLivrosController = ({ livrosService }) => ({
  listarLivros: async (req, res, next) => {
    try {
      const { pagina, limite, busca } = req.query;

      const resultado = await livrosService.listar({
        pagina,
        limite,
        busca
      });

      return res.status(200).json(resultado);
    } catch (erro) {
      next(erro);
    }
  },

  obterLivroPorId: async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      const livro = await livrosService.buscarPorId(id);

      return res.status(200).json(livro);
    } catch (erro) {
      next(erro);
    }
  },

  criarLivro: async (req, res, next) => {
    try {
      const novoLivro = await livrosService.criar(req.body);

      return res.status(201).json(novoLivro);
    } catch (erro) {
      next(erro);
    }
  },

  atualizarLivro: async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      const livroAtualizado = await livrosService.atualizar(
        id,
        req.body
      );

      return res.status(200).json(livroAtualizado);
    } catch (erro) {
      next(erro);
    }
  },

  apagarLivro: async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      await livrosService.remover(id);

      return res.status(204).send();
    } catch (erro) {
      next(erro);
    }
  }
});