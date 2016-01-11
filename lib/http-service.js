/**
 * Created by adrianb on 11/01/16.
 */
var http = require('http');
var urlService = require('./utils/url-service');

get = function (url, params) {
  return new Promise((resolve, reject) => {
    var requestUrl = url + urlService.toParams(params);
    var request = http.request(requestUrl, (response) => {
      var content = [];
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        content.push(chunk);
      });

      response.on('end', () => {
        resolve(content.join(''));
      });
    });

    request.on('error', (e) => {
      reject({error: e.message});
    });

    request.end();

  });
};

post = function (url, params) {

};

module.exports = {
  get: get,
  post: post
};