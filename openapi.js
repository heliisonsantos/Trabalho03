import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST da Biblioteca',
      version: '1.0.0',
      description: 'API REST para gerenciamento de livros e empréstimos da biblioteca.'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ],
    tags: [
      {
        name: 'Livros',
        description: 'Operações relacionadas aos livros'
      },
      {
        name: 'Empréstimos',
        description: 'Operações relacionadas aos empréstimos'
      }
    ],
    paths: {
      '/livros': {
        get: {
          tags: ['Livros'],
          summary: 'Lista os livros',
          parameters: [
            {
              name: 'pagina',
              in: 'query',
              schema: {
                type: 'integer',
                default: 1
              }
            },
            {
              name: 'limite',
              in: 'query',
              schema: {
                type: 'integer',
                default: 10
              }
            },
            {
              name: 'busca',
              in: 'query',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            200: {
              description: 'Lista de livros retornada com sucesso'
            }
          }
        },

        post: {
          tags: ['Livros'],
          summary: 'Cadastra um novo livro',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object'
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Livro cadastrado com sucesso'
            }
          }
        }
      },

      '/livros/{id}': {
        get: {
          tags: ['Livros'],
          summary: 'Busca um livro pelo ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer'
              }
            }
          ],
          responses: {
            200: {
              description: 'Livro encontrado'
            },
            404: {
              description: 'Livro não encontrado'
            }
          }
        },

        put: {
          tags: ['Livros'],
          summary: 'Atualiza um livro',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer'
              }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object'
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Livro atualizado com sucesso'
            }
          }
        },

        delete: {
          tags: ['Livros'],
          summary: 'Remove um livro',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer'
              }
            }
          ],
          responses: {
            204: {
              description: 'Livro removido com sucesso'
            }
          }
        }
      },

      '/emprestimos': {
        get: {
          tags: ['Empréstimos'],
          summary: 'Lista os empréstimos',
          parameters: [
            {
              name: 'pagina',
              in: 'query',
              schema: {
                type: 'integer',
                default: 1
              }
            },
            {
              name: 'limite',
              in: 'query',
              schema: {
                type: 'integer',
                default: 10
              }
            },
            {
              name: 'status',
              in: 'query',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            200: {
              description: 'Lista de empréstimos retornada com sucesso'
            }
          }
        },

        post: {
          tags: ['Empréstimos'],
          summary: 'Cria um novo empréstimo',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['estudanteId', 'livroId'],
                  properties: {
                    estudanteId: {
                      type: 'integer'
                    },
                    livroId: {
                      type: 'integer'
                    },
                    diasEmprestimo: {
                      type: 'integer',
                      minimum: 1,
                      maximum: 30,
                      default: 14
                    }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Empréstimo criado com sucesso'
            },
            400: {
              description: 'Dados inválidos'
            },
            404: {
              description: 'Livro ou estudante não encontrado'
            },
            409: {
              description: 'Não há exemplares disponíveis'
            }
          }
        }
      },

      '/emprestimos/{id}/devolver': {
        patch: {
          tags: ['Empréstimos'],
          summary: 'Registra a devolução de um empréstimo',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer'
              }
            }
          ],
          responses: {
            200: {
              description: 'Empréstimo devolvido com sucesso'
            },
            400: {
              description: 'Empréstimo já devolvido'
            },
            404: {
              description: 'Empréstimo não encontrado'
            }
          }
        }
      }
    }
  },
  apis: []
};

export const swaggerSpec = swaggerJsdoc(options);