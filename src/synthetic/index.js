var express = require('express');

var app = express();
app.set('etag', false);
app.set('views', __dirname);

// Loading delays.
var SLOW_GIF_DELAY = 5000;
var SPLIT_DOCUMENT_DELAY = 500;

// Categories of HTTP status codes.
var TERMINALS = [
  200, 204,
  400, 401, 403, 404,
  500, 501, 502, 503, 504,
];
var REDIRECTS = [
  301, 302, 303, 307, 308,
];

var render = {
  index: function(res, status, error) {
    res.status(status).render('index', {
      title: 'Synthetic response generator',
      error: error,
    });
  },

  terminal: function(res, status) {
    app.render('terminal', {
      title: 'Synthetic ' + status,
      status: status,
    }, function(err, html) {
      var parts = html.split('<!-- SPLIT -->');
      res.status(status);
      parts.forEach(function(part, i) {
        setTimeout(res.write.bind(res, part), i * SPLIT_DOCUMENT_DELAY);
      });
      setTimeout(res.end.bind(res), parts.length * SPLIT_DOCUMENT_DELAY);
    });
  },
};

app.get('/', function(req, res) {
  render.index(res, 200);
});

app.get('/slow.gif', function(req, res) {
  setTimeout(function() {
    res.status(204).send();
  }, SLOW_GIF_DELAY);
});

app.get('*', function(req, res) {
  var parts = req.path.substr(1).split('/');
  var next = parseInt(parts.shift(), 10);
  var wait = parseInt(req.query.wait, 10);
  var fn = null;

  if (TERMINALS.indexOf(next) !== -1) {
    fn = render.terminal.bind(render, res, next);
  } else if (REDIRECTS.indexOf(next) !== -1) {
    fn = function() { // jscs:ignore requireFunctionDeclarations
      var url = [req.baseUrl].concat(parts).join('/');
      url += isNaN(wait) ? '' : ('?wait=' + wait);
      res.redirect(next, url);
    };
  } else {
    fn = render.index.bind(render, res, 400, true);
  }

  setTimeout(fn, wait || 0);
});

module.exports = app;
