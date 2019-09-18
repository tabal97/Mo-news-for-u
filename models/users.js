const connection = require("../db/connection");

exports.selectUser = username => {
    return connection.select('*')
        .from('users')
        .where({ username }).then(user => {
            if (user.length) { return user }
            else { return Promise.reject({ status: 404, msg: "User does not exist" }) }
        })
}