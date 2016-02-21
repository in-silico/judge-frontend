var React = require('react');
var superAgent = require('superagent');

class UserElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  render() {
    var keys = Object.keys(this.state.user);
    var user = keys.map((item) => {
      return <td>{this.state.user[item]}</td>;
    });
    return <tr>{user}</tr>;
  }
}

module.exports = class UsersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentWillMount() {
    superAgent
      .get(this.props.url + "/data/users")
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err)
          console.log('Oh no! error');
        else {
          this.setState({users: JSON.parse(res.text)});
          console.log(this.state.users);
        }
      });
    }

  render() {
    var keys = ["username", "email", "name" ];
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
}
