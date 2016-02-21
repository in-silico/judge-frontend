var ReactDOM = require('react-dom');
var React = require('react');
var page = require('page');
var ContestForm = require('./components/contest_form.js');
var ContestList = require('./components/contest_list.js');
var Users = require('./components/users');
var Problems = require('./components/problems');
var Register = require('./components/register_user');
window.backendAddress = 'http://127.0.0.1:8080/'

page('/contests/new', () => {
  document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
      <ContestForm url={window.backendAddress} />,
      document.getElementById('container')
    );
  });
});

page('/contests', () => {
  document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
      <ContestList url={window.backendAddress} />,
      document.getElementById('container')
    );
  });
});

page("/problems", () => {
  document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
      <Problems url={window.backendAddress}/>,
      document.getElementById('container')
    );
  });
});

page("/users/new", () => {
  document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
      <Register url={window.backendAddress}/>,
      document.getElementById('container')
    );
  });
});

page("/users/all", () => {
  document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
      <Users url={window.backendAddress}/>,
      document.getElementById('container')
    );
  });
});

page({ dispatch: true});
