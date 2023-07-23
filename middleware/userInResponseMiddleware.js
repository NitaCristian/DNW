/**
 * Middleware to add the current user information (if available) to the response's local variables.
 * It sets the 'user' property in 'res.locals' to the value of 'req.session.user' if an active user session exists.
 * If there is no active user session, it sets 'res.locals.user' to null.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 */
const userInResponse = (req, res, next) => {
    // Check if there is an active user session (req.session exists)
    if (req.session) {
        // If there is an active user session, set 'res.locals.user' to the value of 'req.session.user'
        res.locals.user = req.session.user;
    } else {
        // If there is no active user session, set 'res.locals.user' to null
        res.locals.user = null;
    }

    // Continue to the next middleware or route handler
    next();
};

module.exports = userInResponse;
