var React = require('react');
var superagent = require('superagent');
var utils = require('../utils.js')

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
    utils.postToServer(this.props.url, 'problems', {
      title: title,
      author: author,
      description: description
    }, this.onProblemSubmit);

    this.setState({title: '', author:'', description: ''});
  },
  //Submission
  onProblemSubmit: function (err, res) {
    if (err || !res.ok) {
      console.log('Oh no! error');
    } else {
      window.location.pathname='/problems';
      console.log('yay got ' + JSON.stringify(res.body));
    }
  },
  render: function () {
    return (
      <div className='problemForm' onSubmit={this.handleSubmit}>
        <div className='row'>
          <h1>Create New Problem</h1>
        </div>
        <br />
        <form>
          <div className='center'>
            <div className="row">
              <input
                type='text'
                placeholder='Problem Title'
                value={this.state.title}
                className='textbox width-box'
                onChange={this.handleTitleChange}>
              </input><br /><br />
            </div>
            <div className="row">
              <input
                type='text'
                placeholder='Problem Author'
                value={this.state.author}
                className='textbox width-box'
                onChange={this.handleAuthorChange}>
              </input><br /><br />
            </div>
            <div className="row">
              <textarea
                cols='60' rows='25'
                placeholder='Problem Description'
                value={this.state.description}
                className='textbox width-box'
                onChange={this.handleDescriptionChange}>
              </textarea><br /><br />
            </div>
            <br />
            <button type='submit' className='button button-color' value = 'Add problem'>Add problem</button>
          </div>
        </form>
      </div>
    );
  }
});
