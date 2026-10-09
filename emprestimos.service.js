export const criarEmprestimosService = ({ emprestimosRepository }) => ({
  criarEmprestimo: async (dados) => {
    const {
      estudanteId,
      livroId,
      diasEmprestimo
    } = dados;

    if (!estudanteId || !livroId) {
      const erro = new Error('DADOS_EMPRESTIMO_INVALIDOS');
      erro.status = 400;
      throw erro;
    }

    const dias = diasEmprestimo ?? 14;

    if (dias < 1 || dias > 30) {
      const erro = new Error('DIAS_EMPRESTIMO_INVALIDOS');
      erro.status = 400;
      throw erro;
    }

    return emprestimosRepository.criarEmprestimo({
      estudanteId,
      livroId,
      diasEmprestimo: dias
    });
  },

  listar: async ({ pagina, limite, status }) => {
    return emprestimosRepository.listar({
      pagina,
      limite,
      status
    });
  },

  devolverLivro: async (id) => {
    if (!id || Number(id) <= 0) {
      const erro = new Error('EMPRESTIMO_ID_INVALIDO');
      erro.status = 400;
      throw erro;
    }

    return emprestimosRepository.devolverLivro(id);
  }
});