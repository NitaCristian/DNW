const blogSettingsRepository = require('../repositories/blogSettingsRepository')

class HomeController {
    static index(req, res) {
        res.render('home/index', {title: global.title})
    }

    static edit(req, res, next) {
        res.render('home/edit', {title: global.title, description: global.description})
    }

    static update(req, res, next) {
        const settings = {title: req.body.title, description: req.body.description}

        blogSettingsRepository.update(settings, (err) => {
            if (err) {
                next(err)
            } else {
                global.title = settings.title
                global.description = settings.description
                res.redirect('/')
            }
        })
    }
}

module.exports = HomeController;
