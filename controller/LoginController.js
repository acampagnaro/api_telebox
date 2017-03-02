var EmailsModel = require('../model/EmailsModel');
var Promise     = require('bluebird');
var nodemailer  = require('nodemailer');
var validator   = require('validator');
var authEmail   = require('../config.js');
var async = require("async");
var mysql   = require('mysql');

require('dotenv').config();

function LoginController(Model) {
  this.Model  = Promise.promisifyAll(Model);
}

LoginController.prototype.authentication = function(req, res) {
  var data = req.body;
  res.status(200);
  res.json({'result': 'success'});
};

module.exports = new LoginController(EmailsModel);
