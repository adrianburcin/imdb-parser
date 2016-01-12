/**
 * Created by adrianb on 11/01/16.
 */
var cheerio = require('cheerio');
var constants = require('./utils/constants');

var parseMovies = function (moviesHtml, options) {
  return new Promise((resolve, reject) => {
    var movies = {list: []};

    if (moviesHtml && !moviesHtml.error) {
      var $ = cheerio.load(moviesHtml);
      var $titles = $(constants.selectors.movies.titles).first().find('tr');

      var returnCount = options && options.returnCount && options.returnCount || 0;
      var page = options && options.page && options.page || 0;

      if (returnCount > 0) {
        $titles = $titles.slice(returnCount * page, returnCount * page + returnCount);
      }

      $titles.each(function (idx, elem) {

        var $titleRaw = $(constants.selectors.movies.titleRaw, this);
        var $title = $titleRaw.find('a');
        var $poster = $(constants.selectors.movies.poster, this);

        var title = $title.map(function(i, el) { // this === el
                                  return $(this).text();
                                }).get().join(' - ');
        var url = $title.attr('href');
        var imdbId = /tt\d{7}/.exec(url) && /tt\d{7}/.exec(url)[0];
        var detailsUnformatted = $titleRaw.text().replace(title, '').trim();
        var year = /\d{4}/.exec(detailsUnformatted) && /\d{4}/.exec(detailsUnformatted)[0];
        var details = detailsUnformatted.replace('(' + year + ')', '')
                                        .replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '')
                                        .trim();
        var posterUrl = $poster.attr('src');

        movies.list.push({
          imdbId: imdbId,
          title: title,
          year: year,
          details: details,
          url: constants.imdbUrls.base + url,
          posterUrl: posterUrl
        });
      });
    }

    resolve(movies);
  });
};

var parseMovie = function (movieHtml) {
};

module.exports = {
  parseMovies: parseMovies,
  parseMovie: parseMovie
};