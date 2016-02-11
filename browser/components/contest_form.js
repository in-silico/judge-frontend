var React = require('react');
var superagent = require('superagent');

var Problem = React.createClass({
  handleCheck: function (e) {
    this.props.checkProblem(this.props.id);
  },
  render: function () {
    return(
      <div className='problem'>
        <ul className='contestFormProblems'>
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
    superagent
    .post(this.props.url + 'contests')
    .send(contest)
    .set('Accept', 'application/json')
    .end(function(err, res){
      if (err || !res.ok) {
        console.log('Oh no! error');
      } else {
        document.location.pathname='/contests';
        console.log('yay got ' + JSON.stringify(res.body));
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
