# API Lima Refrigeração (https://lima-ref.onrender.com)

### Estrutura do projeto

lima-ref-api/
  |- .vscode
  |- src/
      |- controllers/
          |- servicesController.js
      |- database/
          |- config/
              |- config.js
          |- migrations/
              |- 20230913071001-services.js
          |- seeders/
      |- middlewares/
          |- servicesMiddleware.js
      |- models/
          |- connection.js
          |- servicesModel.js
      |- utils/
      |- app.js
      |- router.js
      |- server.js
  |- .env.development
  |- .eslintrc.json
  |- .gitignore
  |- .sequelizerc
  |- babel.config.json
  |- compose.yaml
  |- package-lock.json
  |- package.json
  |- README.md

## Scripts e Info (Dev)

#### Iniciar container com o banco de dados
```sh
docker compose up -d --build
```
#### Subir api localmente
```sh
npm run dev
```
#### Cria uma nova migration 
```sh
npx sequelize-cli migration:generate --name nome_da_tabela
```
#### Constroi as novas tabelas
```sh
npx sequelize-cli db:migrate
```
#### Reverte alterações nas tabelas
```sh
npx sequelize-cli db:migrate:undo
```
#### Altera estruturas das tabelas
```sh
npx sequelize-cli db:migrate:schema:nome_da_nova_coluna:add
```

#### Portas dos serviços
APP - 3333
POSTGRES - 5432
ADMINER - 8080


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