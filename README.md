# NC-News Backend:

This repo serves as a RESTful API for my NC News Frontend. The API is being hosted on Heroku at [here](https://mo-news-for-u.herokuapp.com/api). The frontend site can be found [here](https://mo-news-for-u.netlify.com/).

Northcoders News is a reddit style site that gives users the ability to read posted articles and their related comments alongside the ability to add comments and vote on articles and comments that are of interest to them.

The site is divided up into topics and can be sorted in accordance to a number of queries including,  user interaction and alphabetical.

## Prerequisites:

Firstly, you must have [Node.js](https://nodejs.org/en/) and [PostgreSQL](https://www.postgresql.org/) installed.

## Getting Started:

### Running the repo locally:

First, begin by cloning the repo. After this, you will need to install the relevant dependencies using the command `npm install` which will install any dependencies saved in the package.json file.

For testing and development, you will need to add your own _knexfile.js_, and make sure this is then added to your _.gitignore_ file to avoid it being stored in your repo when you push it up. Here's an example of how the _knexfile.js_ file should look like:

```
const ENV = process.env.NODE_ENV || 'development';
const { DB_URL } = process.env;

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

const customConfigs = {
  development: {
    connection: {
      database: 'nc_news',
      // username: "" << linux users only
      // password: "" << linux users only
    },
  },
  test: {
    connection: {
      database: 'nc_news_test',
      // username: "", << linux users only
      // password: "", << linux users only
    },
  },
  production: {
    connection: `${DB_URL}?ssl=true`,
  },
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
```

- To seed the database, run the script `npm run seed`.
- Then, to run the application, `npm run dev`, and this will start up the local server.

Once you have received the confirmation that your local server is up and running then you can access the API on the browser using the address, `localhost:9090/api`.
This endpoint will show you all the other endpoints that are available for you to use.

## Running Tests: 

To run tests, type `npm test` in the terminal. This will run the tests using [Mocha](https://mochajs.org) test framework, [Chai](https://www.chaijs.com) assertion library and the [SuperTest](https://github.com/visionmedia/supertest) HTTP server testing library. First the API endpoints are tested, followed by the utility functions necessary for sedding the data.


## Built With:

[Express](https://expressjs.com/) - web framework used.

### API Routes:

#### GET

`/api` Serves a json object representing all the available endpoints of the API

`/api/topics` Serves an array of all topics

`/api/articles` Serves an array of all articles

`/api/users/:username` Responds with a a user object with details about the given user

`/api/articles/:article_id` Responds with an article object for the given article ID

`/api/articles/:article_id/comments` When given a valid article ID, responds with an array of comments for that article.

#### PATCH

`/api/articles/:article_id` Accepts an object in the form of `{ inc_votes: newVote}` and responds with the updated article

`/api/comments/:comment_id` Accepts an object in the form of `{ inc_votes: newVote}` and responds with the updated comment.

#### POST

`/api/articles/:article_id/comments` Request body accepts an object in the form of `{username: 'someUsername', body: 'someBody'}` and responds with the posted comment.

#### DELETE

`/api/comments/:comment_id` Deletes the comment given by comment_id and responds with status 204.

