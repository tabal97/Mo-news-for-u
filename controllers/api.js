exports.getApi = (req, res, next) => {
    res.status(200).send({
        "endpoints": {
            "GET /api": {
                "description": "serves up a json representation of all the available endpoints of the api"
            },
            "GET /api/topics": {
                "description": "serves an array of all topics",
                "queries": [],
                "exampleResponse": {
                    "topics": [{
                        "slug": "football",
                        "description": "Footie!"
                    }]
                }
            },
            "GET /api/articles": {
                "description": "serves an array of all articles",
                "queries": [
                    "author",
                    "topic",
                    "sort_by",
                    "order"
                ],
                "exampleResponse": {
                    "articles": [{
                        "title": "Seafood substitutions are increasing",
                        "topic": "cooking",
                        "author": "weegembump",
                        "body": "Text from the article..",
                        "created_at": 1527695953341
                    }]
                }
            },
            "GET /api/users/:username": {
                "description": "responds with a a user object with details about the given user",
                "queries": [],
                "exampleResponse": {
                    "user": {
                        "username": "butter_bridge",
                        "avatar_url": "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
                        "name": "jonny"
                    }
                }
            },
            "GET /api/articles/:article_id": {
                "description": "responds with an article object for the given article id",
                "queries": [],
                "exampleResponse": {
                    "article": {
                        "article_id": 2,
                        "title": "Sony Vaio; or, The Laptop",
                        "body": "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
                        "votes": 0,
                        "topic": "mitch",
                        "author": "icellusedkars",
                        "created_at": "2014-11-16T00: 00: 00.000Z",
                        "comment_count": "0"
                    }
                }
            },
            "PATCH /api/articles/:article_id": {
                "description": "accepts object in the form of `{ inc_votes: newVote }` and responds with the updated article",
                "queries": [],
                "exampleResponse": {
                    "article": {
                        "article_id": 2,
                        "title": "Sony Vaio; or, The Laptop",
                        "body": "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
                        "votes": 0,
                        "topic": "mitch",
                        "author": "icellusedkars",
                        "created_at": "2014-11-16T00: 00: 00.000Z",
                        "comment_count": "0"
                    }
                }
            },
            "POST /api/articles/:article_id/comments": {
                "description": "request body accepts an object in the form of `{username: 'someusername', body: 'some body'}` and responds with the posted comment",
                "queries": [],
                "exampleResponse": {
                    "comment": {
                        "comment_id": 19,
                        "author": "lurker",
                        "article_id": 4,
                        "votes": 0,
                        "created_at": "2019-06-22T23: 00: 00.000Z",
                        "body": "if you like sprints and katas you should check out Northcoders :P"
                    }
                }
            },
            "GET /api/articles/:article_id/comments": {
                "description": "when given a valid article id responds with an array of comments for that article id",
                "queries": ["sort_by", "order"],
                "exampleResponse": {
                    "comments": [{
                        "comment_id": 1,
                        "author": "butter_bridge",
                        "article_id": 9,
                        "votes": 16,
                        "created_at": "2017-11-22T00: 00: 00.000Z",
                        "body": "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
                    },
                    {
                        "comment_id": 17,
                        "author": "icellusedkars",
                        "article_id": 9,
                        "votes": 20,
                        "created_at": "2001-11-26T00: 00: 00.000Z",
                        "body": "The owls are not what they seem."
                    }
                    ]
                }
            },
            "PATCH /api/comments/:comment_id": {
                "description": "accepts an object in the form `{ inc_votes: newVote }` and responds with the updated comment",
                "queries": [],
                "exampleResponse": {
                    "comment": {
                        "comment_id": 1,
                        "author": "butter_bridge",
                        "article_id": 9,
                        "votes": 17,
                        "created_at": "2017-11-22T00: 00: 00.000Z",
                        "body": "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
                    }
                }
            },
            "DELETE /api/comments/:comment_id": {
                "description": "deletes the comment given by comment_id and responds with status 204",
                "queries": [],
                "exampleResponse": {}
            }
        }
    }).catch(next)
}