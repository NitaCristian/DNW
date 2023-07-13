class ArticlesRepository {
    static allPublished() {
        return new Promise((resolve, reject) => {
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

    static allPublishedByAuthor(authorId) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT articles.*,
                           users.first_name || ' ' || users.last_name AS author_name
                    FROM articles
                             INNER JOIN users ON articles.author_id = ?
                    WHERE articles.published_at IS NOT NULL
                    ORDER BY articles.published_at DESC`, [authorId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static allDraftsByAuthor(authorId) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT articles.*,
                           users.first_name || ' ' || users.last_name AS author_name
                    FROM articles
                             INNER JOIN users ON articles.author_id = ?
                    WHERE articles.published_at IS NULL
                    ORDER BY articles.created_at DESC`, [authorId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static get(id) {
        return new Promise((resolve, reject) => {
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

    static insert(article) {
        const {title, subtitle, content, author_id} = article;
        const current_date = new Date().toISOString().slice(0, 10);

        return new Promise((resolve, reject) => {
            db.run('INSERT INTO articles (title, subtitle, content, author_id, modified_at) VALUES (?, ?, ?, ?, ?)', [title, subtitle, content, author_id, current_date], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    static update(article) {
        const {id, title, subtitle, content} = article;

        return new Promise((resolve, reject) => {
            db.run('UPDATE articles SET title = ?, subtitle = ?, content = ?, modified_at = datetime(\'now\') WHERE id = ?', [title, subtitle, content, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static delete(article_id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM articles WHERE id = ?', article_id, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static publish_article(article_id) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE articles SET published_at = datetime(\'now\') WHERE id = ?', article_id, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static add_like(article_id) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE articles SET likes = likes + 1 WHERE id = ?', article_id, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static add_dislike(article_id) {
        return new Promise((resolve, reject) => {
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
