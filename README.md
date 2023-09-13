# API Lima Refrigeração
meu-projeto/
  |- src/
  |   |- server.js   // Seu arquivo JavaScript principal
  |
  |- package.json

## Ferramentas
```sh
npx sequelize-cli migration:generate --name nome_da_tabela
```

### Status de Serviço
0 - Visitar
1 - Buscar
2 - Na Fila
3 - Mexendo
4 - Orçamentado
5 - Autorizado
6 - Testando
7 - Pronto
8 - Entregar
9 - Devolver
10 - Concluído

### Status de Pagamento
0 - Aberto
1 - Pendente
2 - Pago