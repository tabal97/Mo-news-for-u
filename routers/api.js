const apiRouter = require("express").Router();
const { getApi } = require("../controllers/api");
const topicsRouter = require("../routers/topics");
const usersRouter = require("../routers/users");
const articlesRouter = require("./articles")

apiRouter.get("/", getApi);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);


module.exports = apiRouter;