var React = require('react');
var utils = require('../utils');

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
  onGetContests: function (err, res) {
    if(err)
      console.log('Oh no! error');
    else
      this.setState({contests: res.body});
  },

  componentDidMount: function () {
    utils.getResourceFromServer(this.props.url, 'contests', this.onGetContests);
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
        <h1>Contest List</h1>
        <div className='center'>
          <table>
          <thead>
            <tr>
               <th><h3>Name</h3></th>
               <th><h3>Description</h3></th>
            </tr>
          </thead>
            <tbody>
              {allContests}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
