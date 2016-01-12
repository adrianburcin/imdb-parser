/**
 * Created by adrianb on 11/01/16.
 */
var constants = require('./constants');

var toParams = function (object) {
  if (typeof object === 'object') {
    return '?' + Object.keys(object).map(function (key) {
        return key + '=' + encodeURIComponent(object[key]);
      }).join('&');
  } else {
    return '';
  }
};

var transformFindParams = function (params) {
  var requestParams = {};
  params.query || (params.query = '');
  params.search = constants.searchMap[params.search];
  params.search || (params.search = constants.searchMap.titles);
  params.count || (delete params.count);
  params.page || (delete params.page);

  requestParams[constants.queryParams.query] = params.query;
  requestParams[constants.queryParams.search] = params.search;
  params.count && (requestParams[constants.queryParams.count] = params.count);
  params.page && (requestParams[constants.queryParams.page] = params.page);

  return requestParams;
};

module.exports = {
  toParams: toParams,
  transformFindParams: transformFindParams
};