/**
 * Created by adrianb on 11/01/16.
 */
//URLs
var imdbUrls = {
  base: 'http://www.imdb.com',
  find: '/find'
};

//maps
var queryParams = {
  query: 'q',
  search: 's',
  count: 'count'
};

var searchMap = {
  titles: 'tt',
  episodes: 'ep',
  names: 'nm'
};

// selectors
var moviesList = {
  titles: '.pagecontent table.findList',
  titleRaw: 'td.result_text',
  poster: 'td.primary_photo a img'
};

var movieDetails = {};

module.exports = {
  imdbUrls: imdbUrls,
  searchMap: searchMap,
  queryParams: queryParams,
  selectors: {
    movies: moviesList,
    movie: movieDetails
  }
};