/**
 * Created by adrianb on 11/01/16.
 */
var http = require('http');
var queryString = require('querystring');

get = function (requestConfigs) {
  return new Promise((resolve, reject) => {
    var qs = queryString.stringify(requestConfigs.queryParams);

    var options = {
      host: requestConfigs.hostname,
      port: 80,
      path: requestConfigs.path + (!!qs ? ('?' + qs) : '/'),
      headers: {
        'Accept-Language': 'en-US,en;q=0.8,ro;q=0.6'
      }
    };

    http.get(options, (res) => {
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