class BlogSettingsRepository {
    static get(callback) {
        db.get(`SELECT title, description
                FROM blog_settings
                LIMIT 1`, (err, row) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, row);
            }
        });
    }

    static update(settings, callback) {
        const {title, description} = settings;

        db.run('UPDATE blog_settings SET title = ?, description = ?', [title, description], function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    }
}

module.exports = BlogSettingsRepository;
