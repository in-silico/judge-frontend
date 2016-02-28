var express = require('express');
var router = express.Router();
var request = require('request');

module.exports = function(app, mountPoint, passport) {

  router.get('/auth/github', passport.authenticate('github'));

  router.get('/login', function(req, res){
    res.render('login');
  });

  app.use(mountPoint, router)
}
