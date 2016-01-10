/**
 * Created by adrianb on 10/01/16.
 */
var http = require('http');
var cheerio = require('cheerio');

var imdbUrls = {
    base: 'http://www.imdb.com',
    findByTitle: '/find?q=%TITLE%&s=tt'
};

function ImdbParser() {}
ImdbParser.prototype.getContentFromUrl = function(url) {
   return new Promise((resolve, reject) => {
        var request = http.request(url, (response) => {
            var content = [];
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                console.log(chunk);
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

ImdbParser.prototype.parseMovies = function(htmlString) {
    return new Promise((resolve, reject) => {
            var movies = { list: [] };
    var i = 0;

            if(htmlString && !htmlString.error) {
                var $ = cheerio.load(htmlString);
                $('.pagecontent table.findList').first().find('tr').each(function() {
                    var title = $('td.result_text a', this).text();
                    var url = $('td.result_text a', this).attr('href');
                    var otherDetailsUnformatted = $('td.result_text', this).text().replace(title, '').trim();
                    var year = /\d{4}/.exec(otherDetailsUnformatted) && /\d{4}/.exec(otherDetailsUnformatted)[0];
                    var otherDetails = otherDetailsUnformatted.replace('(' + year + ')', '')
                        .replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '')
                        .trim();
                    var posterUrl = $('td.primary_photo a img', this).attr('src');

                    console.log(i + ' - parsing movie: ' + title);
                    i++;

                    movies.list.push({ title: title,
                        year: year,
                        otherDetails: otherDetails,
                        url: imdbUrls.base + url,
                        posterUrl: posterUrl
                    });
                });
            }

            resolve(movies);
        });
};

ImdbParser.prototype.parseMovieDetails = function(htmlString) {};

//Module exports
module.exports.find = function(title) {
    return new Promise((resolve, reject) => {
         var imdbParser = new ImdbParser();
        var url = imdbUrls.base + imdbUrls.findByTitle.replace('%TITLE%', title);

        function parseAndResolve(html) {
            imdbParser.parseMovies(html)
                      .then((jsonResponse) => {
                        resolve(jsonResponse);
                      });
        }

        imdbParser.getContentFromUrl(url)
                  .then((htmlString) => {
                        parseAndResolve(htmlString);
                  })
                  .catch((error) => {
                        parseAndResolve(htmlString);
                  });
    });
};

module.exports.getDetails = function(movie) {
};