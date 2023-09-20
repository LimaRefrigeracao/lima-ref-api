# API Lima Refrigeração (https://lima-ref.onrender.com)

- [ Estrutura do Projeto ]

```plaintext
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
```

## Scripts e Info (Dev)

- [ Iniciar container com o banco de dados ]
#### 
```sh
docker compose up -d --build
```
- [ Subir api localmente ]
```sh
npm run dev
```
- [Cria uma nova migration]
```sh
npx sequelize-cli migration:generate --name nome_da_tabela
```
- [ Constroi as novas tabelas ]
```sh
npx sequelize-cli db:migrate
```
- [ Reverte alterações nas tabelas ]
```sh
npx sequelize-cli db:migrate:undo
```
- [ Altera estruturas das tabelas ]
```sh
npx sequelize-cli db:migrate:schema:nome_da_nova_coluna:add
```
#### Portas em serviço
###### APP - 3333
###### POSTGRES - 5432
###### ADMINER - 8080

## Informações do APP

#### Status de Serviço
```plaintext
1. Visitar
2. Buscar
3. Na Fila
4. Mexendo
5. Orçamentado
6. Autorizado
7. Testando
8. Pronto
9. Entregar
10. Devolver
11. Concluído
```
#### Status de Pagamento
```plaintext
1. Aberto
2. Pendente
3. Pago
```
