var superagent = require('superagent');
var katex = require('katex');
var marked = require('marked');

module.exports = {
  //Get all the documents of a resource from the server
  getResourceFromServer: function(url, resource, callback){
    superagent
      .get(url + resource)
      .set('Accept', 'application/json')
      .end(callback);
  },

  //Post something to the server
  postToServer: function (url, resource, data, callback) {
    superagent
      .post(url + resource)
      .send(data)
      .set('Accept', 'application/json')
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