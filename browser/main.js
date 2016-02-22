var ReactDOM = require('react-dom');
var React = require('react');
var page = require('page');
var ContestForm = require('./components/contest_form.js');
var ContestList = require('./components/contest_list.js');
var ProblemList = require('./components/problem_list.js');
var Problem = require('./components/problem.js');
var Contest = require('./components/contest.js');
window.backendAddress = 'http://127.0.0.1:8080/'

page('/contests/new', function () {
  document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
      <ContestForm url={window.backendAddress} />,
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

page('/problem', function () {
  document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
      <Problem />,
      document.getElementById('container')
    );
  });
});

page('/contests/:id', function (ctx) {
  document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
      <Contest url={window.backendAddress} id={ctx.params.id} />,
      document.getElementById('container')
    );
  });
});

page({ dispatch: true});
