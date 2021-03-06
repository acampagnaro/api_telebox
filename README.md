API - TELEBOX CURITIBA

* POST -> Create
* GET -> Retrieve
* PUT -> Update
* DELETE -> Delete

# Dependências

## Bancos de dados
* MongoDB
```
$ brew install mongodb
```
* MySQL
```
$ brew install mysql
```

## Módulos `npm` utilizados
* bluebird (para Promises)
* expressjs (como framework de rotas)
* mongojs (conector para o mongodb)
* supertest
* mocha (testes unitários)
* nodemailer (emails)
* validator (validações)
* multer (imagens)
* db-migrate(migrações)
* dotenv(arquivo .env da raiz)

## Desenvolvimento

Instale o nodemon global e as dependências locais do projeto:

```
$ npm install -g nodemon
$ npm install -g db-migrate
$ npm install db-migrate-mysql
$ npm install
$ npm start
```

## Configuração

* Copie o arquivo .env.sample para .env
* Configure o .env com os dados do banco de dados e e-mail

Para rodar os testes
```
$ npm test
```

Criação das migrations
```
$ db-migrate up --config config/database.json -e prod
```
## Configuração do Banco de Dados
* Caso use docker-compose
```
DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=mysql
DB_DATABASE=mysql
```

* Caso use banco local
```
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_DATABASE=telebox
```
