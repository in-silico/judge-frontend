var React = require('react');
var ReactDOM = require('react-dom');

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('example')
  );

  ReactDOM.render(<p> One more test </p>, document.getElementById('test'));
});
