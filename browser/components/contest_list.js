var React = require('react');
var superagent = require('superagent');

var Contest = React.createClass({
  handleClick: function (e) {
    console.log(e.button);
    if (e.button == 0)
      window.location.pathname = '/contests/' + this.props.id;
  },
  render: function () {
    return (
      <tr className="contest">
        <td><a href={"/contests/" + this.props.id} onClick={this.handleClick}>
          {this.props.title}</a></td>
        <td>{this.props.description}</td>
      </tr>

    );
  }
});

module.exports = React.createClass({
  //Initial State, Mounting
  getInitialState: function () {
    return {contests: []};
  },
  getContestsFromServer: function () {
    superagent
      .get(this.props.url + 'contests')
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err)
          console.log('Oh no! error');
        else
          this.setState({contests: JSON.parse(res.text)});
      }.bind(this));
  },
  componentDidMount: function () {
    this.getContestsFromServer();
  },
  render: function () {
    var allContests = this.state.contests.map(function (item) {
      return (
        <Contest
          title={item.title}
          description={item.description}
          id={item._id}
          key={item._id}>
        </Contest>
      );
    });
    return (
      <div className='contestList'>
        <table>
          <tbody>
            {allContests}
          </tbody>
        </table>
      </div>
    );
  }
});
