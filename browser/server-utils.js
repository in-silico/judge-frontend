var superagent = require('superagent');

module.exports = {
  getResource: function (url, cb) {
    superagent
      .get(url)
      .set('Accept', 'application/json')
      .end(cb);
  },
  getSecuredResource: function (url, token, cb) {
    superagent
      .get(url)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .end(cb);
  },
  postData: function (url, data, cb) {
    superagent
      .post(url)
      .set('Accept', 'application/json')
      .send(data)
      .end(cb);
  },
  postSecuredData: function (url, data, token, cb) {
    superagent
      .post(url)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(data)
      .end(cb);
  },
  putSecuredData: function (url, data, token, cb) {
    superagent
      .put(url)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(data)
      .end(cb);
  },
  delSecuredResource: function (url, token, cb) {
    superagent
      .del(url)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .end(cb);
  }
};

