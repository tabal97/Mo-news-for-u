const articlesRouter = require("express").Router();
const { getArticle, patchArticle, getAllArticles } = require("../controllers/articles");
const { postComment, getCommentsById } = require("../controllers/comments");
const { invalidMethodErrorHandler } = require("../errorHandlers")

articlesRouter.route("/:articleId")
    .get(getArticle)
    .patch(patchArticle)
    .all(invalidMethodErrorHandler)

articlesRouter.route("/:articleId/comments")
    .get(getCommentsById)
    .post(postComment)
    .all(invalidMethodErrorHandler)

articlesRouter.route("/")
    .get(getAllArticles)
    .all(invalidMethodErrorHandler)

module.exports = articlesRouter;