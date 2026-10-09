export const tratamentoDeErros = (erro, req, res, _next) => {
  console.error(erro);

  if (erro.message === 'LIVRO_NAO_ENCONTRADO') {
    return res.status(404).json({
      erro: 'Livro não encontrado ou desativado.'
    });
  }

  if (erro.message === 'ESTUDANTE_NAO_ENCONTRADO') {
    return res.status(404).json({
      erro: 'Estudante não encontrado.'
    });
  }

  if (erro.message === 'SEM_ESTOQUE_DISPONIVEL') {
    return res.status(409).json({
      erro: 'Não há exemplares disponíveis no momento.'
    });
  }

  if (erro.message === 'EMPRESTIMO_NAO_ENCONTRADO') {
    return res.status(404).json({
      erro: 'Empréstimo informado não existe.'
    });
  }

  if (erro.message === 'EMPRESTIMO_JA_DEVOLVIDO') {
    return res.status(400).json({
      erro: 'Este empréstimo já foi encerrado e devolvido anteriormente.'
    });
  }

  if (erro.status) {
    return res.status(erro.status).json({
      erro: erro.message
    });
  }

  return res.status(500).json({
    erro: 'ERRO_INTERNO',
    mensagem: 'Ocorreu um erro inesperado no servidor.'
  });
};