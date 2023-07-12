class ArticlesRepository {
    static allPublished(callback) {
        db.all(`SELECT articles.*,
                       users.first_name || ' ' || users.last_name AS author_name
                FROM articles
                         LEFT JOIN users ON articles.author_id = users.id
                where articles.published_at is not null
                order BY articles.published_at desc`, (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }

    static allPublishedByAuthor(authorId, callback) {
        db.all(`SELECT articles.*,
                       users.first_name || ' ' || users.last_name AS author_name
                FROM articles
                         inner join users ON articles.author_id = ?
                where articles.published_at is not null
                order BY articles.published_at desc`, [authorId], (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }

    static allDraftsByAuthor(authorId, callback) {
        db.all(`SELECT articles.*,
                       users.first_name || ' ' || users.last_name AS author_name
                FROM articles
                         inner join users ON articles.author_id = ?
                where articles.published_at is null
                order BY articles.created_at desc`, [authorId], (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }

    static get(id, callback) {
        db.get(`SELECT articles.*,
                       users.first_name || ' ' || users.last_name AS author_name
                FROM articles
                         LEFT JOIN users ON articles.author_id = users.id
                WHERE articles.id = ?`, id, (err, row) => {
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
            if (err) callback(err); else callback(null)
        });
    }

    static delete(article_id, callback) {
        db.run('DELETE FROM articles WHERE id = ?', article_id, function (err) {
            if (err) callback(err); else callback(null)
        });
    }

    static publish_article(article_id, callback) {
        db.run('UPDATE articles SET published_at = date() WHERE id = ?', article_id, (err) => {
            if (err) callback(err); else callback(null)
        })
    }

    static add_like(article_id, callback) {
        db.run('UPDATE articles set like = like + 1 where id = ?', article_id, (err) => {
            if (err) callback(err); else callback(null)
        })
    }

    static remove_like(article_id, callback) {
        db.run('UPDATE articles set like = like - 1 where id = ?', article_id, (err) => {
            if (err) callback(err); else callback(null)
        })
    }
}

module.exports = ArticlesRepository;
