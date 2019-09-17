const connection = require("../db/connection");

exports.selectArticle = article_id => {
    return connection.select("articles.*")
        .from("articles")
        .leftJoin("comments", "comments.article_id", "articles.article_id")
        .groupBy("articles.article_id").count({ comment_count: "comments.article_id" }).where({ "articles.article_id": article_id }).catch(console.log)
}

exports.updateArticle = (votes = 0, article_id) => {
    return connection("articles").where({ article_id }).increment({ votes }).returning("*");
}
