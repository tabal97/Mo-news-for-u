const connection = require("../db/connection");

exports.selectArticle = article_id => {
    return connection.select("articles.*")
        .from("articles")
        .leftJoin("comments", "comments.article_id", "articles.article_id")
        .groupBy("articles.article_id")
        .count({ comment_count: "comment_id" })
        .where({ "articles.article_id": article_id })
}

exports.updateArticle = (votes = 0, article_id) => {
    return connection("articles")
        .where({ article_id })
        .increment({ votes })
        .returning("*");
}

exports.selectAllArticles = (sortBy = "created_at", dir = "asc", author, topic) => {
    return connection.select("articles.*")
        .from("articles")
        .leftJoin("comments", "comments.article_id", "articles.article_id")
        .groupBy("articles.article_id")
        .count({ comment_count: "comment_id" })
        .orderBy(sortBy, dir)
        .modify(currentQuery => {
            if (author) {
                currentQuery.where("articles.author", author)
            }
            if (topic) {
                currentQuery.where("articles.topic", topic)
            }
        })
}