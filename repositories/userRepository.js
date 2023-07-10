class UserRepository {
    static all(callback) {
        db.all('SELECT * FROM users', (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }

    static getById(id, callback) {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, row);
            }
        });
    }

    static getByEmailPassword(user, callback) {
        const {email, password} = user;

        db.get('SELECT * FROM users WHERE email = ? and password = ?', [email, password], (err, row) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, row);
            }
        });
    }

    static insert(user, callback) {
        const {first_name, last_name, email, password} = user;

        db.run('INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', [first_name, last_name, email, password], function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null, this.lastID);
            }
        });
    }

    static update(user, callback) {
        const {id, first_name, last_name, email, password} = user;

        db.run('UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?', [first_name, last_name, email, password, id], function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    }

    static delete(id, callback) {
        db.run('DELETE FROM users WHERE id = ?', id, function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    }

}

module.exports = UserRepository;

/*static async all() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM testUsers', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }*/