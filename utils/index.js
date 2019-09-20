exports.checkAuthorExists = (username, connection) => {
    console.log(username)
    return connection.first('*')
        .from('users')
        .where({ username })
        .then(author => {
            if (!author) return Promise.reject({ status: 404, msg: 'Author Does not Exist' })
            return true;
        })
}

exports.checkTopicExists = (slug, connection) => {
    return connection.first('*')
        .from('topics')
        .where({ slug })
        .then(topic => {
            if (!topic) return Promise.reject({ status: 404, msg: 'Topic Does not Exist' })
            return true;
        })
}