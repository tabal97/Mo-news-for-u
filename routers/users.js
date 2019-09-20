const usersRouter = require("express").Router();
const { getUser } = require("../controllers/users");
const { invalidMethodErrorHandler } = require("../errorHandlers")

usersRouter.route("/:username")
    .get(getUser)
    .all(invalidMethodErrorHandler)

module.exports = usersRouter;