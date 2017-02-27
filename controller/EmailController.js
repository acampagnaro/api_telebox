var EmailsModel = require('../model/EmailsModel');
var Promise     = require('bluebird');
var nodemailer  = require('nodemailer');
var validator   = require('validator');
var authEmail   = require('../config.js');
var async = require("async");
var mysql   = require('mysql');

require('dotenv').config();

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
    port     : process.env.DB_PORT
});

function EmailController(Model) {
  this.Model  = Promise.promisifyAll(Model);
}

var queryAsync = Promise.promisify(connection.query.bind(connection));
connection.connect();

EmailController.prototype.create = function(req, res) {
  var data = req.body;

  data.title = 'orcamento';
  //data.response = 'envio';

  if (data.email == '' || data.email == undefined){
    res.status(422);
    return res.json('E-mail inválido!');
    if (!validator.isEmail(data.email)){
      res.status(422);
      return res.json('E-mail inválido!');
    }
  }
  if (data.name == undefined || data.name == ''){
    res.status(422);
    return res.json('Nome Inválido!');
  }
  if (data.message == undefined){
    res.status(422);
    return res.json('Mensagem inválida!');
  }

  var transporte = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  var email = {
    from: 'teleboxcuritiba@hotmail.com', // Quem enviou este e-mail
    to: data.email,                      // Quem receberá
    subject: data.title,                 // Assunto :-)
    html: data.mensage                   // O conteúdo
  };

  // transporte.sendMail(email, function(err, info){
  //   if(err)
  //     throw err; // Oops, algo de errado aconteceu.
  //   console.log('Email enviado! Leia as informações adicionais: ', info);
  //   data.response = info;
  //   wait = true;
  // });

  async.whilst(function () {
    console.log(data.response);
    return data.response != 'undefined';
  },
  function (next) {
    transporte.sendMail(email, function(err, info){
      if(err)
        throw err; // Oops, algo de errado aconteceu.
      console.log('Email enviado! Leia as informações adicionais: ', info);
      data.response = info;
    });


  },
  function (err) {
    // All things are done!
  });

  this.Model.createAsync(data)
      .then(function(result) {
        res.status(200);
        res.json(result);
      })
      .catch(function(err) {
        console.log(err)
      });

};

EmailController.prototype.findAll = function(req, res) {
  var data = req.body;

    console.log(req.query.page);

    var numRows;
    var queryPagination;
    var numPerPage = parseInt(req.query.npp, 10) || 2;
    var page = parseInt(req.query.page, 10) || 0;
    var numPages;
    var skip = page * numPerPage;
    // Here we compute the LIMIT parameter for MySQL query
    //var limit = skip + ',' + skip + numPerPage;
    var limit = page + ',' + numPerPage;
    queryAsync('SELECT count(*) as numRows FROM emails')
        .then(function(results) {
            numRows = results[0][0].numRows;
            numPages = Math.ceil(numRows / numPerPage);
        })
        .then(() => queryAsync('SELECT * FROM emails ORDER BY ID LIMIT ' + limit))
    .then(function(results) {
        var responsePayload = {
            results: results
        };
        if (page < numPages) {
            responsePayload.pagination = {
                current: page,
                perPage: numPerPage,
                previous: page > 0 ? page - 1 : undefined,
                next: page < numPages - 1 ? page + 1 : undefined,
                totalPages: numPages
            }
        }
        else responsePayload.pagination = {
            err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
        }
        res.json(responsePayload);
    })
        .catch(function(err) {
            console.error(err);
            res.json({ err: err });
        });


  /*
  this.Model.findAllAsync()
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
      console.log(err)
    });
  */
};

module.exports = new EmailController(EmailsModel);
