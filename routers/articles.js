const articlesRouter = require("express").Router();
const { getArticle, patchArticle } = require("../controllers/articles");
const { postComment }

articlesRouter.route("/:articleId")
    .get(getArticle)
    .patch(patchArticle)

articlesRouter.route("/:articleId/comments").post(postComment)

module.exports = articlesRouter;