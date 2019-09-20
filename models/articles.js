const connection = require("../db/connection");

exports.selectArticle = article_id => {
    return connection.select("articles.*")
        .from("articles")
        .leftJoin("comments", "comments.article_id", "articles.article_id")
        .groupBy("articles.article_id")
        .count({ comment_count: "comment_id" })
        .where({ "articles.article_id": article_id }).then(article => {
            if (article.length) { return article }
            else return Promise.reject({ status: 404, msg: "Article Not Found" })
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
            else if (author && topic) return Promise.all([articles, checkAuthorExists(author), checkTopicExists(topic)])
            else if (author) return Promise.all([articles, checkAuthorExists(author)])
            else if (topic) return Promise.all([articles, checkTopicExists(topic)])
            else return Promise.reject({ status: 404, msg: "No Articles in the Database" })
        }).then(([articles]) => {
            return articles
        })
}

function checkAuthorExists(username) {
    return connection.first('*')
        .from('users')
        .where({ username })
        .then(author => {
            if (!author) return Promise.reject({ status: 404, msg: 'Author Does not Exist' })
            return true;
        })
}

const checkTopicExists = slug => {
    return connection.first('*')
        .from('topics')
        .where({ slug })
        .then(topic => {
            if (!topic) return Promise.reject({ status: 404, msg: 'Topic Does not Exist' })
            return true;
        })
}