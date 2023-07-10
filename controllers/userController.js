const userRepository = require('../repositories/userRepository')

class UserController {
    static index(req, res, next) {
        // TODO: Order by published_at
        res.render('user/index')
    }

    static create(req, res, next) {
        res.render("register");
    }

    static store(req, res, next) {
        userRepository.insert(req.body, (err, lastID) => {
            if (err) {
                next(err)
            } else {
                res.redirect('/users/login')
            }
        })
    }

    static login(req, res, next) {
        res.render("login");
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
        let user_id = -1;
        if (req.session !== undefined && req.session.user !== undefined) user_id = req.session.user.id;

        userRepository.getById(user_id, (err, row) => {
            if (err) {
                next(err)
            } else {
                res.render('/user/settings', {user: row})
            }
        })
    }

    static update(req, res, next) {
        let user_id = -1;
        if (req.session !== undefined && req.session.user !== undefined) user_id = req.session.user.id;

        const user = {
            id: user_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
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
