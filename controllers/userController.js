const userRepository = require('../repositories/userRepository')

class UserController {
    static create(req, res) {
        res.render("user/register");
    }

    static async store(req, res, next) {
        try {
            await userRepository.insert(req.body);
            res.redirect('/user/login');
        } catch (err) {
            next(err);
        }
    }

    static login(req, res) {
        res.render("user/login");
    }

    static async authenticate(req, res, next) {
        try {
            const row = await userRepository.getByEmailPassword(req.body);
            if (row) {
                req.session.user = {
                    id: row.id, name: `${row.first_name} ${row.last_name}`
                };
                res.redirect('/articles');
            } else {
                res.redirect('/user/login');
            }
        } catch (err) {
            next(err);
        }
    }

    static async edit(req, res, next) {
        const user_id = req.session.user.id;

        try {
            const row = await userRepository.getById(user_id);
            if (row !== undefined) {
                res.render('user/edit', {user: row});
            } else {
                res.redirect('/user/login');
            }
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        const user = {
            id: req.session.user.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.new_password
        }

        try {
            await userRepository.update(user);
            res.redirect('/');
        } catch (err) {
            next(err);
        }
    }

    static async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            } else {
                res.redirect('/user/login');
            }
        });
    }
}

module.exports = UserController;
