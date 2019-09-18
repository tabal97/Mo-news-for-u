const connection = require("../db/connection");

exports.insertComment = (newComment, article_id) => {
    const { username, body } = newComment;
    return connection.insert({ author: username, body, article_id }, "*")
        .into("comments")
}

exports.selectComments = (article_id, sortBy = "created_at", dir = "asc") => {
    return connection.select("comment_id", "votes", "created_at", "author", "body")
        .from("comments")
        .orderBy(sortBy, dir)
        .where({ article_id })
}