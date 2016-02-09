var React = require('react');
var ReactDOM = require('react-dom');

var Problem = React.createClass({
  handleCheck: function (e) {
    this.props.checkProblem(this.props.id);
  },
  render: function () {
    return(
      <div className='problem'>
        <ul>
          <li>{this.props.title}</li>
          <li>{this.props.author}</li>
          <li>Add<input type="checkbox"
            onChange={this.handleCheck}></input></li>
        </ul>
      </div>
    );
  }
});

module.exports = React.createClass({
  //Initial State, Component mounting
  getInitialState: function () {
    return {title: '', description: '', problems: [], selProblems: []}
  },
  getProblemsFromServer: function () {
    $.ajax({
      url: this.props.url + 'problems',
      contentType: "application/json",
      dataType: 'json',
      crossDomain: true,
      success: function (res) {
        this.setState({problems: res});
        console.log(JSON.stringify(res));
      }.bind(this),
      error: function (xhr, status) {
        console.log('error');
      }
    });
  },
  componentDidMount: function () {
    this.getProblemsFromServer();
  },
  //Handlers
  handleTitleChange: function (e) {
    this.setState({title: e.target.value});
  },
  handleDescriptionChange: function (e) {
    this.setState({description: e.target.value});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var title = this.state.title.trim();
    var description = this.state.description.trim();
    var problemArray = this.state.selProblems;
    if (!title || !description)
      return;
    this.onContestSubmit({
      title: title,
      description: description,
      problems: problemArray});

    this.setState({title: '', description: '', selProblems: []});
  },
  //Submission
  onContestSubmit: function (contest) {
    console.log(JSON.stringify(contest));
    $.ajax({
      url: this.props.url + 'contests',
      type: "POST",
      crossDomain: true,
      data: JSON.stringify(contest),
      contentType: "application/json",
      dataType: "json",
      success: function (response) {
        console.log(response);
      },
      error: function (xhr, status) {
        console.log('error');
      }
    });
  },
  //additional
  checkProblem: function (id) {
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
  //The render
  render: function () {
    var addProblem = this.checkProblem;
    var allProblems = this.state.problems.map(function (item) {
      return(
        <Problem title={item.title}
          author={item.author}
          key={item._id}
          id={item._id}
          checkProblem={addProblem}>
        </Problem>
      );
    });
    return (
      <div className='contestForm' onSubmit={this.handleSubmit}>
        <form>
          <input
            type='text'
            placeholder='Contest Title'
            value={this.state.title}
            onChange={this.handleTitleChange}>
          </input><br />
          <textarea
            cols='60' rows='60'
            placeholder='Contest Description'
            value={this.state.description}
            onChange={this.handleDescriptionChange}>
          </textarea><br />
          {allProblems}<br />
          <input type='submit' value = 'Add contest'/>
        </form>
      </div>
    );
  }
});
