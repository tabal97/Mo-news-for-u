const { insertComment, selectComments } = require("../models/comments");


exports.getCommentsById = (req, res, next) => {
    const { articleId } = req.params;
    selectComments(articleId).then(comments => {
        res.status(200).send({ comments });
    }).catch(next)
}

exports.postComment = (req, res, next) => {
    const body = req.body;
    const { articleId } = req.params;
    insertComment(body, articleId).then(comment => {
        res.status(201).send({ comment });
    }).catch(next)
};