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
* Open a browser and type in: http://localhost:8000/api/find?query=**QUERY**&search=**SEARCH**&count=**COUNT**&page=**PAGE**

## Example:
#### Request
```
> [GET] http://localhost:8000/api/find?query=**QUERY**&search=**SEARCH**&count=**COUNT**&page=**PAGE**  
Where:
**QUERY** - movie, actor or episode name/title
**SEARCH** - ONLY 3 types of search: _all, titles, names, episodes_
**COUNT** - (optional - if not specified will fetch all imdb results) number of returned results
**PAGE** - (optional - if not specified will fetch only first page) used for pagination function by return count **COUNT** number
(you can use _count_ and _page_ to get chunks of results for example: ...&count=3&page=1 will fetch only 3 results from page number 1. This meaning that next time you'll request page 2, then next 3 results from imdb will be delivered.)

-> returns a list of relevant movies/actors/episodes which contains that specified query words
```

#### Reseponse
```
{
  "list": [
    {
      "imdbId": "tt1663202",
      "title": "The Revenant",
      "year": "2015",
      "details": "",
      "url": "http://www.imdb.com/title/tt1663202/?ref_=fn_al_tt_1",
      "posterUrl": "http://ia.media-imdb.com/images/M/MV5BMjU4NDExNDM1NF5BMl5BanBnXkFtZTgwMDIyMTgxNzE@._V1_UX32_CR0,0,32,44_AL_.jpg"
    },
   ...
    {
      "imdbId": "tt3300078",
      "title": "The Revenant",
      "year": "2012",
      "details": "",
      "url": "http://www.imdb.com/title/tt3300078/?ref_=fn_al_tt_3",
      "posterUrl": "http://ia.media-imdb.com/images/M/MV5BMTU3MzIwNjE3MV5BMl5BanBnXkFtZTgwMjQ2ODU1MDE@._V1_UX32_CR0,0,32,44_AL_.jpg"
    }
  ]
}
```



imdb-parser
