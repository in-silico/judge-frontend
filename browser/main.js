var React = require('react');
var ReactDOM = require('react-dom');
var page = require('page');
var Users = require('./components/users');
var Problems = require('./components/problems');
var Register = require('./components/register');
window.backendAddress = 'http://localhost:8080';

page("/problems", () => {
  //document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<Problems url={window.backendAddress}/>, document.getElementById('container'));
  //});
});

page("/users/new", () => {
  //document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<Register url={window.backendAddress}/>, document.getElementById('container'));
  //});
});

page("/users/all", () => {
//  document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<Users url={window.backendAddress}/>, document.getElementById('container'));
//  });
});

page({ dispatch: true});
