var React = require('react');
var superagent = require('superagent');

var Contest = React.createClass({
  render: function () {
    return (
      <tr className="contest">
        <td>{this.props.title}</td>
        <td>{this.props.description}</td>
      </tr>

    );
  }
});

module.exports = React.createClass({
  //Initial State, Mounting
  getInitialState: function () {
    return {contests: []};
  },
  getContestsFromServer: function () {
    superagent
      .get(this.props.url + 'contests')
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err)
          console.log('Oh no! error');
        else
          this.setState({contests: JSON.parse(res.text)});
      }.bind(this));
  },
  componentDidMount: function () {
    this.getContestsFromServer();
  },
  render: function () {
    var allContests = this.state.contests.map(function (item) {
      return (
        <Contest
          title={item.title}
          description={item.description}
          key={item._id}>
        </Contest>
      );
    });
    return (
      <div className='contestList'>
        <table>
          {allContests}
        </table>
      </div>
    );
  }
});
