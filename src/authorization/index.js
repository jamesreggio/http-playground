var express = require('express');

var app = express();
app.set('etag', false);
app.set('views', __dirname);

var REDIRECTS = [301, 302, 303, 307, 308];

var render = {
  index: function(res, status) {
    res.status(status).render('index', {
      title: 'Redirect Authorization headers',
    });
  },
};

app.get('/', function(req, res) {
  render.index(res, 200);
});

app.all('/initial', function(req, res) {
  var status = parseInt(req.status, 10);
  if (REDIRECTS.indexOf(status) === -1) {
    status = 301;
  }
  res.redirect(status, req.baseUrl + '/redirected');
});

app.get('/redirected', function(req, res) {
  res.send({
    Authorization: req.get('Authorization'),
  });
});

app.get('*', function(req, res) {
  res.redirect(301, req.baseUrl);
});

module.exports = app;
