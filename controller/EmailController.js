var EmailsModel = require('../model/EmailsModel');
var Promise     = require('bluebird');
var nodemailer  = require('nodemailer');
var validator   = require('validator');
var authEmail   = require('../config.js');
require('dotenv').config();
var async = require("async");

function EmailController(Model) {
  this.Model  = Promise.promisifyAll(Model);
}

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

  var todo = [];

  this.Model.findAllAsync()
    .then(function(result) {
      todo.push(result);
      res.json(result);
    })
    .catch(function(err) {
      console.log(err)
    });
    console.log(todo);
};

module.exports = new EmailController(EmailsModel);
