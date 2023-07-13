class CommentsRepository {
    static async allByArticle(article_id) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM comments WHERE article_id = ? order by created_at desc', article_id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async insert(comment) {
        const {article_id, user_id, message} = comment;
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO comments (article_id, user_id, message) VALUES (?, ?, ?)', [article_id, user_id, message], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    static async update(comment) {
        const {id, message} = comment;
        return new Promise((resolve, reject) => {
            db.run('UPDATE comments SET message = ? WHERE id = ?', [message, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM comments WHERE id = ?', id, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }
}

module.exports = CommentsRepository;
