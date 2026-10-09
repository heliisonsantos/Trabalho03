export const criarLivrosService = ({ livrosRepository }) => ({
  listar: async ({ pagina, limite, busca }) => {
    return livrosRepository.buscarTodos({ pagina, limite, busca });
  },

  buscarPorId: async (id) => {
    const livro = await livrosRepository.buscarPorId(id);

    if (!livro) {
      const erro = new Error('LIVRO_NAO_ENCONTRADO');
      erro.status = 404;
      throw erro;
    }

    return livro;
  },

  criar: async (dados) => {
    return livrosRepository.criar(dados);
  },

  atualizar: async (id, dados) => {
    return livrosRepository.atualizar(id, dados);
  },

  remover: async (id) => {
    return livrosRepository.remover(id);
  }
});