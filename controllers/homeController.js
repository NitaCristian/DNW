// Import the blog settings repository
const blogSettingsRepository = require('../repositories/blogSettingsRepository');

/**
 * Controller class for managing the home page and blog settings.
 */
class HomeController {
    /**
     * Render the home page.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    static index(req, res) {
        res.render('home/index');
    }

    /**
     * Render the blog settings edit page.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    static async edit(req, res, next) {
        try {
            res.render('home/edit');
        } catch (err) {
            next(err);
        }
    }

    /**
     * Update the blog settings in the database.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    static async update(req, res, next) {
        const settings = {
            title: req.body.title, subtitle: req.body.subtitle, description: req.body.description,
        };

        try {
            await blogSettingsRepository.update(settings);
            global.title = settings.title;
            global.subtitle = settings.subtitle;
            global.description = settings.description;
            res.redirect('/');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = HomeController;
