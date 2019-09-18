const express = require("express");
const app = express();
const apiRouter = require("./routers/api");
const { badRequestErrorHandler, internalServerErrorHandler, notFoundErrorHandler } = require("./errorHandlers")

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
    res.status(404).send({ msg: "Route Not Found" })
})

app.use(notFoundErrorHandler);
app.use(badRequestErrorHandler);
app.use(internalServerErrorHandler)

module.exports = app;