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
* Open a browser and type in: localhost:8000/api/find?title=**MOVIE_NAME**

## Example:
#### Request
> [GET] localhost:8000/api/find?title=**MOVIE_NAME**  -> returns a list of relevant movies which contains that specified name

#### Reseponse
```
{
  "list": [
    {
      "title": "Straight Outta Compton",
      "year": "2015",
      "otherDetails": "",
      "url": "http://www.imdb.com/title/tt1398426/?ref_=fn_tt_tt_1",
      "posterUrl": "http://ia.media-imdb.com/images/M/MV5BMTA5MzkyMzIxNjJeQTJeQWpwZ15BbWU4MDU0MDk0OTUx._V1_UX32_CR0,0,32,44> _AL_.jpg"
    },
    ...
    {
      "title": "Straight Outta ComptonMiss Holland",
      "year": "2012",
      "otherDetails": "Straight Outta Compton  TV Episode - Miss Holland 2012 TV Series",
      "url": "http://www.imdb.com/title/tt2610902/?ref_=fn_tt_tt_3",
      "posterUrl": "http://ia.media-imdb.com/images/M/MV5BMTM5MTMzMjM0NF5BMl5BanBnXkFtZTcwNDU1NjI4OA@@._V1_UX32_CR0,0,32,44> _AL_.jpg"
    }
  ]
}
```



imdb-parser
