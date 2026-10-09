export const criarLivro = ({
  id = null,
  titulo,
  autor,
  ano,
  exemplaresTotal = 1,
  exemplaresDisponiveis = exemplaresTotal,
  deletedAt = null,
  createdAt = null,
  updatedAt = null,
  categorias = []
}) => ({
  id,
  titulo,
  autor,
  ano,
  exemplaresTotal,
  exemplaresDisponiveis,
  deletedAt,
  createdAt,
  updatedAt,
  categorias
});