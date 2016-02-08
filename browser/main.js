var React = require('react');
var ReactDOM = require('react-dom');
var ContestForm = require('./components/contest_form.js');

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <ContestForm url='http://127.0.0.1:8080/contests' />,
    document.getElementById('example')
  );
});
