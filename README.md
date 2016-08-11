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

## Desenvolvimento

Instale o nodemon global e as dependências locais do projeto:

```
$ npm install -g nodemon
$ npm install
$ npm start
```

Para rodar os testes
```
$ npm test
```