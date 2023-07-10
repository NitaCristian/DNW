class CommentsRepository {
    static allByArticle(article_id, callback) {
        db.all('SELECT * FROM comments where article_id = ?', article_id, (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }

    static insert(comment, callback) {
        const {article_id, user_id, message, created_at} = comment;

        db.run('INSERT INTO comments (article_id, user_id, message, created_at) VALUES (?, ?, ?, ?)', [article_id, user_id, message, created_at], function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null, this.lastID);
            }
        });
    }

    static update(comment, callback) {
        const {id, message} = comment;

        db.run('UPDATE comments SET message = ? WHERE id = ?', [message, id], function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null, this.changes);
            }
        });
    }

    static delete(id, callback) {
        db.run('DELETE FROM comments WHERE id = ?', id, function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null, this.changes);
            }
        });
    }
}

module.exports = CommentsRepository;
