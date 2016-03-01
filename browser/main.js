var ReactDOM = require('react-dom');
var React = require('react');
var page = require('page');
var Contest = require('./components/contest.js');
var ContestForm = require('./components/contest_form.js');
var ContestList = require('./components/contest_list.js');
var Problem = require('./components/problem.js');
var ProblemForm = require('./components/problem_form.js');
var ProblemList = require('./components/problem_list.js');
var Users = require('./components/users.js');
var Register = require('./components/user_form.js');
var Problems = require('./components/problems.js');
var submission = require('./components/submission.js')
var SubmissionForm = require('./components/submission_form.js');
var SubmissionList = require('./components/submission_list.js');
var TestAuth = require('./components/test_auth.js');

var config = require('../config/development.js');
window.backendAddress = config.backend.url;

page('/contests/new', function() {
  ReactDOM.render(
    <ContestForm url={window.backendAddress} />,
    document.getElementById('container')
  );
});

page('/contests/:id', function (ctx) {
  ReactDOM.render(
    <Contest url={window.backendAddress} id={ctx.params.id} />,
    document.getElementById('container')
  );
});

page('/contests', function () {
  ReactDOM.render(
    <ContestList url={window.backendAddress} />,
    document.getElementById('container')
  );
});

page("/users/new", function() {
  ReactDOM.render(
    <Register url={window.backendAddress}/>,
    document.getElementById('container')
  );
});

page("/users", function() {
  ReactDOM.render(
    <Users url={window.backendAddress}/>,
    document.getElementById('container')
  );
});

page('/problems/new', function () {
  ReactDOM.render(
    <ProblemForm url={window.backendAddress} />,
    document.getElementById('container')
  );
});

page('/problems/:id', function (ctx) {
  ReactDOM.render(
    <Problem url={window.backendAddress} id={ctx.params.id} />,
    document.getElementById('container')
  );
});

page('/problems', function () {
  ReactDOM.render(
    <ProblemList url={window.backendAddress} />,
    document.getElementById('container')
  );
});

page('/submissions/new/:contest_id/:problem_id', function (ctx) {
  ReactDOM.render(
    <SubmissionForm url={window.backendAddress}  contest_id={ctx.params.contest_id} problem_id={ctx.params.problem_id}  />,
    document.getElementById('container')
  );
});

page('/submissions', function () {
  ReactDOM.render(
    <SubmissionList url={window.backendAddress} />,
    document.getElementById('container')
  );
});


ReactDOM.render(
  <TestAuth url={window.backendAddress} />,
  document.getElementById('testAuth')
);


page({ dispatch: true});
