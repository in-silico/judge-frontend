var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  //Handlers and initial state
  getInitialState: function () {
    return {title: '', description: ''}
  },
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
    if (!title || !description)
      return;
    this.onContestSubmit({title: title, description: description});
    this.setState({title: '', description: ''});
  },
  onContestSubmit: function (contest) {
    $.ajax({
      url: this.props.url,
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
  //The render
  render: function () {
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
          <input type='submit' value = 'Add contest'/>
        </form>
      </div>
    );
  }
});
