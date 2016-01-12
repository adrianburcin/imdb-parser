/**
 * Created by adrianb on 10/01/16.
 */
var http = require('./http-service');
var constants = require('./utils/constants');
var parser = require('./parser');
var transform = require('./utils/transform');

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

    var requestParams = transform.mapFindParams(params);

    requestParams.count && (parseOptions.returnCount = parseInt(requestParams.count));
    requestParams.count && (delete requestParams.count);
    requestParams.page && (parseOptions.page = parseInt(requestParams.page));
    requestParams.page && (delete requestParams.page);

    var requestConfigs = {
      hostname: constants.imdbUrls.base,
      path: constants.imdbUrls.find,
      queryParams: requestParams
    };

    http.get(requestConfigs)
      .then((htmlString) => {
        parseAndResolve(htmlString);
      })
      .catch((error) => {
        parseAndResolve(htmlString);
      });
  });
};

/**@RequestParams -> id
 * id - (default: '') - imdb movie id
 */
var getMovie = function (params) {
  return new Promise((resolve, reject) => {
    var parseOptions = {};

    function parseAndResolve(html) {
      parser.parseMovie(html, parseOptions)
        .then((jsonResponse) => {
          resolve(jsonResponse);
        });
    }

    var path = constants.imdbUrls.title + '/';

    if (params && params.id) {
      path += params.id;
      parseOptions.id = params.id;
    }

    var requestConfigs = {
      hostname: constants.imdbUrls.base,
      path: path,
      queryParams: {}
    };

    http.get(requestConfigs)
      .then((htmlString) => {
        parseAndResolve(htmlString);
      })
      .catch((error) => {
        parseAndResolve(htmlString);
      });
  });
};

module.exports = {
  find: find,
  getMovie: getMovie
};