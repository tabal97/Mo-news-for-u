const { selectAllTopics } = require("../models/topics");

exports.getAllTopics = (req, res, next) => {
    const { limit, p } = req.query;
    selectAllTopics(limit, p).then(([topics, total_topics]) => {
        res.status(200).send({ topics, total_topics })
    }).catch(next)
}