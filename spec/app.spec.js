process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = chai;
const connection = require("../db/connection");
chai.use(require("chai-sorted"));

describe('/api', () => {
    after(() => {
        return connection.destroy();
    });
    beforeEach(() => {
        return connection.seed.run();
    });
    describe('/', () => {
        describe('GET', () => {
            it('status: 200 responds with all the available endpoints of the api', () => {
                return request(app).get("/api").expect(200).then(({ body }) => {
                    expect(body.endpoints).to.be.an('object');
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
        });
    });
    describe('/users', () => {
        describe('/:username', () => {
            describe('GET', () => {
                it('status 200: responds with a user object corresponding to the specified user', () => {
                    return request(app).get("/api/users/butter_bridge").expect(200).then(({ body }) => {
                        expect(body.user).to.be.an("array");
                        expect(body.user.length).to.equal(1);
                        expect(body.user[0]).to.contain.keys(["username", "avatar_url", "name"])
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
                        expect(article).to.be.an("array");
                        expect(article.length).to.equal(1);
                        expect(article[0]).to.contain.keys(["author", "title", "article_id", "body", "topic", "created_at", "votes", "comment_count"])
                    })
                });
            });
            describe('PATCH', () => {
                it('status 202: responds with the updated article', () => {
                    return request(app).patch("/api/articles/2").send({ inc_votes: 2 }).expect(202).then(({ body: { article } }) => {
                        expect(article).to.be.an("array");
                        expect(article.length).to.equal(1);
                        expect(article[0]).to.contain.keys(["author", "title", "article_id", "body", "topic", "created_at", "votes"])
                        expect(article[0].votes).to.equal(2);
                    })
                });
            });
            describe('/comments', () => {
                describe('POST', () => {
                    it('status 201: responds with the posted comment', () => {
                        return request(app).post("/api/articles/2/comments")
                            .send({ username: "butter_bridge", body: "Macs are way better" })
                            .expect(201).then(({ body: { comment } }) => {
                                expect(comment).to.be.an("array");
                                expect(comment[0]).to.contain.keys(["comment_id", "author", "article_id", "votes", "created_at", "body"])
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
                                expect(comments).to.be.sortedBy("created_at")
                            })
                    });
                    it('status 200: respond with array of comments sorted by a query', () => {
                        return request(app)
                            .get("/api/articles/1/comments?sortBy=comment_id")
                            .expect(200)
                            .then(({ body: { comments } }) => {
                                expect(comments).to.be.sortedBy("comment_id")
                            })
                    });
                    it('status 200: respond with array of comments in ordered by a query', () => {
                        return request(app)
                            .get("/api/articles/1/comments?sortBy=comment_id&orderBy=desc")
                            .expect(200)
                            .then(({ body: { comments } }) => {
                                expect(comments).to.be.descendingBy("comment_id")
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
                            expect(articles).to.be.sortedBy("created_at")
                        })
                });
                it('status 200: respond with an array of articles sorted by a passed query', () => {
                    return request(app)
                        .get("/api/articles?sortBy=article_id")
                        .expect(200)
                        .then(({ body: { articles } }) => {
                            expect(articles).to.be.sortedBy("article_id")
                        })
                });
                it('status 200: respond with an array of articles ordered by a passed query', () => {
                    return request(app)
                        .get("/api/articles?sortBy=article_id&orderBy=desc")
                        .expect(200)
                        .then(({ body: { articles } }) => {
                            expect(articles).to.be.descendingBy("article_id")
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
                it('status 200: respond with an array of articles that talk about a particular topic', () => {
                    return request(app)
                        .get("/api/articles?topic=mitch")
                        .expect(200)
                        .then(({ body: { articles } }) => {
                            expect(articles[0].topic).to.equal("mitch");
                            expect(articles).to.have.length(11)
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
                            expect(comment).to.be.an("array");
                            expect(comment).to.have.length(1)
                            expect(comment[0]).to.contain.keys(["comment_id", "author", "article_id", "votes", "created_at", "body"])
                            expect(comment[0].votes).to.equal(16);
                        });
                });
            });
            describe('DELETE', () => {
                it('status 204: deletes a comment', () => {
                    return request(app)
                        .del("/api/comments/2")
                        .expect(204)
                });
            });
        });
    });
});