var express = require('express');
var router = express.Router();

module.exports = function (app, mountPoint) {
  router.post('/', function (req, res) {
    res.render('index');
  });
  router.get('/new', function (req, res) {
    res.render('index', {title: 'UTP Judge'});
  });
  router.get('/', function (req, res) {
    res.render('index', {title: 'UTP Users'});
  });
  app.use(mountPoint, router);
};
