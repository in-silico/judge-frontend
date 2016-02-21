var express = require('express');
var router = express.Router();
var problemsFile = require('../json/problems.json');
var usersFile = require('../json/users.json');

module.exports = function(app, mountPoint) {
  router.get('/problems', function(req, res) {
    res.json(problemsFile);
  });
  router.get('/users', function(req, res) {
    res.json(usersFile);
  });
  app.use(mountPoint, router);
}
