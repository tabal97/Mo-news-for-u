process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = chai;
const connection = require("../db/connection");
chai.use(require("chai-sorted"));

describe('/api', () => {
    after(() => {
        200
        return connection.destroy();
    });
    beforeEach(() => {
        return connection.seed.run();
    });
    describe('/', () => {
        describe('GET', () => {
            it('status 200: responds with all the available endpoints of the api', () => {
                return request(app).get("/api").expect(200).then(({ body }) => {
                    expect(body.endpoints).to.be.an('object');
                })
            });
            it('status 400: responds with error message when an invalid endpoint is requested', () => {
                return request(app)
                    .get("/invalid_endpoint")
                    .expect(404)
                    .then(({ body }) => {
                        expect(body.msg).to.equal("Route Not Found")
                    })
            });
            it('status 405: invalid method', () => {
                return request(app)
                    .post("/api")
                    .expect(405)
                    .then(({ body: { msg } }) => {
                        expect(msg).to.equal("Invalid Method")
                    })
            });
        });
    });
    describe('/topics', () => {
        describe('GET', () => {
            it('status 200: responds with an array of all the topics', () => {
                return request(app).get("/api/topics").expect(200).then(({ body }) => {
                    expect(body.topics).to.be.an("array");
                })
            });
            it('status 405: invalid method', () => {
                return request(app)
                    .post("/api/topics")
                    .expect(405)
                    .then(({ body: { msg } }) => {
                        expect(msg).to.equal("Invalid Method")
                    })
            });
        });
    });
    describe('/users', () => {
        describe('/:username', () => {
            describe('GET', () => {
                it('status 200: responds with a user object corresponding to the specified user', () => {
                    return request(app).get("/api/users/lurker").expect(200).then(({ body: { user } }) => {
                        expect(user).to.contain.keys(["username", "avatar_url", "name"])
                    })
                });
                it('status 404: responds with "Not Found" if the username does not exist', () => {
                    return request(app).get("/api/users/non_existent_user").expect(404).then(({ body }) => {
                        expect(body.msg).to.equal("User does not exist")
                    })
                });
                it('status 405: invalid method', () => {
                    return request(app)
                        .post("/api/users/lurker")
                        .expect(405)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal("Invalid Method")
                        })
                });
            });
        });
    });
    describe('/articles', () => {
        describe('/:articleId', () => {
            describe('GET', () => {
                it('status 200: responds with the article object for the corresponding article id', () => {
                    return request(app).get("/api/articles/2").expect(200).then(({ body: { article } }) => {
                        expect(article).to.contain.keys(["author", "title", "article_id", "body", "topic", "created_at", "votes", "comment_count"])
                    })
                });
                it('status 404: responds with "Aritcle Not Found"', () => {
                    return request(app)
                        .get("/api/articles/9000")
                        .expect(404)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal("Article Not Found")
                        })
                });
                it('status 400: responds with "Bad Request"', () => {
                    return request(app)
                        .get("/api/articles/notANumber")
                        .expect(400)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal("Bad Request")
                        })
                });
            });
            describe('PATCH', () => {
                it('status 202: responds with the updated article', () => {
                    return request(app)
                        .patch("/api/articles/2")
                        .send({ inc_votes: 2 })
                        .expect(202)
                        .then(({ body: { article } }) => {
                            expect(article).to.contain.keys(["author", "title", "article_id", "body", "topic", "created_at", "votes"])
                            expect(article.votes).to.equal(2);
                        })
                });
                it('status 400: no request body', () => {
                    return request(app)
                        .patch("/api/articles/2")
                        .expect(400)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal("Bad Request")
                        })
                });
                it('status 400: invalid request body', () => {
                    return request(app)
                        .patch("/api/articles/9000")
                        .send({ inc_votes: "anything" })
                        .expect(400)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal("Bad Request")
                        });
                });
                it('status 202: ignores all other properties added to the request body', () => {
                    return request(app)
                        .patch("/api/articles/2")
                        .send({ inc_votes: 2, other_votes: "a void vote" })
                        .expect(202)
                        .then(({ body: { article } }) => {
                            expect(article).to.contain.keys(["author", "title", "article_id", "body", "topic", "created_at", "votes"])
                            expect(article.votes).to.equal(2);
                        })
                });
                it('status 404: responds with "Article Not Found"', () => {
                    return request(app)
                        .patch("/api/articles/9000")
                        .send({ inc_votes: 2 })
                        .expect(404)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal("Article Not Found")
                        });
                });
                it('status 400: responds with "Bad Request"', () => {
                    return request(app)
                        .patch("/api/articles/not_a_number")
                        .send({ inc_votes: 2 })
                        .expect(400)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal("Bad Request")
                        })
                });
                it('status 405: invalid method', () => {
                    return request(app)
                        .delete("/api/articles/2")
                        .expect(405)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal("Invalid Method")
                        })
                });
                describe('/comments', () => {
                    describe('POST', () => {
                        it('status 201: responds with the posted comment', () => {
                            return request(app).post("/api/articles/2/comments")
                                .send({ username: "butter_bridge", body: "Macs are way better" })
                                .expect(201).then(({ body: { comment } }) => {
                                    expect(comment).to.contain.keys(["comment_id", "author", "article_id", "votes", "created_at", "body"])
                                })
                        });
                    });
                    describe('GET', () => {
                        it('status 200: respond with an array of comments for a given articleId', () => {
                            return request(app)
                                .get("/api/articles/1/comments")
                                .expect(200)
                                .then(({ body: { comments } }) => {
                                    expect(comments).to.be.an("array");
                                    expect(comments[0]).to.contain.keys(["comment_id", "votes", "created_at", "author", "body"])
                                })
                        });
                        it('status 200: respond with array of comments sorted by created_at by default', () => {
                            return request(app)
                                .get("/api/articles/1/comments")
                                .expect(200)
                                .then(({ body: { comments } }) => {
                                    expect(comments).to.be.descendingBy("created_at")
                                })
                        });
                        it('status 200: respond with array of comments sorted by a query', () => {
                            return request(app)
                                .get("/api/articles/1/comments?sortBy=comment_id")
                                .expect(200)
                                .then(({ body: { comments } }) => {
                                    expect(comments).to.be.descendingBy("comment_id")
                                })
                        });
                        it('status 200: respond with array of comments in ordered by a query', () => {
                            return request(app)
                                .get("/api/articles/1/comments?sortBy=comment_id&orderBy=asc")
                                .expect(200)
                                .then(({ body: { comments } }) => {
                                    expect(comments).to.be.ascendingBy("comment_id")
                                })
                        });
                        it('status 405: invalid method', () => {
                            return request(app)
                                .delete("/api/articles/1/comments")
                                .expect(405)
                                .then(({ body: { msg } }) => {
                                    expect(msg).to.equal("Invalid Method")
                                })
                        });
                    });
                });
            });
            describe('/', () => {
                describe('GET', () => {
                    it('status 200: respond with an array of all the articles with the comment_count property in each article', () => {
                        return request(app)
                            .get("/api/articles")
                            .expect(200)
                            .then(({ body: { articles } }) => {
                                expect(articles[0]).to.contain.keys(["comment_count"])
                            })
                    });
                    it('status 200: respond with an array of articles sorted by created_at by default', () => {
                        return request(app)
                            .get("/api/articles")
                            .expect(200)
                            .then(({ body: { articles } }) => {
                                expect(articles).to.be.descendingBy("created_at")
                            })
                    });
                    it('status 200: respond with an array of articles sorted by a passed query', () => {
                        return request(app)
                            .get("/api/articles?sortBy=article_id")
                            .expect(200)
                            .then(({ body: { articles } }) => {
                                expect(articles).to.be.descendingBy("article_id")
                            })
                    });
                    it('status 400: invalid column to sortBy', () => {
                        return request(app)
                            .get("/api/articles?sortBy=telephone")
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal("Bad Request")
                            })
                    });
                    it('status 200: respond with an array of articles ordered by a passed query', () => {
                        return request(app)
                            .get("/api/articles?sortBy=article_id&orderBy=asc")
                            .expect(200)
                            .then(({ body: { articles } }) => {
                                expect(articles).to.be.ascendingBy("article_id")
                            })
                    });
                    it('status 200: respond with an array of articles written by an author', () => {
                        return request(app)
                            .get("/api/articles?author=icellusedkars")
                            .expect(200)
                            .then(({ body: { articles } }) => {
                                expect(articles[0].author).to.equal("icellusedkars");
                                expect(articles).to.have.length(6)
                            })
                    });
                    it('status 404: invalid author query', () => {
                        return request(app)
                            .get("/api/articles?author=mo_tabal")
                            .expect(404)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal("Articles Not Found")
                            })
                    });
                    it('status 404: no articles associated with author', () => {
                        return request(app)
                            .get("/api/articles?author=lurker")
                            .expect(404)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal("Articles Not Found")
                            })
                    });
                    it('status 200: respond with an array of articles that talk about a particular topic', () => {
                        return request(app)
                            .get("/api/articles?topic=mitch")
                            .expect(200)
                            .then(({ body: { articles } }) => {
                                expect(articles[0].topic).to.equal("mitch");
                                expect(articles).to.have.length(11)
                            })
                    });
                    it('status 404: no articles associated with topic', () => {
                        return request(app)
                            .get("/api/articles?topic=paper")
                            .expect(404)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal("Articles Not Found")
                            })
                    });
                    it('status 404: invalid topic query', () => {
                        return request(app)
                            .get("/api/articles?topic=buzz_lightyear")
                            .expect(404)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal("Articles Not Found")
                            })
                    });
                    it('status 405: invalid method', () => {
                        return request(app)
                            .delete("/api/articles")
                            .expect(405)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal("Invalid Method")
                            })
                    });
                });
            });
        });
        describe('/comments', () => {
            describe('/:comment_id', () => {
                describe('PATCH', () => {
                    it('status 202: responds with the updated comment', () => {
                        return request(app)
                            .patch("/api/comments/2")
                            .send({ inc_votes: 2 })
                            .expect(202)
                            .then(({ body: { comment } }) => {
                                expect(comment).to.contain.keys(["comment_id", "author", "article_id", "votes", "created_at", "body"])
                                expect(comment.votes).to.equal(16);
                            });
                    });
                    it('status 404: comment_id not found', () => {
                        return request(app)
                            .patch("/api/comments/9000")
                            .send({ inc_votes: 2 })
                            .expect(404)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal("Comment Not Found")
                            })
                    });
                    it('status 400: invalid comment_id parameter', () => {
                        return request(app)
                            .patch("/api/comments/number_in_disguise")
                            .send({ inc_votes: 2 })
                            .expect(400)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal("Bad Request")
                            })
                    });
                    it('status 400: invalid request body', () => {
                        return request(app)
                            .patch("/api/comments/2")
                            .send({ inc_votes: "notice me" })
                            .expect(400)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal("Bad Request")
                            })
                    });
                    it('status 202: ignore other properties in the request body', () => {
                        return request(app)
                            .patch("/api/comments/2")
                            .send({ inc_votes: 4, bad_prop: 12 })
                            .expect(202)
                            .then(({ body: { comment } }) => {
                                expect(comment).to.contain.keys(["comment_id", "author", "article_id", "votes", "created_at", "body"])
                                expect(comment.votes).to.equal(18);
                            });
                    });
                    it('status 400: no request body', () => {
                        return request(app)
                            .patch("/api/comments/2")
                            .expect(400)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal("Bad Request")
                            })
                    });
                });
                describe('DELETE', () => {
                    it('status 204: deletes a comment', () => {
                        return request(app)
                            .delete("/api/comments/2")
                            .expect(204)
                    });
                    it('status 404: comment_id not found', () => {
                        return request(app)
                            .delete("/api/comments/9000")
                            .expect(404)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal("Comment Not Found")
                            })
                    });
                    it('status 400: invalid comment_id requested', () => {
                        return request(app)
                            .delete("/api/comments/i_promise_im_a_number")
                            .expect(400)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal("Bad Request")
                            })
                    });
                    it('status 405: invalid method', () => {
                        return request(app)
                            .get("/api/comments/2")
                            .expect(405)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal("Invalid Method")
                            })
                    });
                });
            });
        });
    });
});