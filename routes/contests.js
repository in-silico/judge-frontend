var express = require('express');
var router  = express.Router();

module.exports = function(app, mountPoint) {
  router.get('/:id', function (req, res) {
    res.render('index', {title : "UTPJudge"});
  });

  router.get('/:cid/:id', function (req, res) {
    res.render('index', {title : "UTPJudge"});
  });

  router.get('/', function(req, res) {
    res.render('index', {title : "UTPJudge", user: req.user});
  });

  router.get('/new', function(req, res) {
    res.render('index', {title : "UTPJudge", user: req.user});
  });

  app.use(mountPoint, router);
}
