var React = require('react');
var superagent = require('superagent');

var Problem = React.createClass({
  handleCheck: function () {
    this.props.problemCheck(this.props.id);
  },
  render: function () {
    return (
      <tr className="problem">
        <td>{this.props.title}</td>
        <td>{this.props.description}</td>
        <td>Add<input type="checkbox"
          onChange={this.handleCheck}>
        </input></td>
      </tr>
    );
  }
});

var Dropdown = React.createClass({
  handleChange: function (e) {
    var val = e.target.value;
    this.props.dropdownChange(val);
  },
  render: function () {
    var options = this.props.list.map(function (item) {
      return (
        <option value={item.value}>{item.text}</option>
      );
    });
    return(
      <div className="dropdown">
        <select onChange={this.handleChange}>
          {options}
        </select>
      </div>
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
      }.bind(this));
  },
  componentDidMount: function () {
    this.getProblemsFromServer();
    this.getContestsFromServer();
  },
  addProblemsToContest: function (data) {
    data.problems.forEach(function (item, index, array) {
      superagent
      .post(this.props.url + 'contests/add/' + data.contest)
      .send(item)
      .set('Accept', 'application/json')
      .end(function(err, res){
        if (err || !res.ok) {
          console.log('Oh no! error');
        } else {
          console.log('yay got ' + JSON.stringify(res.body));
          if (index >= array.length - 1)
            window.location.pathname = '/contests'
        }
      });
    }.bind(this));

  },
  handleSubmit: function () {
    var problemsToAdd = this.state.selProblems;
    var contestToAddTo = this.state.selContest;
    console.log(contestToAddTo);
    if (!contestToAddTo || !problemsToAdd)
      return;
    this.addProblemsToContest({
      problems: problemsToAdd,
      contest: contestToAddTo
    });
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
