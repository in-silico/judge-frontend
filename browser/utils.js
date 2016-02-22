var superagent = require('superagent');
module.exports = {
  //Get all problems from the server
  getResourceFromServer: function(url, resource, callback){
    superagent
      .get(url + resource)
      .set('Accept', 'application/json')
      .end(callback);
  },


};
