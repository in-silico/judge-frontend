var React = require('react');
var utils = require('../utils.js');

var UserElement = React.createClass({
  getInitialState: function() {
    return ({ user: this.props.user});
  },
  render: function() {
    var keys = Object.keys(this.state.user);
    var user = keys.map((item) => {
      return <td>{this.state.user[item]}</td>;
    });
    return <tr>{user}</tr>;
  }
});

module.exports = React.createClass ({
  getInitialState: function() {
    return ({ users: [] });
  },
  onGetUsers: function(err, res) {
    if (err)
      return console.log('Oh no! error');
    this.setState({users: res.body});
  },
  componentDidMount: function() {
    utils.getResourceFromServer(this.props.url, 'users/', this.onGetUsers);
  },
  render: function() {
    var keys = ["username", "email", "name"];
    var headers = keys.map((title) => {
      title = title[0].toUpperCase() + title.slice(1);
      return <th>{title}</th>
    });

    var elements = this.state.users.map((item) => {
      return <UserElement user={item}/>;
    });

    return (
      <table>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{elements}</tbody>
      </table>
    );
  }
});
