module.exports = function(app) {
  app.get('/contests', function(req, res) {
    res.render('index', {title : "UTPJudge"});
  });
}
