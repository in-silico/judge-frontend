module.exports = {
  modal: {
    modal: {
      position: 'absolute !important',
      zIndex: 1040,
      top: 0, bottom: 0, left: 0, right: 0,
      overflow: 'scroll'
    },

    backdrop: {
      position: 'fixed',
      top: 0, bottom: 0, left: 0, right: 0,
      zIndex: 'auto',
      backgroundColor: '#000',
      opacity: 0.5
    },

    dialog: {
      position: 'absolute !important',
      width: '80%',
      top: '10%', left: '10%',
      border: '1px solid #e5e5e5',
      backgroundColor: 'white',
      boxShadow: '0 5px 15px rgba(0,0,0,.5)',
      padding: 20
    }
  }
};
