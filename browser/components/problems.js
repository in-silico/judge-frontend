var React = require('react');
var utils = require('../utils.js');

var ProblemElement = React.createClass({
  getInitialState: function() {
    var problem = this.props.item;
    return ({
      id: problem.id,
      title: problem.title,
      tags=[],
      state=false,
      solvedBy=0
    });
  },
  render: function() {
    return (
      <tr className="judgeProblem">
        <td>{this.state.id}</td>
        <td><a href='/problems/' + this.state.id>
          {this.state.title}
        </a></td>
      </tr>
    )
  }
});

module.exports = React.createClass({
  getInitialProps: function() {
    return ({page: 1});
  },
  getInitialState: function() {
    return ({problems: [], page: this.props.page, perPage: 25});
  },
  onGetProblems: function(err, res) {
    if (err) throw err;
    this.state({problems: JSON.parse(res.text)})
  },
  componentDidMount: function() {
    utils.getResourceFromServer(this.props.url, 'problems/', this.onGetProblems);
  },
  render: function() {
    var i = this.state.page * this.state.perPage;
    var problems =  this.state.problems
                    .slice(i, (i + this.state.perPage) % this.state.problems.length)
                    .map((item) => {
                      return <ProblemElement problem={item} />
                    });
    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {problems}
        </tbody>
      </table>
    );
  }
})
