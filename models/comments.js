const connection = require("../db/connection");

exports.insertComment = (newComment, article_id) => {
    const { username, body } = newComment;
    return connection.insert({ author: username, body, article_id }, "*")
        .into("comments")
}

exports.selectComments = (article_id, sortBy = "created_at", dir = "desc") => {
    return connection.select("comment_id", "votes", "created_at", "author", "body")
        .from("comments")
        .orderBy(sortBy, dir)
        .where({ article_id })
};

exports.updateComment = (comment_id, votes) => {
    return connection("comments")
        .where({ comment_id })
        .increment({ votes })
        .returning("*").then(comment => {
            if (comment.length) { return comment }
            else return Promise.reject({ status: 404, msg: "Comment Not Found" })
        })
}

exports.removeComment = (comment_id) => {
    return connection("comments")
        .where({ comment_id })
        .del().then(deleteCounter => {
            if (deleteCounter) { return deleteCounter }
            return Promise.reject({ status: 404, msg: "Comment Not Found" })
        })
}