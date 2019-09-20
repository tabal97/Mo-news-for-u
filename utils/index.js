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

exports.countTopics = (connection) => {
    return connection.select('*')
        .from('topics')
        .then(topics => {
            return topics.length;
        })
}

exports.countArticles = (connection) => {
    return connection.select('*')
        .from('articles')
        .then(articles => {
            return articles.length;
        })
}

exports.countComments = (connection) => {
    return connection.select('*')
        .from('comments')
        .then(comments => {
            return comments.length;
        })
}