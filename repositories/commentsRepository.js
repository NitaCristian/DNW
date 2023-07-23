class CommentsRepository {
    /**
     * Get all comments for a specific article from the database.
     * @param {number} article_id - The ID of the article for which comments are to be fetched.
     * @returns {Promise<Array>} A Promise that resolves to an array of comments for the specified article.
     */
    static async allByArticle(article_id) {
        return new Promise((resolve, reject) => {
            // Database query to get all comments for the specified article with the author's name
            db.all(`SELECT comments.*,
                           users.first_name || ' ' || users.last_name AS author_name
                    FROM comments
                             LEFT JOIN users ON users.id = comments.user_id
                    WHERE article_id = ?
                    ORDER BY created_at`, article_id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Insert a new comment into the database.
     * @param {Object} comment - The comment object to be inserted.
     * @returns {Promise<number>} A Promise that resolves to the ID of the inserted comment.
     */
    static async insert(comment) {
        const {article_id, user_id, message} = comment;
        return new Promise((resolve, reject) => {
            // Database query to insert a new comment
            db.run('INSERT INTO comments (article_id, user_id, message) VALUES (?, ?, ?)', [article_id, user_id, message], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    /**
     * Update an existing comment in the database.
     * @param {Object} comment - The comment object with updated message.
     * @returns {Promise<number>} A Promise that resolves to the number of rows affected by the update.
     */
    static async update(comment) {
        const {id, message} = comment;
        return new Promise((resolve, reject) => {
            // Database query to update a comment
            db.run('UPDATE comments SET message = ? WHERE id = ?', [message, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    /**
     * Delete a comment from the database by its ID.
     * @param {number} id - The ID of the comment to be deleted.
     * @returns {Promise<number>} A Promise that resolves to the number of rows affected by the delete operation.
     */
    static async delete(id) {
        return new Promise((resolve, reject) => {
            // Database query to delete a comment by its ID
            db.run('DELETE FROM comments WHERE id = ?', id, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    /**
     * Delete comments from the database by the ID of the article they belong to.
     * @param {number} article_id - The ID of the article the comments belong to.
     * @returns {Promise<number>} A Promise that resolves to the number of rows affected by the delete operation.
     */
    static async deleteByArticleId(article_id) {
        return new Promise((resolve, reject) =>{
            db.run('DELETE FROM comments WHERE article_id = ?', article_id, function(err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this.changes)
                }
            })
        })
    }
}

module.exports = CommentsRepository;
