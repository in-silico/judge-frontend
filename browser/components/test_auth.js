var React = require('react');
var utils = require('../utils');

module.exports = React.createClass({
  getInitialState: function () {
    return {user: null};
  },

  onGetUser: function (err, res) {
    if (err) {
      console.log('Oh no! error: ' + err);
    } else {
      this.setState({user: res.body});
    }
  },

  componentDidMount: function () {
    utils.getResourceFromServer(this.props.url, 'auth', this.onGetUser);
  },

  render: function () {
    var auth;
    if (this.state.user) {
      auth = <p>{'Hello ' + this.state.user.login + ' !'}</p>;
    } else {
      auth = <a href='/login'> login </a>;
    }
    return (
      <div className='Auth'>
        {auth}
      </div>
    );
  }
});
