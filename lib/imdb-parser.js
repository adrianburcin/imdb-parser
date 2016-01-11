/**
 * Created by adrianb on 10/01/16.
 */
var http = require('./http-service');
var constants = require('./utils/constants');
var parser = require('./parser');
var urlService = require('./utils/url-service');

/**@RequestParams -> query, search, count
 * query - (default: '') - free text
 * search - (default: title) - titles/names/episodes
 * count - (default: removed) - Integer 1..
 */
var find = function (params) {
  return new Promise((resolve, reject) => {
    var parseOptions = {
      returnCount: 0,
      search: undefined
    };

    function parseAndResolve(html) {
      parser.parseMovies(html, parseOptions)
        .then((jsonResponse) => {
          resolve(jsonResponse);
        });
    }

    var requestParams = urlService.transformFindParams(params);
    requestParams.count && (parseOptions.returnCount = parseInt(requestParams.count));
    requestParams.count && (delete requestParams.count);
    http.get(constants.imdbUrls.base + constants.imdbUrls.find, requestParams)
      .then((htmlString) => {
        parseAndResolve(htmlString);
      })
      .catch((error) => {
        parseAndResolve(htmlString);
      });
  });
};

var getDetails = function (movie) {
};

module.exports = {
  find: find,
  getDetails: getDetails
};