var express = require('express');
var router = express.Router();

module.exports = function (app, mountPoint) {
  router.get('/', function (req, res) {
    res.render('index', {title: 'UTPJudge'});
  });

  router.get('/new/:contest_id/:problem_id', function (req, res) {
    res.render('index', {title: 'UTPJudge'});
  });

  app.use(mountPoint, router);
};
