var express = require('express');
var router = express.Router();

module.exports = function(app, mountPoint) {
  router.post('/new', function(req, res) {
    res.send("Registro Exitoso :D!!");
  });
  router.get('/new', function(req, res) {
    res.render('index', {title: "UTP Judge"});
  });
  router.get('/all', function(req, res) {
    res.render('index', {title: "UTP Users"});
  });
  app.use(mountPoint, router);
}
