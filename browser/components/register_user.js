var React = require('react');

class FormElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      name: this.props.name
    };
  }

  render() {
    var value = this.state.name[0].toUpperCase() + this.state.name.slice(1);
    return (
      <div>
        <div className="col-4"></div>
        <div className="col-2">
          <label htmlFor={this.state.name}>{value} </label>
        </div>
        <div className="col-3">
          <input type={this.state.type} name={this.state.name} id={this.state.name}/>
        </div>
        <div className="col-3"></div>
        <br/><br/>
      </div>
    );
  }
}

module.exports = class RegisterForm extends React.Component {
  render() {
    return (
      <form action={this.props.url + "/users/new"} method="post">
        <br/><br/><br/><br/>
        <FormElement type="input" name="name" required/>
        <FormElement type="email" name="email" required/>
        <FormElement type="input" name="username" required/>
        <FormElement type="password" name="password" required/>
        <FormElement type="password" name="confirm Password"required/>
        <div className="col-6"></div>
        <div className="col-4">
          <input type="submit" name="name" value="Resgister"/>
        </div>
      </form>
    );
  }
}
