const { selectArticle, updateArticle, selectAllArticles } = require("../models/articles.js")

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

exports.getAllArticles = (req, res, next) => {
    const { sortBy, orderBy, author } = req.query;
    selectAllArticles(sortBy, orderBy, author).then(articles => {
        res.status(200).send({ articles })
    }).catch(next)
}