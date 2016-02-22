var React = require('react');
var superagent = require('superagent');


module.exports = React.createClass({
  //Initial State, Component mounting
  getInitialState: function () {
    return {user_id: '', source_code:''}
  },


  //Handlers
  handleUserIdChange: function (e) {
    this.setState({user_id: e.target.value});
  },

  handleSourceCodeChange: function (e) {
    this.setState({source_code: e.target.files});
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var user_id = this.state.user_id.trim();
    //var author = this.state.author.trim();
    //var description = this.state.description.trim();
    //var problemArray = this.state.selProblems;

    var file = this.state.source_code;
    console.log(file);
    var dataSourceCode = new FormData();

    for(var key in file){
      if(file.hasOwnProperty(key) && file[key] instanceof File){
        console.log("to asdasd " + file[key]);
        dataSourceCode.append(key, file[key]);
      }
    }


    if (!user_id || !dataSourceCode)
      return;

    dataSourceCode.append('problem_id', this.props.problem_id);
    dataSourceCode.append('contest_id', this.props.contest_id);
    dataSourceCode.append('user_id', this.props.user_id);
    this.onSubmissionSubmit(dataSourceCode);


    this.setState({user_id: '', source_code:''});
  },

  //Submission
  onSubmissionSubmit: function (submission) {
    console.log(JSON.stringify(submission));
    console.log(this.props.url);
    console.log(submission);
    superagent
      .post(this.props.url + 'submissions')
      .send(submission)
      .set('Accept', 'application/json')
      .end(function(err, res){
        if (err || !res.ok) {
          console.log('Oh no! error');
        } else {
          //window.location.pathname='/problems';
          //console.log('yay got ' + JSON.stringify(res.body));
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
      <div className='submissionForm' onSubmit={this.handleSubmit}>
        <form enctype='multipart/form-data'>
          <input
            type='text'
            placeholder='User ID'
            value={this.state.user_id}
            onChange={this.handleUserIdChange}>
          </input><br />
          <input
            type='file'
            placeholder='File'
            id = 'sourceCode'
            //value={this.state.source_code}
            onChange={this.handleSourceCodeChange}>
          </input><br />

          <input type='submit' value = 'Submit'/>
        </form>
      </div>
    );
  }
});
