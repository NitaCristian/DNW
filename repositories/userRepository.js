class UserRepository {
    /**
     * Get all users from the database.
     * @returns {Promise<Array>} A Promise that resolves to an array of all users.
     */
    static all() {
        return new Promise((resolve, reject) => {
            // Database query to get all users
            db.all('SELECT * FROM users', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Get a user by their ID from the database.
     * @param {number} id - The ID of the user to be fetched.
     * @returns {Promise<Object|null>} A Promise that resolves to the user object if found, or null if not found.
     */
    static getById(id) {
        return new Promise((resolve, reject) => {
            // Database query to get a user by their ID
            db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    /**
     * Get a user by their email and password from the database.
     * @param {Object} user - An object containing the email and password of the user to be fetched.
     * @returns {Promise<Object|null>} A Promise that resolves to the user object if found, or null if not found.
     */
    static getByEmailPassword(user) {
        const {email, password} = user;

        return new Promise((resolve, reject) => {
            // Database query to get a user by their email and password
            db.get('SELECT * FROM users WHERE email = ? and password = ?', [email, password], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    /**
     * Insert a new user into the database.
     * @param {Object} user - The user object to be inserted.
     * @returns {Promise<number>} A Promise that resolves to the ID of the inserted user.
     */
    static insert(user) {
        const {first_name, last_name, email, password} = user;

        return new Promise((resolve, reject) => {
            // Database query to insert a new user
            db.run('INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', [first_name, last_name, email, password], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    /**
     * Update an existing user in the database.
     * @param {Object} user - The user object with updated data.
     * @returns {Promise<void>} A Promise that resolves when the update is successful.
     */
    static update(user) {
        const {id, first_name, last_name, email, password} = user;

        return new Promise((resolve, reject) => {
            // Database query to update a user
            db.run('UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?', [first_name, last_name, email, password, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Delete a user from the database by their ID.
     * @param {number} id - The ID of the user to be deleted.
     * @returns {Promise<void>} A Promise that resolves when the delete operation is successful.
     */
    static delete(id) {
        return new Promise((resolve, reject) => {
            // Database query to delete a user by their ID
            db.run('DELETE FROM users WHERE id = ?', id, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = UserRepository;
