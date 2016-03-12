var React = require('react');
var utils = require('../utils.js');

var Problem = React.createClass({
  handleCheck: function (e) {
    this.props.checkProblem(this.props.id);
  },
  render: function () {
    return(
      <tr className="contestFormProblem">
        <td>{this.props.title}</td>
        <td>{this.props.author}</td>
        <td>Add<input type="checkbox"
          onChange={this.handleCheck}></input></td>
      </tr>
    );
  }
});

module.exports = React.createClass({
  //Initial State, Component mounting
  getInitialState: function () {
    return {title: '', description: '', problems: [], selProblems: []}
  },
  onGetProblems: function (err, res) {
    if(err)
      console.log('Oh no! error');
    else
      this.setState({problems: res.body});
  },
  componentDidMount: function () {
    utils.getResourceFromServer(this.props.url, 'problems', this.onGetProblems);
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
    utils.postToServer(this.props.url, 'contests', {
      title: title,
      description: description,
      problems: problemArray
    }, this.onContestSubmit);
    this.setState({title: '', description: '', selProblems: []});
  },
  //Submission
  onContestSubmit: function (err, res) {
    if (err || !res.ok) {
      console.log('Oh no! error');
    } else {
      window.location.pathname='/contests';
      console.log('yay got ' + JSON.stringify(res.body));
    }
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
    var allProblems = this.state.problems.map(function (item) {
      return(
        <Problem title={item.title}
          author={item.author}
          key={item._id}
          id={item._id}
          checkProblem={this.checkProblem}>
        </Problem>
      );
    }.bind(this));
    return (
      <div className='contestForm' onSubmit={this.handleSubmit}>
        <h1>Create New Contest</h1>
        <br />
        <form>
          <input
            type='text'
            placeholder='Contest Title'
            value={this.state.title}
            className='textbox width-box'
            onChange={this.handleTitleChange}>
          </input><br /><br />
          <textarea
            cols='60' rows='25'
            placeholder='Contest Description'
            value={this.state.description}
            className='textbox width-box'
            onChange={this.handleDescriptionChange}>
          </textarea><br /><br />
          <h2>Problems</h2>
            <table>
              <thead>
                <tr>
                   <th><h3><i className='material-icons'>label_outline</i> Name</h3></th>
                   <th><h3><i className='material-icons'>perm_identity</i> Author</h3></th>
                </tr>
              </thead>
              <tbody>
                {allProblems}
              </tbody>
            </table>
          <br />
          <button type='submit' value = 'Add contest'>Add Contest</button>
        </form>
      </div>
    );
  }
});
