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

        var title = $title.map(function (i, el) { // this === el
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

var parseMovie = function (movieHtml, options) {
  return new Promise((resolve, reject) => {
    var movie = {
      id: options && options.id || '',
      title: '',
      posterUrl: '',
      videoUrl: '',
      infos: {
        duration: '',
        genre: '',
        datePublished: ''
      },
      overview: {
        ratingValue: '',
        ratingCount: ''
      },
      details: {
        description: '',
        directors: '',
        creators: '',
        actors: ''
      },
      cast: [],
      storyline: ''
    };

    if (movieHtml && !movieHtml.error) {
      var $ = cheerio.load(movieHtml);

      //roots
      var $topSegment = $(constants.selectors.movie.topSegment);
      var $bottomSegment = $(constants.selectors.movie.bottomSegment);
      var $infos = $topSegment.find(constants.selectors.movie.infos.rootFind);
      var $overview = $topSegment.find(constants.selectors.movie.overview.rootFind);
      var $details = $topSegment.find(constants.selectors.movie.details.rootFind);

      //principal elements
      var $poster = $topSegment.find(constants.selectors.movie.posterFind);
      var $title = $topSegment.find(constants.selectors.movie.titleFind);
      var $video = $bottomSegment.find(constants.selectors.movie.videoFind).first().find('a');

      //infos elements
      var $durationInfo = $infos.find(constants.selectors.movie.infos.durationFind);
      var $genreInfo = $infos.find(constants.selectors.movie.infos.genreFind);
      var $datePublishedInfo = $infos.find(constants.selectors.movie.infos.datePublishedFind);

      //overview elements
      var $ratingValueOverview = $overview.find(constants.selectors.movie.overview.ratingValueFind);
      var $ratingCountOverview = $overview.find(constants.selectors.movie.overview.ratingCountFind);

      //details elements
      var $descriptionDetails = $details.find(constants.selectors.movie.details.descriptionFind);
      var $directorsDetails = $details.find(constants.selectors.movie.details.directorsFind);
      var $creatorsDetails = $details.find(constants.selectors.movie.details.creatorsFind);
      var $actorsDetails = $details.find(constants.selectors.movie.details.actorsFind);

      //cast elements
      var $cast = $bottomSegment.find(constants.selectors.movie.cast.rootFind);

      //storyline elements
      var $storyline = $bottomSegment.find(constants.selectors.movie.storylineFind);

      //principal values
      movie.posterUrl = $poster.attr('src');
      movie.title = $title.text().trim();
      movie.videoUrl = constants.imdbUrls.base + $video.attr('href');

      //info values
      movie.infos.duration = $durationInfo.text().trim();
      movie.infos.datePublished = ($datePublishedInfo.attr('content') || '').trim();
      movie.infos.genre = $genreInfo.map(function (i, el) {
        return $(this).text().trim();
      }).get().join(', ');

      //overview values
      movie.overview.ratingValue = $ratingValueOverview.text().trim() + ' / 10';
      movie.overview.ratingCount = $ratingCountOverview.text().trim();

      //details values
      movie.details.description = $descriptionDetails.text().trim();
      movie.details.directors = $directorsDetails.text().trim();
      movie.details.creators = $creatorsDetails.map(function (i, el) {
        return $(this).text().trim();
      }).get().join(', ');
      movie.details.actors = $actorsDetails.map(function (i, el) {
        return $(this).text().trim();
      }).get().join(', ');

      //cast values
      $cast.each(function (idx, elem) {
        var $actor = $(constants.selectors.movie.cast.actorFind, this);
        var $charcter = $(constants.selectors.movie.cast.character, this);
        var cast = {
          actor: $actor.text().trim(),
          character: $charcter.text().trim()
        };

        if (!!cast.actor && !!cast.character)
          movie.cast.push({actor: $actor.text().trim(), character: $charcter.text().trim()});
      });

      //storyline values
      movie.storyline = $storyline.text().trim();
    }

    resolve(movie);
  });
};

module.exports = {
  parseMovies: parseMovies,
  parseMovie: parseMovie
};