const connection = require("../db/connection");
const { countUsers } = require("../utils");

exports.selectUser = username => {
    return connection.select('*')
        .from('users')
        .where({ username }).then(user => {
            if (user.length) { return user }
            else { return Promise.reject({ status: 404, msg: "User does not exist" }) }
        })
        .then(user => {
            return Promise.all([user, countUsers()])
        })
}