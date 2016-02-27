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

window.backendAddress = 'http://127.0.0.1:8080/'; // Change 3000 for 8080 when running the backend simultaneously

page('/contests/new', function() {
  //document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
      <ContestForm url={window.backendAddress} />,
      document.getElementById('container')
    );
  //});
});

page('/contests/:id', function (ctx) {
//  document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
      <Contest url={window.backendAddress} id={ctx.params.id} />,
      document.getElementById('container')
    );
//  });
});

page('/contests', function () {
//  document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
      <ContestList url={window.backendAddress} />,
      document.getElementById('container')
    );
  //});
});

page("/users/new", function() {
  //document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
      <Register url={window.backendAddress}/>,
      document.getElementById('container')
    );
  //});
});

page("/users", function() {
  //document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
      <Users url={window.backendAddress}/>,
      document.getElementById('container')
    );
  //});
});

page('/problems/new', function () {
  //document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
      <ProblemForm url={window.backendAddress} />,
      document.getElementById('container')
    );
  //});
});

page('/problems/:id', function (ctx) {
  //document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
      <Problem url={window.backendAddress} id={ctx.params.id} />,
      document.getElementById('container')
    );
  //});
});

page('/problems', function () {
  //document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
      <ProblemList url={window.backendAddress} />,
      document.getElementById('container')
    );
  //});
});

page('/submissions/new/:contest_id/:problem_id', function (ctx) {
  //document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
      <SubmissionForm url={window.backendAddress}  contest_id={ctx.params.contest_id} problem_id={ctx.params.problem_id}  />,
      document.getElementById('container')
    );
  //});
});

page('/submissions', function () {
  //document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
      <SubmissionList url={window.backendAddress} />,
      document.getElementById('container')
    );
  //});
});

page({ dispatch: true});
