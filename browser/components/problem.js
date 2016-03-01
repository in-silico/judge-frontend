var React = require('react');
var katex = require('katex');
var marked = require('marked');
var utils = require('../utils');

var TestCaseForm = React.createClass({
  getInitialState: function () {
    return {testCases: ''};
  },
  handleFileChange: function (e) {
    this.setState({testCases: e.target.files});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var file = this.state.testCases;
    console.log(file);
    var data = new FormData();
    for(var key in file){
      if(file.hasOwnProperty(key) && file[key] instanceof File){
        console.log("to lol " + file[key]);
        data.append(key, file[key]);
      }
    }
    if (!data)
      return;
    utils.postToServer(this.props.url, 'problems/tc/' + this.props.id,
      this.onDataSubmit);
  },
  onDataSubmit: function (err, res) {
    if (err)
      console.log('Oh no! error');
    else
      console.log(res.text);    
  },
  render: function () {
    return (
      <div className='testCaseForm' onSubmit={this.handleSubmit}>
        <form encType='multipart/form-data'>
          <input
            type='file'
            placeholder='File'
            id = 'testCases'
            onChange={this.handleFileChange}>
          </input>
          <input type='Submit' value='Add Test Case'></input>
        </form>
      </div>
    );
  }
});

module.exports = React.createClass({
  getInitialState: function () {
    return ({
      title: '',
      author:'',
      description: '',
      memLimit: 0,
      timeLimit: 0
    });
  },
  onGetProblem: function (err, res) {
    if(err)
      console.log('Oh no! error');
    else{
      var parsedJSON = res.body;
      this.setState({title: parsedJSON.title, author: parsedJSON.author, description: parsedJSON.description});
    }
  },

  onGetContest: function (err, res) {
    if (err) {
      console.log('Oh no! error');
    } else {
      var parsedJSON = res.body;
      var cp = parsedJSON.problems.find(function (item) {
        return item.problem_id == this.props.id;
      }.bind(this));
      this.setState({memLimit: cp.memory_limit, timeLimit: cp.time_limit});
    }
  },

  componentDidMount: function () {
    utils.getResourceFromServer(this.props.url, 'problems/' + this.props.id,
      this.onGetProblem);
    if (this.props.cid)
      utils.getResourceFromServer(this.props.url, 'contests/' + this.props.cid,
        this.onGetContest);
  },

  render: function () {
    var limits;
    if (this.props.cid)
      limits = (
        <ul>
          <li>{'Memory Limit: ' + this.state.memLimit}</li>
          <li>{'Time Limit: ' + this.state.timeLimit}</li>
        </ul>
      );
    else
      limits = <ul></ul>;
    return (
      <div className="Problem">
        <h1> {this.state.title} </h1>
        <h3> {this.state.author} </h3>
        {limits}
        <div
          dangerouslySetInnerHTML={utils.parseToHTML(this.state.description)}>
        </div>
        <TestCaseForm
          url={this.props.url}
          id={this.props.id}>
        </TestCaseForm>
      </div>
    );
  }
});
