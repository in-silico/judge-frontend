var React = require('react');
var superagent = require('superagent');


module.exports = React.createClass({
  //Initial State, Component mounting
  getInitialState: function () {
    return {title: '', author:'', description: ''}
  },


  //Handlers
  handleTitleChange: function (e) {
    this.setState({title: e.target.value});
  },
  handleAuthorChange: function (e) {
    this.setState({author: e.target.value});
  },
  handleDescriptionChange: function (e) {
    this.setState({description: e.target.value});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var title = this.state.title.trim();
    var author = this.state.author.trim();
    var description = this.state.description.trim();
    //var problemArray = this.state.selProblems;
    if (!title || !author || !description)
      return;
    this.onProblemSubmit({
      title: title,
      author: author,
      description: description
    });

    this.setState({title: '', author:'', description: ''});
  },
  //Submission
  onProblemSubmit: function (problem) {
    console.log(JSON.stringify(problem));
    superagent
      .post(this.props.url + 'problems')
      .send(problem)
      .set('Accept', 'application/json')
      .end(function(err, res){
        if (err || !res.ok) {
          console.log('Oh no! error');
        } else {
          window.location.pathname='/problems';
          console.log('yay got ' + JSON.stringify(res.body));
        }
      });
  },
  /*
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
  */
  //The render
  render: function () {
    /*
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
    */
    return (
      <div className='problemForm' onSubmit={this.handleSubmit}>
        <form>
          <input
            type='text'
            placeholder='Problem Title'
            value={this.state.title}
            onChange={this.handleTitleChange}>
          </input><br />
          <input
            type='text'
            placeholder='Problem Author'
            value={this.state.author}
            onChange={this.handleAuthorChange}>
          </input><br />
          <textarea
            cols='60' rows='60'
            placeholder='Problem Description'
            value={this.state.description}
            onChange={this.handleDescriptionChange}>
          </textarea><br />
          <br />
          <input type='submit' value = 'Add problem'/>
        </form>
      </div>
    );
  }
});
