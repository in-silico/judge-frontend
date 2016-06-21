var React = require('react');
var utils = require('../server-utils.js');

module.exports = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired
  },
  getInitialState: function () {
    return {
      username: '',
      password: '',
      alertmsg: ''
    };
  },
  handleUserChange: function (ev) {
    this.setState({username: ev.target.value});
  },
  handlePasswdChange: function (ev) {
    this.setState({password: ev.target.value});
  },
  receiveToken: function (err, res) {
    if (err || !res.body.success) {
      return this.setState({
        alertmsg: 'Login Failed!'
      });
    }
    window.localStorage.token = res.body.token;
    this.setState({alertmsg: 'Logged in'});
    window.location.pathname = '/';
  },
  login: function (ev) {
    ev.preventDefault();
    var username = this.state.username.trim();
    var password = this.state.password.trim();
    if (!username || !password) return;
    utils.postData(
      this.props.url + 'auth/jwt',
      {username: username, password: password},
      this.receiveToken
    );
  },

  render: function () {
    return (
      <div>
        <p>{this.state.alertmsg}</p>
        <form>
          <input type='text' placeholder='username'
            value={this.state.username}
            onChange={this.handleUserChange}
          />
          <input type='password'
            value={this.state.password}
            onChange={this.handlePasswdChange}
          />
          <button onClick={this.login}> log in </button>
        </form>
      </div>
    );
  }
});
