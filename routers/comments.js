const commentsRouter = require("express").Router();
const { patchComment, deleteComment } = require("../controllers/comments");
const { invalidMethodErrorHandler } = require("../errorHandlers")

commentsRouter.route("/:comment_id")
    .patch(patchComment)
    .delete(deleteComment)
    .all(invalidMethodErrorHandler)

module.exports = commentsRouter;