var EmailsModel = require('../model/EmailsModel');
var Promise     = require('bluebird');
var nodemailer  = require('nodemailer');
var validator   = require('validator');
var authEmail   = require('../config.js');

function EmailController(Model) {
  this.Model = Promise.promisifyAll(Model);
}

function validation(data){
  if (data.email == '' || data.email == undefined){
    return false;
    if (!validator.isEmail(data.email)){
      return false;
    }
  }
  if (data.name == undefined || data.name == ''){
    return false;
  }
  if (data.message == undefined){
    return false;
  }
  return true;
}

EmailController.prototype.create = function(req, res) {
  var data = req.body;

  data.response = 'envio';

  if (validation(data) == false) {
    res.status(422);
    return res.json('aaaaaaaaaww333');
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
