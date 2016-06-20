var React = require('react');
var Modal = require('react-overlays').Modal;
var ContestForm = require('./contest_form.js');
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
  onEditContest: function (err, res) {
    if (err) {
      return; // alert('Oh No, error!');
    }
    this.props.updateParent();
    this.close();
    // alert('Contest Updated');
  },
  handleSubmit: function (data) {
    utils.putToServer(
      this.props.url, 'contests/' + this.props.id,
      data,
      this.onEditContest
    );
  },
  render: function () {
    return (
      <div className='contestEdit' onSubmit={this.handleSubmit}>
        <button onClick={this.open}>
          Edit Contest
        </button>
        <Modal
          style={style.modal.modal}
          backdropStyle={style.modal.backdrop}
          show={this.state.showModal}
          onHide={this.close}>
          <div style={style.modal.dialog}>
            <ContestForm
              url={this.props.url}
              header='Edit Contest'
              buttonText='Edit'
              submit={this.handleSubmit} />
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
