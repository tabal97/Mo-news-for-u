const { selectArticle, updateArticle, selectAllArticles } = require("../models/articles.js")

exports.getArticle = (req, res, next) => {
    const { articleId } = req.params;
    selectArticle(articleId).then(([[article], total_articles]) => {
        res.status(200).send({ article, total_articles })
    }).catch(next)
}

exports.patchArticle = (req, res, next) => {
    const body = req.body;
    const { articleId } = req.params;
    const votes = body.inc_votes;
    updateArticle(votes, articleId).then(([article]) => {
        res.status(202).send({ article });
    }).catch(next)
}

exports.getAllArticles = (req, res, next) => {
    const { sortBy, orderBy, author, topic, limit, p } = req.query;
    selectAllArticles(sortBy, orderBy, author, topic, limit, p).then(([articles, total_articles]) => {
        res.status(200).send({ articles, total_articles })
    }).catch(next)
}