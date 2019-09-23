exports.notFoundErrorHandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    } else next(err)
};


exports.badRequestErrorHandler = (err, req, res, next) => {
    const errorCode = ["22P02", "42703"];
    if (errorCode.includes(err.code)) {
        res.status(400).send({ msg: "Bad Request" });
    } else next(err);
};

exports.internalServerErrorHandler = (err, req, res, next) => {
    res.status(500).send({ msg: "Internal Server Error" });
};

exports.invalidMethodErrorHandler = (req, res) => {
    res.status(405).send({ msg: "Invalid Method" })
}

