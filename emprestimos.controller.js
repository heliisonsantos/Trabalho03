export const criarEmprestimosController = ({ emprestimosService }) => ({
  criarEmprestimo: async (req, res, next) => {
    try {
      const resultado = await emprestimosService.criarEmprestimo(req.body);

      return res.status(201).json(resultado);
    } catch (erro) {
      next(erro);
    }
  },

  listarEmprestimos: async (req, res, next) => {
    try {
      const { pagina, limite, status } = req.query;

      const resultado = await emprestimosService.listar({
        pagina,
        limite,
        status
      });

      return res.status(200).json(resultado);
    } catch (erro) {
      next(erro);
    }
  },

  devolverLivro: async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      const resultado = await emprestimosService.devolverLivro(id);

      return res.status(200).json(resultado);
    } catch (erro) {
      next(erro);
    }
  }
});