var ejs = require('ejs-mate');
var express = require('express');
var morgan = require('morgan');

var app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.engine('ejs', ejs);
app.use(morgan('combined'));

[
  'authorization',
  'synthetic',
].forEach(function(route) {
  var router = require('./' + route);
  router.locals.base = route;
  app.use('/' + route, router);
});

app.get('*', function(req, res) {
  res.redirect(301, 'https://github.com/jamesreggio/http-playground');
});

app.listen(app.get('port'), function() {
  console.log('http-playground is running on port', app.get('port'));
});
