const apiRouter = require("express").Router();
const { getApi } = require("../controllers/api");
const topicsRouter = require("./topics");
const usersRouter = require("./users");
const articlesRouter = require("./articles");
const commentsRouter = require("./comments");
const { invalidMethodErrorHandler } = require("../errorHandlers")

apiRouter.route("/")
    .get(getApi)
    .all(invalidMethodErrorHandler)

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter)


module.exports = apiRouter;