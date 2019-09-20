exports.formatDates = articles => {
    return articles.map((article) => {
        const newArticle = { ...article }
        newArticle.created_at = (new Date(article.created_at));
        return newArticle;
    })
};

exports.makeRefObj = (list, key, value) => {
    return list.reduce((refObj, currObj) => {
        refObj[currObj[key]] = currObj[value];
        return refObj;
    }, {})
};

exports.formatComments = (comments, articleRef) => {
    return comments.map(comment => {
        const newComment = { ...comment }
        newComment.author = newComment.created_by;
        delete newComment.created_by;
        newComment.article_id = articleRef[newComment.belongs_to];
        delete newComment.belongs_to;
        return newComment;
    })
};
