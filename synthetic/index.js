var express = require('express');

var app = express();
app.set('etag', false);
app.set('views', __dirname);

// Default time to wait before a redirect
var DEFAULT_WAIT = 5000;

// Categories of HTTP status codes
var TERMINALS = [200, 204,
                 400, 401, 403, 404,
                 500, 501, 502, 503, 504];
var REDIRECTS = [301, 302, 303, 307, 308];

var render = {
  index: function(res, status, error) {
    res.status(status).render('index', {
      title: 'Synthetic response generator',
      error: error,
    });
  },

  terminal: function(res, status) {
    res.status(status).render('terminal', {
      title: 'Synthetic ' + status,
      status: status,
    });
  },
};

app.get('/', function(req, res) {
  render.index(res, 200);
});

app.get('*', function(req, res) {
  var parts = req.path.substr(1).split('/');
  var next = parseInt(parts.shift(), 10);
  var wait = parseInt(req.query.wait, 10);

  if (TERMINALS.indexOf(next) !== -1) {
    render.terminal(res, next);
  } else if (REDIRECTS.indexOf(next) !== -1) {
    setTimeout(function() {
      var url = [req.baseUrl].concat(parts).join('/');
      url += isNaN(wait) ? '' : ('?wait=' + wait);
      res.redirect(next, url);
    }, isNaN(wait) ? DEFAULT_WAIT : wait);
  } else {
    render.index(res, 400, true);
  }
});

module.exports = app;
