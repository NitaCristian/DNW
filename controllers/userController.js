const userRepository = require('../repositories/userRepository');

/**
 * Controller class for managing user-related operations.
 */
class UserController {
    /**
     * Render the user registration page.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    static create(req, res) {
        res.render('user/register');
    }

    /**
     * Store a new user in the database.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    static async store(req, res, next) {
        try {
            await userRepository.insert(req.body);
            res.redirect('/user/login');
        } catch (err) {
            next(err);
        }
    }

    /**
     * Render the user login page.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    static login(req, res) {
        res.render('user/login');
    }

    /**
     * Authenticate a user based on their email and password.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    static async authenticate(req, res, next) {
        try {
            const row = await userRepository.getByEmailPassword(req.body);
            if (row) {
                req.session.user = {
                    id: row.id, name: `${row.first_name} ${row.last_name}`,
                };
                res.redirect('/articles');
            } else {
                res.redirect('/user/login');
            }
        } catch (err) {
            next(err);
        }
    }

    /**
     * Render the user edit page.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    static async edit(req, res, next) {
        const user_id = req.session.user.id;

        try {
            const row = await userRepository.getById(user_id);
            if (row !== undefined) {
                row.name = `${row.first_name} ${row.last_name}`
                res.render('user/edit', {user: row});
            } else {
                res.redirect('/user/login');
            }
        } catch (err) {
            next(err);
        }
    }

    /**
     * Update a user's information in the database.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    static async update(req, res, next) {
        const user = {
            id: req.session.user.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.new_password,
        };

        try {
            await userRepository.update(user);
            req.session.user = {
                id: user.id, name: `${user.first_name} ${user.last_name}`,
            };
            res.redirect('/');
        } catch (err) {
            next(err);
        }
    }

    /**
     * Logout the user and destroy the session.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
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
