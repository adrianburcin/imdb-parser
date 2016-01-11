# imdb-parser
**The imdb-parser is still in progress.**

The functionality is implemented in _example/server.js_ file so you can simply use that as a step by step guide.
Basically, for now, you can start your node server and load a list of movies from IMDb.

## How-to:
* Download a copy of the project
* Be sure you have [NodeJS](https://nodejs.org/) installed on your computer
* Navigate to the root of the project (imdb-parser)
* Run the following commands in terminal: **npm install**
* After everything was installed run: **npm start** (or _node example/server.js_)
* Open a browser and type in: http://localhost:8000/api/find?query=**MOVIE_NAME/ACTOR_NAME/EPISODE_NAME**&search=**all/titles/names/episodes**&count=**5 - number**

## Example:
#### Request
> [GET] http://localhost:8000/api/find?query=**MOVIE_NAME/ACTOR_NAME/EPISODE_NAME**&search=**all/titles/names/episodes**&count=**5 - number**  -> returns a list of relevant movies/actors/episodes which contains that specified query words

#### Reseponse
```
{
  "list": [
    {
      "imdbId": "tt0120338",
      "title": "Titanic",
      "year": "1997",
      "details": "",
      "url": "http://www.imdb.com/title/tt0120338/?ref_=fn_tt_tt_1",
      "posterUrl": "http://ia.media-imdb.com/images/M/MV5BMjExNzM0NDM0N15BMl5BanBnXkFtZTcwMzkxOTUwNw@@._V1_UX32_CR0,0,32,44_AL_.jpg"
    },
    ...
    {
      "imdbId": "tt1869152",
      "title": "Titanic",
      "year": "2012",
      "details": "TV Mini-Series",
      "url": "http://www.imdb.com/title/tt1869152/?ref_=fn_tt_tt_2",
      "posterUrl": "http://ia.media-imdb.com/images/M/MV5BMTcxNzYxOTAwMF5BMl5BanBnXkFtZTcwNzU3Mjc2Nw@@._V1_UY44_CR0,0,32,44_AL_.jpg"
    }
  ]
}
```



imdb-parser
