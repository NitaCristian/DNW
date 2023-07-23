/**
 * Middleware to check if a user is logged in.
 * If the user is logged in (valid user session with an id),
 * the request is allowed to continue to the next middleware or route handler.
 * If the user is not logged in, they will be redirected to the login page.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 */
const requireLogin = (req, res, next) => {
    // Check if there is a valid user session with an 'id'
    if (req.session.user && req.session.user.id) {
        // User is logged in, continue to the next middleware or route handler
        next();
    } else {
        // User is not logged in, redirect to the login page
        res.redirect('/user/login');
    }
};

module.exports = requireLogin;
