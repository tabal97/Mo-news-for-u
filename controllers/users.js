const { selectUser } = require("../models/users")

exports.getUser = (req, res, next) => {
    const { username } = req.params;
    selectUser(username).then(([[user], total_users]) => {
        res.status(200).send({ user, total_users })
    }).catch(next)
}