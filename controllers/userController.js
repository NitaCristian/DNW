const userRepository = require('../repositories/userRepository')

class UserController {
    static create(req, res) {
        res.render("user/register");
    }

    static store(req, res, next) {
        userRepository.insert(req.body, (err, lastID) => {
            if (err) {
                next(err)
            } else {
                res.redirect('/users/login', {title: global.title})
            }
        })
    }

    static login(req, res) {
        res.render("user/login", {title: global.title});
    }

    static authenticate(req, res, next) {
        userRepository.getByEmailPassword(req.body, (err, row) => {
            if (err) {
                next(err);
                return;
            }
            if (row) {
                req.session.user = {
                    id: row.id, name: `${row.first_name} ${row.last_name}`
                };

                res.redirect('/articles')
            } else {
                res.redirect('/users/login')
            }
        })
    }

    static edit(req, res, next) {
        let user_id = req.session.user.id;

        userRepository.getById(user_id, (err, row) => {
            if (err) {
                next(err)
            } else {
                if (row !== undefined) {
                    res.render('user/edit', {user: row, title: global.title});
                } else res.redirect('/users/login')
            }
        })
    }

    static update(req, res, next) {
        const user = {
            id: req.session.user.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.new_password
        }

        userRepository.update(user, (err) => {
            if (err) {
                next(err)
            } else {
                res.redirect('/users/')
            }
        })
    }
}

module.exports = UserController;
