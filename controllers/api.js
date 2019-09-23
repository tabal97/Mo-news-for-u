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
                    "topics": [
                        {
                            "slug": "football",
                            "description": "Footie!"
                        }
                    ]
                }
            },
            "GET /api/articles": {
                "description": "serves an array of all topics",
                "queries": [
                    "author",
                    "topic",
                    "sort_by",
                    "order"
                ],
                "exampleResponse": {
                    "articles": [
                        {
                            "article_id": 28,
                            "title": "High Altitude Cooking",
                            "body": "Most backpacking trails vary only a few thousand feet elevation. However, many trails can be found above 10,000 feet. But what many people don’t take into consideration at these high altitudes is how these elevations affect their cooking.",
                            "votes": 0,
                            "topic": "cooking",
                            "author": "happyamy2016",
                            "created_at": "2018-05-27T03:32:28.514Z",
                            "comment_count": "5"
                        }
                    ]
                }
            }
        }
    }).catch(next)
}