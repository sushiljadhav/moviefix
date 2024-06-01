# MovieFix

Movie fix is the project of the to building a movie information app that displays a list of movies from The
Movie Database (TMDb) API. The app shows top movies for each year and users can filter by
genre, the app also loads top movies from previous / next years as the user scrolls through the
list.

## Author

-   [@sushiljadhav](https://github.com/sushiljadhav)

## API Reference

```http
https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&primary_release_year=2009&page=1&vote_count.gte=100&with_genres=27&api_key=2dca580c2a14b55200e784d157207b4d
```

| Parameter              | Type     | Description                                    |
| :--------------------- | :------- | :--------------------------------------------- |
| `api_key`              | `string` | **Required**. 2dca580c2a14b55200e784d157207b4d |
| `sort_by`              | `string` | **optional**. popularity.desc                  |
| `primary_release_year` | `string` | **optional**. 2012                             |
| `page`                 | `string` | **optional**. 1                                |
| `vote_count.gte`       | `string` | **optional**. 100                              |
| `with_genres`          | `string` | **optional**. 27                               |

#### Get Base URL Configuration

```http
GET https://api.themoviedb.org/3/configuration?api_key=2dca580c2a14b55200e784d157207b4d
```

| Parameter | Type     | Description                                    |
| :-------- | :------- | :--------------------------------------------- |
| `api_key` | `string` | **Required**. 2dca580c2a14b55200e784d157207b4d |

#### Get Geners List

```http
https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d
```

| Parameter | Type     | Description                                    |
| :-------- | :------- | :--------------------------------------------- |
| `api_key` | `string` | **Required**. 2dca580c2a14b55200e784d157207b4d |

## Run Locally

Clone the project

```bash
git@github.com:sushiljadhav/moviefix.git
```

Go to the project directory

```bash
cd moviefix
```

Rename the .env.example to .env

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
