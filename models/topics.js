const connection = require("../db/connection");
const { countTopics } = require("../utils")


exports.selectAllTopics = (limit = 2, p = 1) => {
    return connection.select("*")
        .from("topics")
        .limit(limit)
        .offset((p - 1) * limit)
        .then(topics => {
            return Promise.all([topics, countTopics()])
        })
}