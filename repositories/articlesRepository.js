class ArticlesRepository {
    static all(callback) {
        db.all(`SELECT articles.*,
                       users.first_name || ' ' || users.last_name AS author_name,
                       COUNT(likes.id)                            AS likes_count
                FROM articles
                         LEFT JOIN users ON articles.author_id = users.id
                         LEFT JOIN likes ON articles.id = likes.article_id
                GROUP BY articles.id`, (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }

    static get(id, callback) {
        db.get(`SELECT articles.*,
                       users.first_name || ' ' || users.last_name AS author_name,
                       COUNT(likes.id)                            AS likes_count
                FROM articles
                         LEFT JOIN users ON articles.author_id = users.id
                         LEFT JOIN likes ON articles.id = likes.article_id
                WHERE articles.id = ?
                GROUP BY articles.id`, id, (err, row) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, row);
            }
        });
    }

    static insert(article, callback) {
        const {title, subtitle, content, author_id} = article;
        const current_date = new Date().toISOString().slice(0, 10);

        db.run('INSERT INTO articles (title, subtitle, content, author_id, modified_at) VALUES (?, ?, ?, ?, ?)', [title, subtitle, content, author_id, current_date], function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null, this.lastID);
            }
        });
    }

    static update(article, callback) {
        const {id, title, subtitle, content, modified_at} = article;

        db.run('UPDATE articles SET title = ?, subtitle = ?, content = ?, modified_at = ? WHERE id = ?', [title, subtitle, content, modified_at, id], function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    }

    static delete(id, callback) {
        db.run('DELETE FROM articles WHERE id = ?', id, function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    }

    static publish_article(id, callback) {
        db.run('UPDATE articles SET published_at = date() WHERE id = ?', id, (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null);
            }
        })
    }

}

module.exports = ArticlesRepository;
