const express = require("express");
const app = express();
const apiRouter = require("./routers/api");

app.use(express.json());

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    } else res.status(500).send("you done messed up");
})

module.exports = app;