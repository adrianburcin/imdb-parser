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
* Open a browser and type in: http://localhost:8000/api/find?query=**QUERY**&search=**SEARCH**&count=**COUNT**&page=**PAGE** OR http://localhost:8000/api/movie?id=**ID**

# Find movies
## Example:
#### Request
```
> [GET] http://localhost:8000/api/find?query=**QUERY**&search=**SEARCH**&count=**COUNT**&page=**PAGE**  

Where:
**QUERY** - movie, actor or episode name/title
**SEARCH** - ONLY 3 types of search: _all, titles, names, episodes_
**COUNT** - (optional - if not specified will fetch all imdb results) number of returned results
**PAGE** - (optional - if not specified will fetch only first page) used for pagination function by return count **COUNT** number
(you can use count and page to get chunks of results for example: ...&count=3&page=1 will fetch only 3 results from page number 1. This meaning that next time you'll request page 2, then next 3 results from imdb will be delivered.)

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

# Get movie details
## Example:
#### Request
```
> [GET] http://localhost:8000/api/movie?id=**ID**

Where:
**ID** - IMDb movie id (eg: tt1663202)

-> returns a list of a movie details
```

#### Reseponse
```
{
  "id": "tt1663202",
  "title": "The Revenant",
  "posterUrl": "http://ia.media-imdb.com/images/M/MV5BMjU4NDExNDM1NF5BMl5BanBnXkFtZTgwMDIyMTgxNzE@._V1_SX214_AL_.jpg",
  "videoUrl": "http://www.imdb.com/video/imdb/vi1159442969?ref_=tt_pv_vi_aiv_1",
  "infos": {
    "duration": "156 min",
    "genre": "Adventure, Drama, Thriller",
    "datePublished": "2016-01-22"
  },
  "overview": {
    "ratingValue": "8.3 / 10",
    "ratingCount": "79,104"
  },
  "details": {
    "description": "A frontiersman on a fur trading expedition in the 1820's fights for survival after being mauled by a bear and left for dead by members of his own hunting team.",
    "directors": "Alejandro GonzÃ¡lez IÃ±Ã¡rritu",
    "creators": "Mark L. Smith, Alejandro GonzÃ¡lez IÃ±Ã¡rritu",
    "actors": "Leonardo DiCaprio, Tom Hardy, Will Poulter"
  },
  "cast": [
    {
      "actor": "Leonardo DiCaprio",
      "character": "Hugh Glass"
    },
    {
      "actor": "Tom Hardy",
      "character": "John Fitzgerald"
    },
    {
      "actor": "Domhnall Gleeson",
      "character": "Captain Andrew Henry"
    },
    {
      "actor": "Will Poulter",
      "character": "Bridger"
    },
    {
      "actor": "Forrest Goodluck",
      "character": "Hawk"
    },
    {
      "actor": "Paul Anderson",
      "character": "Anderson"
    },
    {
      "actor": "Kristoffer Joner",
      "character": "Murphy"
    }
  ],
  "storyline": "Inspired by true events, THE REVENANT captures one man's epic adventure of survival and the extraordinary power of the human spirit. In an expedition of the uncharted American wilderness, legendary explorer Hugh Glass (Leonardo DiCaprio) is brutally attacked by a bear and left for dead by members of his own hunting team. In a quest to survive, Glass endures unimaginable grief as well as the betrayal of his confidant John Fitzgerald (Tom Hardy). Guided by sheer will and the love of his family, Glass must navigate a vicious winter in a relentless pursuit to live and find redemption.                Written by\n20th Century Fox"
}
```


imdb-parser
