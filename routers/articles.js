const articlesRouter = require("express").Router();
const { getArticle, patchArticle, getAllArticles } = require("../controllers/articles");
const { postComment, getCommentsById } = require("../controllers/comments")

articlesRouter.route("/:articleId")
    .get(getArticle)
    .patch(patchArticle)

articlesRouter.route("/:articleId/comments")
    .get(getCommentsById)
    .post(postComment)

articlesRouter.route("/")
    .get(getAllArticles)

module.exports = articlesRouter;