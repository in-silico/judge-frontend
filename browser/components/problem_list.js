var React = require('react');
var superagent = require('superagent');

var Problem = React.createClass({
  render: function () {
    return (
      <tr className="problem">
        <td>{this.props.title}</td>
        <td>{this.props.description}</td>
      </tr>
    );
  }
});

module.exports = React.createClass({
  //Initial State and mounting
  getInitialState: function () {
    return ({problems: [], contests:[], selProblems: [], selContest: ''});
  },
  getProblemsFromServer: function () {
    superagent
      .get(this.props.url + 'problems')
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err)
          console.log('Oh no! error');
        else
          this.setState({problems: JSON.parse(res.text)});
      }.bind(this));
  },
  getContestsFromServer: function () {
    superagent
      .get(this.props.url + 'contests')
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err){
          console.log('Oh no! error');
        } else{
          var parsedJSON = JSON.parse(res);
          var contestTitles = [];
          parsedJSON.forEach(function (item) {
            contestTitles.push(item.title);
          });
          this.setState({contests: contestTitles});
        }
      }.bind(this));
  },
  componentDidMount: function () {
    this.getProblemsFromServer();
    this.getContestsFromServer();
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var problemsToAdd = this.state.selProblems;
    var contestToAddTo = this.selContest;
    if (!contestToAddTo || !problemsToAdd)
      return;
    this.onProblemsAddSubmit({
      problems: problemsToAdd,
      contest: contestToAddTo
    });
    this.setState({selProblems: [], selContest: ''});
  },
  problemCheck: function () {
    var problemArray = this.state.selProblems;
    var pr_index;
    var problem = problemArray.find(function (item, index) {
      if(item.problem_id == id){
        pr_index = index;
        return item;
      }
    });
    if (problem){
      problemArray.splice(pr_index, 1);
      console.log(JSON.stringify(this.state.selProblems));
    } else{
      problemArray.push({problem_id: id});
      this.setState({selProblems: problemArray});
      console.log(JSON.stringify(this.state.selProblems));
    }
  },
  render: function () {
    var allProblems = this.state.problems.map(function (item) {
      return (
        <Problem
          title={item.title}
          description={item.description}
          key={item._id}>
        </Problem>
      );
    })
    return (
      <div className="problemList">
        <table>
          {allProblems}
        </table>
      </div>
    );
  }

});
