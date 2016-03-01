var React = require('react');
var utils = require('../utils.js');

var ContestProblem = React.createClass({
  getInitialState: function () {
    return ({title: '', author: ''});
  },
  onGetProblem: function (err, res) {
    if (err){
      console.log('Oh no!, error');
    } else {
      var parsedJSON = res.body;
      this.setState({title: parsedJSON.title, author: parsedJSON.author});
    }
  },
  componentDidMount: function () {
    utils.getResourceFromServer(this.props.url, 'problems/' + this.props.id,
      this.onGetProblem);
  },
  render: function () {
    return (
      <tr className='contestProblem'>
        <td><a href={'/contests/' + this.props.cid + '/' + this.props.id}>
          {this.state.title}
        </a></td>
        <td>{this.state.author}</td>
      </tr>
    );
  }
});

module.exports = React.createClass({
  //Initial State and mounting
  getInitialState: function () {
    return {title: '', description: '', id:'', problems: []};
  },
  onGetContest: function (err, res) {
    if (err){
      console.log('Oh no!, error');
    } else {
      var parsedJSON = res.body;
      console.log(JSON.stringify(parsedJSON.problems));
      this.setState({
        title: parsedJSON.title,
        description: parsedJSON.description,
        id: parsedJSON._id,
        problems: parsedJSON.problems
      });
    }
  },
  componentDidMount: function () {
    utils.getResourceFromServer(this.props.url, 'contests/' + this.props.id,
      this.onGetContest);
  },
  render: function () {
    var contestProblems = this.state.problems.map(function (item, index) {
      return (
        <ContestProblem
          key={item.problem_id}
          id={item.problem_id}
          cid={this.state.id}
          url={this.props.url}>
        </ContestProblem>
      );
    }.bind(this));
    return(
      <div className='contest'>
        <h2>{this.state.title}</h2>
        <p>{this.state.description}</p>
        <h4>Problems</h4>
        <table>
          <tbody>
            {contestProblems}
          </tbody>
        </table>
      </div>
    );
  }
});
