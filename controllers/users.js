const { selectUser } = require("../models/users")

exports.getUser = (req, res, next) => {
    const { username } = req.params;
    selectUser(username).then(([user]) => {
        res.status(200).send({ user })
    }).catch(next)
}