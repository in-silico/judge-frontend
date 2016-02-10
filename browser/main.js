var React = require('react');
var ReactDOM = require('react-dom');
var ContestForm = require('./components/contest_form.js');
window.backendAddress = 'http://127.0.0.1:8080/'

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <ContestForm url={window.backendAddress} />,
    document.getElementById('example')
  );
});
