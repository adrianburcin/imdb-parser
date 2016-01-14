/**
 * Created by adrianb on 11/01/16.
 */
//URLs
var imdbUrls = {
  base: 'www.imdb.com',
  find: '/find',
  title: '/title'
};

//maps
var queryParams = {
  query: 'q',
  search: 's',
  count: 'count',
  page: 'page'
};

var searchMap = {
  titles: 'tt',
  episodes: 'ep',
  names: 'nm',
  all: 'all'
};

// selectors
var moviesList = {
  titles: '.pagecontent table.findList',
  titleRaw: 'td.result_text',
  poster: 'td.primary_photo a img'
};

var movieDetails = {
  topSegment: '#content-2-wide #main_top',
  bottomSegment: '#content-2-wide #main_bottom',
  posterFind: '#img_primary a img',
  titleFind: '#overview-top .header [itemprop="name"]',
  videoFind: '#titleMediaStrip #combined-videos .video_slate',
  infos: {
    rootFind: '#overview-top .infobar',
    durationFind: '[itemprop="duration"]',
    genreFind: '[itemprop="genre"]',
    datePublishedFind: '[itemprop="datePublished"]'
  },
  overview: {
    rootFind: '#overview-top .star-box.giga-star .star-box-details',
    ratingValueFind: '[itemprop="ratingValue"]',
    ratingCountFind: '[itemprop="ratingCount"]'
  },
  details: {
    rootFind: '#overview-top',
    descriptionFind: '[itemprop="description"]',
    directorsFind: '[itemprop="director"] [itemprop="name"]',
    creatorsFind: '[itemprop="creator"] [itemprop="name"]',
    actorsFind: '[itemprop="actors"] [itemprop="name"]'
  },
  cast: {
    rootFind: '#titleCast .cast_list tr',
    actorFind: '[itemprop="actor"] [itemprop="name"]',
    character: '.character a'
  },
  storylineFind: '#titleStoryLine [itemprop="description"] p'
};

module.exports = {
  imdbUrls: imdbUrls,
  searchMap: searchMap,
  queryParams: queryParams,
  selectors: {
    movies: moviesList,
    movie: movieDetails
  }
};