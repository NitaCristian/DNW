class BlogSettingsRepository {
    static get() {
        return new Promise((resolve, reject) => {
            db.get(`SELECT title, description
                    FROM blog_settings
                    LIMIT 1`, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static update(settings) {
        const { title, description } = settings;

        return new Promise((resolve, reject) => {
            db.run('UPDATE blog_settings SET title = ?, description = ?', [title, description], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = BlogSettingsRepository;
