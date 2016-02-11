var ReactDOM = require('react-dom');
var React = require('react');
var page = require('page');
var ContestForm = require('./components/contest_form.js');
var ContestList = require('./components/contest_list.js');
window.backendAddress = 'http://127.0.0.1:8080/'

page('/create_contest', function () {
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
page({ dispatch: true});
