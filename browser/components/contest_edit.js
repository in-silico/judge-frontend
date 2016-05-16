var React = require('react');
var Modal = require('react-overlays').Modal;
var utils = require('../utils.js');

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0,
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.5
};

const dialogStyle = function() {
  // we use some psuedo random coords so modals
  // don't sit right on top of each other.
  let top = 50
  let left = 50

  return {
    position: 'absolute',
    width: 400,
    top: top + '%', left: left + '%',
    transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: 20
  };
};


module.exports = React.createClass({
  getInitialState: function () {
    return {showModal: false, newTitle: '', newDescription: ''};
  },
  onEditContest: function (err, res) {
    if (err)
      return alert('Oh No, error!');
    this.props.updateParent();
    this.close();
    alert('Contest Updated');
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var data = {};
    var title = this.state.newTitle.trim();
    var description = this.state.newDescription.trim();
    if (title)
      data.title = title;
    if (description)
      data.description = description;
    utils.putToServer(this.props.url, 'contests/' + this.props.id, data,
      this.onEditContest);
  },
  handleTitleChange: function (e) {
    console.log('title change');
    this.setState({newTitle: e.target.value});
  },
  handleDescriptionChange: function (e) {
    this.setState({newDescription: e.target.value});
  },
  render: function() {
    return (
      <div className='contestEdit' onSubmit={this.handleSubmit}>
        <button onClick={this.open}>
          Edit Contest
        </button>
        <Modal
          style={modalStyle}
          backdropStyle={backdropStyle}
          show={this.state.showModal}
          onHide={this.close}
        >
          <div style={dialogStyle()} >
            <h4>Contest Edition</h4>
            <form>
              <input
                type='text'
                placeholder={this.props.title}
                onChange={this.handleTitleChange}>
              </input><br /><br />
              <textarea
                cols='60' rows='25'
                placeholder={this.props.description}
                onChange={this.handleDescriptionChange}>
              </textarea><br /><br />
              <button type='button' onClick={this.handleSubmit}>
                Done
              </button>
            </form>
          </div>
        </Modal>
      </div>
    );
  },

  close(){
    this.setState({ showModal: false });
  },

  open(){
    this.setState({ showModal: true });
  }
});
