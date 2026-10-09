import { criarEmprestimo } from '../models/emprestimo.model.js';

export const criarEmprestimosRepository = ({ prisma }) => ({
  // Criação de empréstimo com transação
  criarEmprestimo: async ({
    estudanteId,
    livroId,
    diasEmprestimo = 14
  }) => {
    return await prisma.$transaction(async (tx) => {
      const livro = await tx.livro.findFirst({
        where: {
          id: Number(livroId),
          deletedAt: null
        }
      });

      if (!livro) {
        throw new Error('LIVRO_NAO_ENCONTRADO');
      }

      if (livro.exemplaresDisponiveis <= 0) {
        throw new Error('SEM_ESTOQUE_DISPONIVEL');
      }

      const estudante = await tx.estudante.findFirst({
        where: {
          id: Number(estudanteId),
          deletedAt: null
        }
      });

      if (!estudante) {
        throw new Error('ESTUDANTE_NAO_ENCONTRADO');
      }

      await tx.livro.update({
        where: {
          id: Number(livroId)
        },
        data: {
          exemplaresDisponiveis: {
            decrement: 1
          }
        }
      });

      const dataPrevista = new Date();

      dataPrevista.setDate(
        dataPrevista.getDate() + Number(diasEmprestimo)
      );

      const emprestimo = await tx.emprestimo.create({
        data: {
          estudanteId: Number(estudanteId),
          livroId: Number(livroId),
          dataPrevista,
          status: 'ativo'
        },
        include: {
          livro: {
            select: {
              titulo: true,
              autor: true
            }
          },
          estudante: {
            select: {
              nome: true,
              matricula: true
            }
          }
        }
      });

      return criarEmprestimo(emprestimo);
    });
  },

  // Devolução de livro com transação
  devolverLivro: async (emprestimoId) => {
    return await prisma.$transaction(async (tx) => {
      const emprestimo = await tx.emprestimo.findUnique({
        where: {
          id: Number(emprestimoId)
        }
      });

      if (!emprestimo) {
        throw new Error('EMPRESTIMO_NAO_ENCONTRADO');
      }

      if (emprestimo.status === 'devolvido') {
        throw new Error('EMPRESTIMO_JA_DEVOLVIDO');
      }

      await tx.livro.update({
        where: {
          id: emprestimo.livroId
        },
        data: {
          exemplaresDisponiveis: {
            increment: 1
          }
        }
      });

      const resultado = await tx.emprestimo.update({
        where: {
          id: Number(emprestimoId)
        },
        data: {
          status: 'devolvido',
          dataDevolucao: new Date()
        },
        include: {
          livro: {
            select: {
              titulo: true
            }
          },
          estudante: {
            select: {
              nome: true
            }
          }
        }
      });

      return criarEmprestimo(resultado);
    });
  },

  // Consulta paginada
  listar: async ({
    pagina = 1,
    limite = 10,
    status
  } = {}) => {
    const take = Number(limite) || 10;
    const pag = Number(pagina) || 1;
    const skip = (pag - 1) * take;

    const where = status
      ? { status }
      : {};

    const [total, dados] = await Promise.all([
      prisma.emprestimo.count({
        where
      }),

      prisma.emprestimo.findMany({
        where,
        take,
        skip,
        orderBy: {
          dataEmprestimo: 'desc'
        },
        include: {
          livro: {
            select: {
              id: true,
              titulo: true
            }
          },
          estudante: {
            select: {
              id: true,
              nome: true,
              turma: true
            }
          }
        }
      })
    ]);

    return {
      metadados: {
        totalRegistros: total,
        totalPaginas: Math.ceil(total / take),
        paginaAtual: pag,
        limitePorPagina: take
      },

      dados: dados.map((emprestimo) =>
        criarEmprestimo(emprestimo)
      )
    };
  }
});