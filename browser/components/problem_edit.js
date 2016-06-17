var React = require('react');
var Modal = require('react-overlays').Modal;
var ProblemForm = require('./problem_form.js');
var utils = require('../utils.js');
var style = require('../../config/styles.js');

module.exports = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    updateParent: React.PropTypes.func.isRequired
  },
  getInitialState: function () {
    return {showModal: false};
  },
  onEditProblem: function (err, res) {
    if (err) {
      return; // alert('Oh No, error!');
    }
    this.props.updateParent();
    this.close();
    // alert('Contest Updated');
  },
  handleSubmit: function (data) {
    utils.putToServer(
      this.props.url, 'problems/' + this.props.id,
      data,
      this.onEditProblem
    );
  },
  render: function () {
    return (
      <div className='problemEdit' onSubmit={this.handleSubmit}>
        <button onClick={this.open}>
          Edit Problem
        </button>
        <Modal
          style={style.modal.modal}
          backdropStyle={style.modal.backdrop}
          show={this.state.showModal}
          onHide={this.close}
        >
          <div style={style.modal.dialog} >
            <ProblemForm
              url={this.props.url}
              header='Edit Problem'
              buttonText='Edit'
              submit={this.handleSubmit}
            />
          </div>
        </Modal>
      </div>
    );
  },

  close () {
    this.setState({ showModal: false });
  },

  open () {
    this.setState({ showModal: true });
  }
});
