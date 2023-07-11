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
                res.redirect('/users/login', {title: 'MicroVerse'})
            }
        })
    }

    static login(req, res) {
        res.render("user/login", {title: 'MicroVerse'});
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
                if (row !== undefined) {
                    res.render('user/settings', {user: row, title: 'MicroVerse'});
                } else res.redirect('/users/login')
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
