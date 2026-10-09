export const criarEmprestimo = ({
  id = null,
  estudanteId,
  livroId,
  dataEmprestimo = null,
  dataPrevista,
  dataDevolucao = null,
  status = 'ativo',
  createdAt = null,
  updatedAt = null
}) => ({
  id,
  estudanteId,
  livroId,
  dataEmprestimo,
  dataPrevista,
  dataDevolucao,
  status,
  createdAt,
  updatedAt
});