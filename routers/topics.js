const topicsRouter = require("express").Router();
const { getAllTopics } = require("../controllers/topics");
const { invalidMethodErrorHandler } = require("../errorHandlers")

topicsRouter.route("/")
    .get(getAllTopics)
    .all(invalidMethodErrorHandler)

module.exports = topicsRouter;
