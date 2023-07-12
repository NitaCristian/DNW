const requireLogin = (req, res, next) => {
    if (req.session.user && req.session.user.id) {
        next();
    } else {
        res.redirect('/users/login');
    }
};

module.exports = requireLogin;
