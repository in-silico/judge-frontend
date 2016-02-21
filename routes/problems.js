var express = require('express');
var router = express.Router();

// Get list of all problems
module.exports = function(app, mountPoint) {
  router.get('/', function(req, res) {
    res.render('index', {title: "UTP problems"});
  });
  app.use(mountPoint, router);
}
