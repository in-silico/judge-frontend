var React = require('react');
var utils = require('../utils.js');

var UserElement = React.createClass({
  getInitialState: function() {
    return ({user: this.props.user, keys: this.props.keys});
  },
  render: function() {
    var keys = this.state.keys;
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
    var keys = ["username", "name", "email"];
    var headers = keys.map((title) => {
      title = title[0].toUpperCase() + title.slice(1);
      return <th>{title}</th>
    });

    var elements = this.state.users.map((item) => {
      return <UserElement user={item} keys={keys}/>;
    });

    return (
      <div className='userList'>
        <div className='row'>
          <h1>Users List</h1>
        </div>
        <br />
        <div className='row center'>
          <table>
            <thead>
              <th><h3>Username</h3></th>
              <th><h3>Name</h3></th>
              <th><h3>Email</h3></th>
            </thead>
            <tbody>{elements}</tbody>
          </table>
        </div>
      </div>
    );
  }
});
