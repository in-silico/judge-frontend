module.exports = function(app) {
  app.get('/create_contest', function(req, res) {
    res.render('index', {title : "UTPJudge"});
  });
}
