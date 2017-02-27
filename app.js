var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('./routes');
var paginate = require('express-paginate');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static('public/dest'));
app.use(express.static('public/upload'));

process.on('uncaughtException', function (err) {
  console.log(err);
})

//Sempre todas as confi antes de chamar as rotas se não, não vai funcionar
app.use('/', routes);

var server = app.listen(5000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('http://localhost', host, port);

});

module.exports = app;
