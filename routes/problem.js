module.exports = function(app) {
  app.get('/problem', function(req, res) {
    res.render('index', {title : "UTPJudge"});
  });
}
