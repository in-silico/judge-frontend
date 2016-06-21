var React = require('react');

module.exports = React.createClass({
  logout: function () {
    window.localStorage.removeItem('token');
    window.location.pathname = '/';
  },
  render: function () {
    var token = window.localStorage.getItem('token');
    if (token) {
      return (
        <div>
          Hello you.
          <button
            onClick={this.logout}>
            log out
          </button>
        </div>
      );
    } else {
      return (
        <a href='/login'>log in</a>
      );
    }
  }
});
