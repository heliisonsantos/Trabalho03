# ADR-001 — Uso do Repository Pattern

## Status

Aceito

## Contexto

A API da Biblioteca Escolar precisa acessar o banco de dados PostgreSQL para realizar operações relacionadas a livros e empréstimos.

Na estrutura anterior, o acesso aos dados poderia ficar misturado com outras responsabilidades da aplicação.

Isso dificultaria a manutenção do código e aumentaria o acoplamento entre a aplicação e o banco de dados.

## Decisão

Foi decidido utilizar o **Repository Pattern** para separar o acesso aos dados das demais partes da aplicação.

Foram criados os seguintes repositories:

* `data/livros.repository.js`
* `data/emprestimos.repository.js`

Esses arquivos são responsáveis pelas operações de persistência utilizando o Prisma.

Os Controllers e Services não acessam o Prisma diretamente.

## Consequências

A principal consequência positiva é a separação de responsabilidades.

O acesso ao banco fica concentrado nos Repositories, deixando os Controllers e Services mais organizados.

Também fica mais fácil realizar futuras alterações na forma como os dados são persistidos.

Como consequência, existe uma camada adicional no projeto, mas essa camada ajuda a manter o código mais organizado e com menor acoplamento.

## Situação sem essa decisão

Sem o Repository Pattern, as consultas ao banco poderiam ficar espalhadas pelos Controllers e Services.

Isso aumentaria o acoplamento e tornaria futuras alterações no acesso aos dados mais trabalhosas.
