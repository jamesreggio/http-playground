var ejs = require('ejs-mate');
var express = require('express');

var app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.engine('ejs', ejs);

['synthetic'].forEach(function(route) {
  var router = require('./' + route);
  router.locals.base = route;
  app.use('/' + route, router);
});

app.listen(app.get('port'), function() {
  console.log('http-playground is running on port', app.get('port'));
});
