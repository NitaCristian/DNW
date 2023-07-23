const commentsRepository = require('./commentsRepository')

class ArticlesRepository {
    /**
     * Get all published articles with the corresponding author's name.
     * @returns {Promise<Array>} A Promise that resolves to an array of published articles.
     */
    static allPublished() {
        return new Promise((resolve, reject) => {
            // Database query to get all published articles with author names
            db.all(`SELECT articles.*,
                           users.first_name || ' ' || users.last_name AS author_name
                    FROM articles
                             LEFT JOIN users ON articles.author_id = users.id
                    WHERE articles.published_at IS NOT NULL
                    ORDER BY articles.published_at DESC`, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Get all published articles by a specific author with the corresponding author's name.
     * @param {number} authorId - The ID of the author whose published articles are to be fetched.
     * @returns {Promise<Array>} A Promise that resolves to an array of published articles by the specified author.
     */
    static allPublishedByAuthor(authorId) {
        return new Promise((resolve, reject) => {
            // Database query to get all published articles by the specified author with author names
            db.all(`SELECT articles.*,
                           users.first_name || ' ' || users.last_name AS author_name
                    FROM articles
                             INNER JOIN users ON users.id = articles.author_id
                    WHERE articles.author_id = ?
                      AND articles.published_at IS NOT NULL
                    ORDER BY articles.published_at DESC`, [authorId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Get all draft articles by a specific author with the corresponding author's name.
     * @param {number} authorId - The ID of the author whose draft articles are to be fetched.
     * @returns {Promise<Array>} A Promise that resolves to an array of draft articles by the specified author.
     */
    static allDraftsByAuthor(authorId) {
        return new Promise((resolve, reject) => {
            // Database query to get all draft articles by the specified author with author names
            db.all(`SELECT articles.*,
                           users.first_name || ' ' || users.last_name AS author_name
                    FROM articles
                             INNER JOIN users ON users.id = articles.author_id
                    WHERE articles.author_id = ?
                      AND articles.published_at IS NULL
                    ORDER BY articles.created_at DESC`, [authorId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Get an article by its ID with the corresponding author's name.
     * @param {number} id - The ID of the article to retrieve.
     * @returns {Promise<Object|null>} A Promise that resolves to the article object or null if not found.
     */
    static get(id) {
        return new Promise((resolve, reject) => {
            // Database query to get the article by its ID with author name
            db.get(`SELECT articles.*,
                           users.first_name || ' ' || users.last_name AS author_name
                    FROM articles
                             LEFT JOIN users ON articles.author_id = users.id
                    WHERE articles.id = ?`, id, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    /**
     * Insert a new article into the database.
     * @param {Object} article - The article object to be inserted.
     * @returns {Promise<number>} A Promise that resolves to the ID of the inserted article.
     */
    static insert(article) {
        const {title, subtitle, content, author_id} = article;
        const current_date = new Date().toISOString().slice(0, 10);

        return new Promise((resolve, reject) => {
            // Database query to insert a new article
            db.run('INSERT INTO articles (title, subtitle, content, author_id, modified_at) VALUES (?, ?, ?, ?, ?)', [title, subtitle, content, author_id, current_date], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    /**
     * Update an existing article in the database.
     * @param {Object} article - The article object with updated values.
     * @returns {Promise<void>} A Promise that resolves when the update is successful.
     */
    static update(article) {
        const {id, title, subtitle, content} = article;

        return new Promise((resolve, reject) => {
            // Database query to update an article
            db.run('UPDATE articles SET title = ?, subtitle = ?, content = ?, modified_at = datetime(\'now\') WHERE id = ?', [title, subtitle, content, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Delete an article from the database by its ID.
     * @param {number} article_id - The ID of the article to be deleted.
     * @returns {Promise<void>} A Promise that resolves when the article is deleted successfully.
     */
    static delete(article_id) {
        return new Promise(async (resolve, reject) => {
            try {
                await commentsRepository.deleteByArticleId(article_id);

                // Database query to delete an article by its ID
                db.run(`DELETE
                        FROM articles
                        WHERE id = ?`, article_id, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Publish an article by setting its 'published_at' timestamp to the current date and time.
     * @param {number} article_id - The ID of the article to be published.
     * @returns {Promise<void>} A Promise that resolves when the article is published successfully.
     */
    static publish_article(article_id) {
        return new Promise((resolve, reject) => {
            // Database query to publish an article by updating its 'published_at' timestamp
            db.run('UPDATE articles SET published_at = datetime(\'now\') WHERE id = ?', article_id, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Increment the 'likes' count of an article by 1.
     * @param {number} article_id - The ID of the article to which a like will be added.
     * @returns {Promise<void>} A Promise that resolves when the 'likes' count is incremented successfully.
     */
    static add_like(article_id) {
        return new Promise((resolve, reject) => {
            // Database query to increment the 'likes' count of an article
            db.run('UPDATE articles SET likes = likes + 1 WHERE id = ?', article_id, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Increment the 'dislikes' count of an article by 1.
     * @param {number} article_id - The ID of the article to which a dislike will be added.
     * @returns {Promise<void>} A Promise that resolves when the 'dislikes' count is incremented successfully.
     */
    static add_dislike(article_id) {
        return new Promise((resolve, reject) => {
            // Database query to increment the 'dislikes' count of an article
            db.run('UPDATE articles SET dislikes = dislikes + 1 WHERE id = ?', article_id, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = ArticlesRepository;
