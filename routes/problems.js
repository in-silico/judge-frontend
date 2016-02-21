module.exports = function(app) {
  app.get('/problems', function(req, res) {
    res.render('index', {title : "UTPJudge"});
  });
}
