var React = require('react');

var FormElement = React.createClass({
  getInitialState: function() {
    return ({
      type: this.props.type,
      name: this.props.name
    });
  },
  render: function() {
    var value = this.state.name[0].toUpperCase() + this.state.name.slice(1);
    return (
      <div>
        <div className="col-4"></div>
        <div className="col-3">
          <label htmlFor={this.state.name}>{value} </label>
        </div>
        <div className="col-2">
          <input type={this.state.type} name={this.state.name} id={this.state.name}/>
        </div>
        <div className="col-3"></div>
        <br/><br/>
      </div>
    );
  }
});

module.exports = React.createClass({
  render: function() {
    return (
      <form action={this.props.url + "users"} method="post">
        <br/><br/><br/><br/>
        <FormElement type="input" name="name" required/>
        <FormElement type="email" name="email" required/>
        <FormElement type="input" name="username" required/>
        <FormElement type="password" name="password" required/>
        <FormElement type="password" name="confirm Password"required/>
        <div className="col-7"></div>
        <div className="col-4">
          <input type="submit" name="name" value="Register"/>
        </div>
      </form>
    );
  }
});
