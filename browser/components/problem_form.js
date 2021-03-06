var React = require('react');

module.exports = React.createClass({
  propTypes: {
    header: React.PropTypes.string.isRequired,
    buttonText: React.PropTypes.string.isRequired,
    submit: React.PropTypes.func.isRequired
  },
  // Initial State, Component mounting
  getInitialState: function () {
    return {
      title: '',
      author: '',
      description: ''
    };
  },
  // Handlers
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
    // var problemArray = this.state.selProblems;
    if (!title || !author || !description) return;
    var data = {title: title, author: author, description: description};
    this.props.submit(data);
  },
  render: function () {
    return (
      <div className='problemForm' onSubmit={this.handleSubmit}>
        <h1>{this.props.header}</h1>
        <br />
        <form>
          <input
            type='text'
            placeholder='Problem Title'
            value={this.state.title}
            onChange={this.handleTitleChange}>
          </input><br /><br />
          <input
            type='text'
            placeholder='Problem Author'
            value={this.state.author}
            onChange={this.handleAuthorChange}>
          </input><br /><br />
          <textarea
            cols='60' rows='25'
            placeholder='Problem Description'
            value={this.state.description}
            onChange={this.handleDescriptionChange}>
          </textarea><br /><br />
          <br />
          <button type='submit' className='button button-color' value={this.props.buttonText}>{this.props.buttonText}</button>
        </form>
      </div>
    );
  }
});
