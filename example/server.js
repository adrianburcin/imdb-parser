/**
 * Created by adrianb on 09/01/16.
 */
var express = require('express');
var app = express(); //Create the Express app
var bodyParser = require('body-parser');
var cors = require('cors');
var imdbParser = require('../lib/imdb-parser');

app.use(cors());

//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var router = express.Router();

//@RequestParams -> query, search, count
router.route('/find').get(function (req, res) {
  var reqParams = {
    query: req.param('query'),
    search: req.param('search'),
    count: req.param('count'),
    page: req.param('page')
  };

  console.log(JSON.stringify(reqParams));

  imdbParser.find(reqParams)
    .then((result) => {
      res.json(result);
    })
    .catch((result) => {
      res.json(result);
    });

});

app.use('/api', router); //This is our route middleware

app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);
});