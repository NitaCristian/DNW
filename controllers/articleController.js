const articleRepository = require('../repositories/articlesRepository')

class ArticleController {
    static index(req, res, next) {
        articleRepository.all((err, rows) => {
            if (err) {
                next(err)
            } else {
                res.render('articles', {articles: rows})
            }
        });
    }

    static create(req, res, next) {
        let user_id = -1;
        if (req.session !== undefined && req.session.user !== undefined) user_id = req.session.user.id;

        if (user_id < 0) {
            res.redirect('/users/login');
            return;
        }

        const article = {title: "", subtitle: "", content: "", author_id: user_id}
        articleRepository.insert(article, (err, lastId) => {
            if (err) {
                next(err)
            } else {
                res.redirect(`${lastId}/edit`);
            }
        })
    }

    static store(req, res, next) {
        // Not needed?
    }

    static show(req, res, next) {
        // Not needed?
    }

    static edit(req, res, next) {
        const id = req.params.id;
        if (id < 0) {
            res.redirect('/users/login');
            return;
        }

        articleRepository.get(id, (err, row) => {
            if (err) {
                next(err)
            } else {
                res.render('edit', {article: row})
            }
        })
    }

    static update(req, res, next) {
        const id = req.params.id;
        const article = {
            id: id,
            title: req.body.title,
            subtitle: req.body.subtitle,
            content: req.body.content,
            modified_at: '2023-07-10' // TODO: Add current date
        }
        articleRepository.update(article, (err, row) => {
            if (err) {
                next(err)
            } else {
                res.redirect('/articles/')
            }
        })
    }

    static destroy(req, res, next) {
        const id = req.params.id;
        articleRepository.delete(id, (err) => {
            if (err) {
                next(err)
            } else {
                res.redirect('/articles/')
            }
        })
    }

    static publish(req, res, next) {
        const id = req.params.id;
        // TODO: Publish article, update publish_date, redirect to author index

    }
}

module.exports = ArticleController;
