var express = require('express');
var router  = express.Router();

module.exports = function(app) {
  router.get('/contests', function(req, res) {
    res.render('index', {title : "UTPJudge"});
  });

  router.get('/contests/new', function(req, res) {
    res.render('index', {title : "UTPJudge"});
  });

  app.use(mountPoint, router);
}
