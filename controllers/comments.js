const { insertComment, selectComments, updateComment, removeComment } = require("../models/comments");

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

exports.patchComment = (req, res, next) => {
    const { inc_votes } = req.body;
    const { comment_id } = req.params;
    updateComment(comment_id, inc_votes).then(comment => {
        res.status(202).send({ comment })
    }).catch(next)
}

exports.deleteComment = (req, res, next) => {
    const { comment_id } = req.params;
    removeComment(comment_id).then(() => {
        res.sendStatus(204);
    }).catch(next)
}