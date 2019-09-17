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
                    return request(app).get("/api/articles/2").expect(200).then(({ body }) => {
                        expect(body.article).to.be.an("array");
                        expect(body.article.length).to.equal(1);
                        expect(body.article[0]).to.contain.keys(["author", "title", "article_id", "body", "topic", "created_at", "votes", "comment_count"])
                    })
                });
            });
            describe('PATCH', () => {
                it('status 202: responds with the updated article', () => {
                    return request(app).patch("/api/articles/2").send({ inc_votes: 2 }).expect(202).then(({ body }) => {
                        expect(body.article).to.be.an("array");
                        expect(body.article.length).to.equal(1);
                        expect(body.article[0]).to.contain.keys(["author", "title", "article_id", "body", "topic", "created_at", "votes"])
                        expect(body.article[0].votes).to.equal(2);
                    })
                });
            });
            describe('/comments', () => {
                describe('POST', () => {
                    it('status 201: responds with the posted comment', () => {
                        return request(app).post("/api/articles/2/comments")
                            .send({ username: "butter_bridge", body: "Macs are way better" })
                            .expect(201).then(({ body }) => {
                                expect(body.comment).to.be.an("array");
                                expect(body.comment[0]).to.contain.keys(["comment_id", "author", "article_id", "votes", "created_at", "body"])
                            })
                    });
                });
                describe('GET', () => {
                    it('status 200: respond with an array of comments for a given articleId', () => {
                        return request(app).get("/api/articles/1/comments").expect(200).then(({ body }) => {
                            expect(body.comments).to.be.an("array");
                            expect(body.comments[0]).to.contain.keys(["comment_id", "votes", "created_at", "author", "body"])
                        })
                    });
                    it('status 200: respond with array of comments sorted by commentId by default', () => {
                        return request(app).get("/api/articles/1/comments").expect(200).then(({ body }) => {
                            expect(body.comments).to.be.sortedBy("comment_id")
                        })
                    });
                });
            });
        });

    });
});