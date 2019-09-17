const articlesRouter = require("express").Router();
const { getArticle, patchArticle } = require("../controllers/articles");
const { postComment, getCommentsById } = require("../controllers/comments")

articlesRouter.route("/:articleId")
    .get(getArticle)
    .patch(patchArticle)

articlesRouter.route("/:articleId/comments")
    .get(getCommentsById)
    .post(postComment)

module.exports = articlesRouter;