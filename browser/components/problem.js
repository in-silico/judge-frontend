var React = require('react');
var katex = require('katex');
var marked = require('marked');
var superagent = require('superagent');

module.exports = React.createClass({
  getInitialState: function () {
    return ({title: '', author:'', description: ''});
  },
  getProblemFromServer: function () {
    superagent
      .get(this.props.url + 'problems/' + this.props.id)
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err)
          console.log('Oh no! error');
        else{
          var parsedJSON = JSON.parse(res.text);
          this.setState({title: parsedJSON.title, author: parsedJSON.author, description: parsedJSON.description});
        }
      }.bind(this));
  },

  componentDidMount: function () {
    this.getProblemFromServer();
  },

  rawHTML: function () {
    var test =  this.state.description;
    var list = test.split("$");
    list.forEach(function (item, index) {
      if (index % 2 != 0)
        test = test.replace("$" + item + "$", katex.renderToString(item));
    });
    test = marked(test);
    return {__html: marked(test)};
  },
  render: function () {
    return (
      <div className="Problem">
        <h1> {this.state.title} </h1>
        <h3> {this.state.author} </h3>
        <span dangerouslySetInnerHTML={this.rawHTML()}></span>
      </div>
    );
  }
});
