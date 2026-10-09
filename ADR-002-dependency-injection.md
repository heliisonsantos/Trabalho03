# ADR-002 — Uso de Dependency Injection

## Status

Aceito

## Contexto

A aplicação possui diferentes componentes que dependem uns dos outros.

Por exemplo, o Controller precisa do Service e o Service precisa do Repository.

Era necessário organizar essa relação entre os componentes sem que cada parte da aplicação precisasse criar suas próprias dependências.

## Decisão

Foi decidido utilizar **Dependency Injection** para fornecer as dependências necessárias aos componentes da aplicação.

A montagem das dependências é realizada no `app.js`.

Por exemplo:

```js
const livrosRepository = criarLivrosRepository({
    prisma
});

const livrosService = criarLivrosService({
    livrosRepository
});

const livrosController = criarLivrosController({
    livrosService
});
```

Dessa forma, cada componente recebe aquilo que precisa para funcionar.

O Service recebe o Repository e o Controller recebe o Service, sem precisar criar essas dependências diretamente.

## Consequências

A principal consequência positiva é a redução do acoplamento entre os componentes.

Também fica mais fácil substituir uma implementação por outra no futuro e realizar testes utilizando dependências diferentes.

Como consequência, o `app.js` passa a ter a responsabilidade de montar e conectar os componentes da aplicação.

## Situação sem essa decisão

Sem Dependency Injection, os componentes poderiam criar ou importar diretamente suas próprias dependências.

Isso aumentaria o acoplamento e dificultaria a substituição de implementações e a realização de testes.

Com a injeção de dependências, cada componente fica responsável apenas pelo seu próprio funcionamento.
