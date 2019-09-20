const connection = require("../db/connection");
const { checkTopicExists, checkAuthorExists } = require("../utils");
const { countArticles } = require("../utils")

exports.selectArticle = article_id => {
    return connection.select("articles.*")
        .from("articles")
        .leftJoin("comments", "comments.article_id", "articles.article_id")
        .groupBy("articles.article_id")
        .count({ comment_count: "comment_id" })
        .where({ "articles.article_id": article_id }).then(article => {
            if (article.length) { return article }
            else return Promise.reject({ status: 404, msg: "Article Not Found" })
        }).then(article => {
            return Promise.all([article, countArticles()])
        })
}

exports.updateArticle = (votes, article_id) => {
    return connection("articles")
        .where({ article_id })
        .increment({ votes })
        .returning("*").then(article => {
            if (article.length) { return article }
            else return Promise.reject({ status: 404, msg: "Article Not Found" })
        })
}

exports.selectAllArticles = (sortBy = "created_at", dir = "desc", author, topic, limit = 3, p = 1) => {
    return connection.select("articles.*")
        .from("articles")
        .leftJoin("comments", "comments.article_id", "articles.article_id")
        .groupBy("articles.article_id")
        .count({ comment_count: "comment_id" })
        .orderBy(sortBy, dir)
        .limit(limit)
        .offset((p - 1) * limit)
        .modify(currentQuery => {
            if (author) {
                currentQuery.where("articles.author", author)
            }
            if (topic) {
                currentQuery.where("articles.topic", topic)
            }
        }).then(articles => {
            if (articles.length) { return [articles] }
            else if (author && topic) return Promise.all([articles, checkAuthorExists(author, connection), checkTopicExists(topic, connection)])
            else if (author) return Promise.all([articles, checkAuthorExists(author, connection)])
            else if (topic) return Promise.all([articles, checkTopicExists(topic, connection)])
            else return Promise.reject({ status: 404, msg: "No Articles in the Database" })
        }).then(([articles]) => {
            return articles
        }).then(articles => {
            return Promise.all([articles, countArticles()])
        })
}