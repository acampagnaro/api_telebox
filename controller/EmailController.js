var EmailsModel = require('../model/EmailsModel');
var Promise     = require('bluebird');
var nodemailer  = require('nodemailer');
var validator   = require('validator');
var authEmail   = require('../config.js');

function EmailController(Model) {
  this.Model = Promise.promisifyAll(Model);
}

function validation(data){
  if (!validator.isEmail(data.email)){
    return false;
  }
  return true;
}

EmailController.prototype.create = function(req, res) {
  var data = req.body;

  if (validation(data) == false) {
    return 'Dados inválidos!';
  }

  var transporte = nodemailer.createTransport({
    service: authEmail.email.service,
    auth: {
      user: authEmail.email.email,
      pass: authEmail.email.password
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

  // });

  this.Model.createAsync(data)
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        console.log(err)
      });

};

module.exports = new EmailController(EmailsModel);
