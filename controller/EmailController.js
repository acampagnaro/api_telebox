var EmailsModel = require('../model/EmailsModel');
var Promise     = require('bluebird');
var nodemailer  = require('nodemailer');
var validator   = require('validator');
var authEmail   = require('../config.js');
require('dotenv').config();

function EmailController(Model) {
  this.Model = Promise.promisifyAll(Model);
}

EmailController.prototype.create = function(req, res) {
  var data = req.body;

  data.title = 'orcamento';
  data.response = 'envio';

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

  transporte.sendMail(email, function(err, info){
    if(err)
      throw err; // Oops, algo de errado aconteceu.
    console.log('Email enviado! Leia as informações adicionais: ', info);
    //data.response = info;
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

  var total = 0;
  var per_page = 0;
  var current_page = 0;
  var last_page = 0;
  var from = 1;
  var to = 0;

  var getTrades = Promise.promisify(trader.getTrades, trader);

  this.Model.findAllAsync()
    .then(function(result) {
      console.log(result);
      res.json(result);
    })
    .catch(function(err) {
      console.log(err)
    });
};

function getAllTrades(limit, arr) {
    if (!arr) arr=[];
    return getTrades(limit, arr.length).then(function(results) {
         if (!results.length)
             return arr;
         else
             return getAllTrades(limit, arr.concat(results));
    });
}

module.exports = new EmailController(EmailsModel);
