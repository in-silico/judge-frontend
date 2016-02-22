var React = require('react');

module.exports = React.createClass({
  handleChange: function (e) {
    var val = e.target.value;
    this.props.dropdownChange(val);
  },
  render: function () {
    var options = this.props.list.map(function (item, index) {
      return (
        <option value={item.value} key={index}>{item.text}</option>
      );
    });
    return(
      <div className="dropdown">
        <select onChange={this.handleChange}>
          {options}
        </select>
      </div>
    );
  }
});
