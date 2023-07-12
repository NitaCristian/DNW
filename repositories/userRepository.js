class UserRepository {
    static all() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM users', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static getByEmailPassword(user) {
        const {email, password} = user;

        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE email = ? and password = ?', [email, password], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static insert(user) {
        const {first_name, last_name, email, password} = user;

        return new Promise((resolve, reject) => {
            db.run('INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', [first_name, last_name, email, password], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    static update(user) {
        const {id, first_name, last_name, email, password} = user;

        return new Promise((resolve, reject) => {
            db.run('UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?', [first_name, last_name, email, password, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
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
