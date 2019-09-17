const { selectArticle, updateArticle, insertComment } = require("../models/articles.js")

exports.getArticle = (req, res, next) => {
    const { articleId } = req.params;
    selectArticle(articleId).then(article => {
        res.status(200).send({ article })
    }).catch(next)
}

exports.patchArticle = (req, res, next) => {
    const body = req.body;
    const { articleId } = req.params;
    const votes = body.inc_votes;
    updateArticle(votes, articleId).then(article => {
        res.status(202).send({ article });
    }).catch(next)
}

exports.postComment = (req, res, next) => {
    const body = req.body;
    const { articleId } = req.params;
    console.log(body, articleId)
    insertComment(body, articleId).then(comment => {
        res.status(201).send({ comment });
    }).catch(next)
}