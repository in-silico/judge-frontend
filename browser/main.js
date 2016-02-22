var ReactDOM = require('react-dom');
var React = require('react');
var page = require('page');
var ContestForm = require('./components/contest_form.js');
var ContestList = require('./components/contest_list.js');
var Users = require('./components/users');
var Problems = require('./components/problems');
var Register = require('./components/register_user');
var ProblemList = require('./components/problem_list.js');
var Problem = require('./components/problem.js');
var Contest = require('./components/contest.js');
var ProblemForm = require('./components/problem_form.js');
var Submission = require('./components/submission.js');

window.backendAddress = 'http://127.0.0.1:8080/'


page('/contests/new', () => {
  //document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
      <ContestForm url={window.backendAddress} />,
      document.getElementById('container')
    );
  //});
});

page('/contests/:id', function (ctx) {
  document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
      <Contest url={window.backendAddress} id={ctx.params.id} />,
      document.getElementById('container')
    );
  });
});

page('/contests', function () {
  document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
      <ContestList url={window.backendAddress} />,
      document.getElementById('container')
    );
//  });
});

// page("/problems", () => {
//  document.addEventListener('DOMContentLoaded', function() {
//     ReactDOM.render(
//       <Problems url={window.backendAddress}/>,
//       document.getElementById('container')
//     );
//   });
// });

page("/users/new", () => {
 document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
      <Register url={window.backendAddress}/>,
      document.getElementById('container')
    );
 });
});

page("/users", () => {
 document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
      <Users url={window.backendAddress}/>,
      document.getElementById('container')
    );
 });

page('/problems/new', function () {
  document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
      <ProblemForm url={window.backendAddress} />,
      document.getElementById('container')
    );
  });
});

page('/problems/:id', function (ctx) {
  document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
      <Problem url={window.backendAddress} id={ctx.params.id} />,
      document.getElementById('container')
    );
  });
});

page('/problems', function () {
  document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
      <ProblemList url={window.backendAddress} />,
      document.getElementById('container')
    );
  });
});

page('/submission/:contest_id/:problem_id', function (ctx) {
  document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
      <Submission url={window.backendAddress}  contest_id={ctx.params.contest_id} problem_id={ctx.params.problem_id}  />,
      document.getElementById('container')
    );
  });
});

page('/submission', function () {
  document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
      <Submission url={window.backendAddress} />,
      document.getElementById('container')
    );
  });
});

page({ dispatch: true});
