var React = require('react');
var katex = require('katex');
var marked = require('marked');
var utils = require('../utils');

module.exports = React.createClass({
  getInitialState: function () {
    return ({title: '', author:'', description: ''});
  },
  onGetProblem: function (err, res) {
    if(err)
      console.log('Oh no! error');
    else{
      var parsedJSON = res.body;
      this.setState({title: parsedJSON.title, author: parsedJSON.author, description: parsedJSON.description});
    }
  },

  componentDidMount: function () {
    utils.getResourceFromServer(this.props.url, 'problems/' + this.props.id,
      this.onGetProblem);
  },

  render: function () {
    return (
      <div className="Problem">
        <h1> {this.state.title} </h1>
        <h3> {this.state.author} </h3>
        <div dangerouslySetInnerHTML={utils.parseToHTML(this.state.description)}></div>
      </div>
    );
  }
});
