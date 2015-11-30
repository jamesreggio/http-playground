var express = require('express');

var app = express();
app.set('etag', false);
app.set('views', __dirname);

function render(view) {
  return function(req, res) {
    res.render(view, {
      title: 'Crashing browser bugs',
    });
  };
}

[
  'bigImages',
  'outOfMemory',
  'scaledGifs',
].forEach(function(view) {
  app.get('/' + view, render(view));
});

app.get('/', render('index'));

app.get('*', function(req, res) {
  res.redirect(301, req.baseUrl);
});

module.exports = app;
