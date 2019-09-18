const { insertComment, selectComments } = require("../models/comments");

exports.postComment = (req, res, next) => {
    const body = req.body;
    const { articleId } = req.params;
    insertComment(body, articleId).then(comment => {
        res.status(201).send({ comment });
    }).catch(next)
};

exports.getCommentsById = (req, res, next) => {
    const { articleId } = req.params;
    const { sortBy, orderBy } = req.query;
    selectComments(articleId, sortBy, orderBy).then(comments => {
        res.status(200).send({ comments });
    }).catch(next)
}