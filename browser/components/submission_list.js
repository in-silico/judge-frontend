var React = require('react');
var utils = require('../utils');

var Submission = React.createClass({
  getInitialState: function () {
    return ({problemTitle: '', contestTitle: ''});
  },
  onGetProblem: function (err, res) {
    if (err)
      console.log('Oh no!, error');
    else
      this.setState({problemTitle: JSON.parse(res.text).title});
  },
  onGetContest: function (err, res) {
    if (err)
      console.log('Oh no!, error');
    else
      this.setState({contestTitle: JSON.parse(res.text).title});
  },
  componentDidMount: function () {
    utils.getResourceFromServer(this.props.url, 'problems/' + this.props.pid,
      this.onGetProblem);
    utils.getResourceFromServer(this.props.url, 'contests/' + this.props.cid,
      this.onGetContest);
  },
  render: function () {
    return(
      <tr className="submission">
        <td>{this.state.contestTitle}</td>
        <td>{this.state.problemTitle}</td>
        <td>{this.props.status}</td>
      </tr>
    );
  }
});

module.exports = React.createClass({
  getInitialState: function () {
    return {submissions: []};
  },
  onGetSubmissions: function (err, res) {
    if (err){
      console.log('Oh no!, error');
    } else {
      this.setState({submissions: JSON.parse(res.text)});
    }
  },
  componentDidMount: function () {
    utils.getResourceFromServer(this.props.url, 'submissions',
      this.onGetSubmissions);
  },
  render: function () {
    var allSubmissions = this.state.submissions.map(function (item, index) {
      return (
        <Submission
          id={item._id}
          pid={item.problem_id}
          cid={item.contest_id}
          status={item.status}
          url={this.props.url}
          key={item._id}>
        </Submission>
      );
    }.bind(this));

    return (
      <div className="submissions">
        <table>
          <tbody>
            {allSubmissions}
          </tbody>
        </table>
      </div>
    );
  }
});
