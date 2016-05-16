var superagent = require('superagent');
var katex = require('katex');
var marked = require('marked');

module.exports = {
  //Get all the documents of a resource from the server
  getResourceFromServer: function(url, resource, callback){
    superagent
      .get(url + resource)
      .withCredentials()
      .set('Accept', 'application/json')
      .end(callback);
  },

  //Post something to the server
  postToServer: function (url, resource, data, callback) {
    superagent
      .post(url + resource)
      .withCredentials()
      .send(data)
      .set('Accept', 'application/json')
      .end(callback);
  },

  putToServer: function(url, resource, data, callback) {
    superagent
      .put(url + resource)
      .withCredentials()
      .send(data)
      .set('Accept', 'application/json')
      .end(callback);
  },

  deleteResourceFromServer: function(url, resource, callback) {
    superagent
      .del(url + resource)
      .withCredentials()
      .end(callback);
  },

  parseToHTML: function (unparsed) {
    var str =  unparsed;
    var list = str.split("$");
    list.forEach(function (item, index) {
      if (index % 2 != 0)
        str = str.replace("$" + item + "$", katex.renderToString(item));
    });
    str = marked(str);
    return {__html: str};
  }
};
