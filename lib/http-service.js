/**
 * Created by adrianb on 11/01/16.
 */
var http = require('http');
var queryString = require('querystring');

get = function (requestConfigs) {
  return new Promise((resolve, reject) => {
    var qs = queryString.stringify(requestConfigs.queryParams);
    var url = requestConfigs.hostname + requestConfigs.path + (!!qs ? ('?' + qs) : '') + '/';

    http.get(url, (res) => {
      var content = [];
      res.on('data', (chunk) => {
        content.push(chunk);
      }).on('end', () => {
        resolve(content.join(''));
      });
    }).on('error', (e) => {
      console.log(`Got error: ${e.message}`);
    });
  });
};

post = function (url, params) {

};

module.exports = {
  get: get,
  post: post
};