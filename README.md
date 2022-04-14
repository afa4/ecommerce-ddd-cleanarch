# Clean Code e Clean Architecture - Turma 4 (branas.io)

Projeto cujo objetivo é aplicar boas práticas de codificação e arquitetura, inspiradas na obra do Robert Martin e outros autores.

As aulas teóricas foram ministradas pelo professor Rodrigo Branas.

## Objetivo

Fornecer a possibilidade de criação de pedidos com itens (produtos) e controle de estoque.

## Arquitetura do projeto

```shell
src
|__application # Serviços de aplicação
  |__query # Serviços de consulta
  |__use-cases # Serviços de comando
|__domain
  |__entity # Entidades, Objetos de valor de negócio com seus casos de uso
  |__repository # Repositório para persistencia dos agregados de negócio
|__infra
  |__broker
  |__database
  |__repository
```

## tasks: 

1 - criar repositórios de banco de dados para todos os agregados
2 - conectar api
3 - criar testes de integração para api
4 - criar uma interface cli para consultar pedidos

controle de estoque:

6 - realiza pedido (OK)
7 - emite evento de pedido realizado (OK)
8 - estoque possui quantidade subiciente? (OK)
8.1 - sim: debita estoque (OK)
8.2 - não: cancela pedido
(considerar sku em ambos os casos)
