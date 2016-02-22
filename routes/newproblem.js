module.exports = function(app) {
  app.get('/newproblem', function(req, res) {
    res.render('index', {title : "UTPJudge"});
  });
}
