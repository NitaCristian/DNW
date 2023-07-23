class BlogSettingsRepository {
    /**
     * Get the blog settings (title and description) from the database.
     * @returns {Promise<Object|null>} A Promise that resolves to the blog settings object containing 'title' and 'description'.
     */
    static get() {
        return new Promise((resolve, reject) => {
            // Database query to get the blog settings (title and description)
            db.get(`SELECT title, subtitle, description
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

    /**
     * Update the blog settings (title and description) in the database.
     * @param {Object} settings - An object containing updated blog settings with 'title' and 'description'.
     * @returns {Promise<void>} A Promise that resolves when the update is successful.
     */
    static update(settings) {
        const {title, subtitle, description} = settings;

        return new Promise((resolve, reject) => {
            // Database query to update the blog settings (title and description)
            db.run('UPDATE blog_settings SET title = ?, subtitle = ?, description = ?', [title, subtitle, description], function (err) {
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
