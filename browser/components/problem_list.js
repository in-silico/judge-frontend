var React = require('react');
var Dropdown = require('./dropdown.js');
var utils = require('../utils.js');

var Problem = React.createClass({
  handleCheck: function () {
    this.props.problemCheck(this.props.id);
  },
  handleClick: function (e) {
    if (e.button == 0)
      window.location.pathname = 'problems/' + this.props.id;
  },
  render: function () {
    return (
      <tr className="problem">
        <td><a href={'/problems/' + this.props.id} onClick={this.handleClick}>{this.props.title}</ a></td>
        <td>{this.props.author}</td>
        <td>Add<input type="checkbox"
          onChange={this.handleCheck}>
        </input></td>
      </tr>
    );
  }
});

var AddProblemsForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    this.props.handleSubmit();
  },
  render: function () {
    return (
      <div className="addProblemsForm" onSubmit={this.handleSubmit}>
        <form>
          <Dropdown
            list={this.props.list}
            dropdownChange={this.props.dropdownChange}>
          </Dropdown>
          <input type="submit" value="Add Problems"></input>
        </form>
      </div>
    );
  }
});

module.exports = React.createClass({
  //Initial State and mounting
  getInitialState: function () {
    return ({problems: [], contests:[], selProblems: [], selContest: ''});
  },
  onGetProblems: function (err, res) {
    if(err)
      console.log('Oh no! error');
    else
      this.setState({problems: res.body});
  },
  onGetContests: function (err, res) {
    if(err){
      console.log('Oh no! error');
    } else {
      var parsedJSON = JSON.parse(res.text);
      var contestList = [];
      parsedJSON.forEach(function (item, index) {
        contestList.push({value: item._id, text: item.title});
        if (index == 0)
          this.setState({selContest: item._id});
      }.bind(this));
      console.log(JSON.stringify(contestList));
      this.setState({
        contests: contestList
      });
    }
  },
  componentDidMount: function () {
    utils.getResourceFromServer(this.props.url, 'problems', this.onGetProblems);
    utils.getResourceFromServer(this.props.url, 'contests', this.onGetContests);
  },
  addProblemsToContest: function (err, res) {
    if (err || !res.ok) {
      console.log('Oh no! error');
    } else {
      console.log('yay got ' + JSON.stringify(res.body));
      window.location.pathname = '/contests'
    }
  },
  handleSubmit: function () {
    var problemsToAdd = this.state.selProblems;
    var contestToAddTo = this.state.selContest;
    console.log(contestToAddTo);
    if (!contestToAddTo || !problemsToAdd)
      return;
    var resource = 'contests/' + contestToAddTo + '/add';
    utils.postToServer(this.props.url, resource, problemsToAdd,
      this.addProblemsToContest);
    this.setState({selProblems: [], selContest: ''});
  },
  problemCheck: function (id) {
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
  dropdownChange: function (contest) {
    console.log(contest);
    this.setState({selContest: contest});
  },
  render: function () {

    var allProblems = this.state.problems.map(function (item) {
      return (
        <Problem
          title={item.title}
          author={item.author}
          description={item.description}
          key={item._id}
          id={item._id}
          problemCheck={this.problemCheck}>
        </Problem>
      );
    }.bind(this));
    return (
      <div className="problemList">
        <table>
          <tbody>
            {allProblems}
          </tbody>
        </table>
        <AddProblemsForm
          list={this.state.contests}
          dropdownChange={this.dropdownChange}
          handleSubmit={this.handleSubmit}>
        </AddProblemsForm>
      </div>
    );
  }

});
