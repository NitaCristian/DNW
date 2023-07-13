const blogSettingsRepository = require('../repositories/blogSettingsRepository')

class HomeController {
    static index(req, res) {
        res.render('home/index')
    }

    static async edit(req, res, next) {
        try {
            res.render('home/edit')
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        const settings = {title: req.body.title, description: req.body.description}

        try {
            await blogSettingsRepository.update(settings);
            global.title = settings.title
            global.description = settings.description
            res.redirect('/');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = HomeController;
