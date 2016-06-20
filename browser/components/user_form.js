var React = require('react');
var utils = require('../utils.js');

module.exports = React.createClass({
  getInitialState: function () {
    return {username: '', name: '', email: '', password: '', cpassword: ''};
  },

  // Handlers
  handleUsernameChange: function (e) {
    this.setState({username: e.target.value});
  },

  handleNameChange: function (e) {
    this.setState({name: e.target.value});
  },

  handleEmailChange: function (e) {
    this.setState({email: e.target.value});
  },

  handlePasswordChange: function (e) {
    this.setState({password: e.target.value});
  },

  handleConfirmPasswordChange: function (e) {
    this.setState({cpassword: e.target.value});
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var username = this.state.username.trim();
    var name = this.state.name.trim();
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    var cpassword = this.state.cpassword.trim();
    if (!username || !name || !email || !password || !cpassword) {
      return;
    }
    utils.postToServer(this.props.url, 'users', {
      username: username,
      name: name,
      email: email
    // password: password,
    // cpassword: cpassword
    }, this.onUserSubmit);
  },

  onUserSubmit: function (err, res) {
    if (err || !res.ok) {
      console.log('Oh no! error');
    } else {
      window.location.pathname = '/users';
      console.log('yay got ' + JSON.stringify(res.body));
    }
  },

  render: function () {
    return (
      <div className='userForm' onSubmit={this.handleSubmit}>
        <h1>Register in UTPJudge</h1>
        <br />
        <form>
          <label htmlFor='name'>
            <i className='material-icons'>face</i> Full Name
          </label>
          <input
            type='input'
            name='name'
            value={this.state.name}
            id='name'
            onChange={this.handleNameChange}>
          </input>
          <br />
          <br />
          <label htmlFor='username'>
            <i className='material-icons'>perm_identity</i> Username
          </label>
          <input
            type='input'
            name='username'
            value={this.state.username}
            id='username'
            onChange={this.handleUsernameChange}>
          </input>
          <br />
          <br />
          <label htmlFor='email'>
            <i className='material-icons'>mail_outline</i> Email
          </label>
          <input
            type='input'
            name='email'
            value={this.state.email}
            id='email'
            onChange={this.handleEmailChange}>
          </input>
          <br />
          <br />
          <label htmlFor='pwd'>
            <i className='material-icons'>lock_outline</i> Password
          </label>
          <input
            type='password'
            name='pwd'
            value={this.state.password}
            id='pwd'
            onChange={this.handlePasswordChange}>
          </input>
          <br />
          <br />
          <label htmlFor='cpwd'>
            Confirm Password
          </label>
          <input
            type='password'
            name='cpwd'
            value={this.state.cpassword}
            id='cpwd'
            onChange={this.handleConfirmPasswordChange}>
          </input>
          <br />
          <br />
          <button type='submit' value='Register'>
            Register
          </button>
        </form>
      </div>
    );
  }
});
