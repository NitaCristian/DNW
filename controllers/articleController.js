const articleRepository = require('../repositories/articlesRepository')

class ArticleController {
    static userIndex(req, res, next) {
        articleRepository.all((err, rows) => {
            if (err) {
                next(err)
            } else {
                res.render('user/articles', {articles: rows, title: 'MicroVerse'})
            }
        });
    }

    static authorIndex(req, res, next) {
        articleRepository.all((err, rows) => {
            if (err) {
                next(err)
            } else {
                res.render('author/articles', {published_articles: rows, draft_articles: [], title: 'MicroVerse'})
            }
        });
    }

    static create(req, res, next) {
        res.render('author/create', {title: 'MicroVerse'});
    }

    static store(req, res, next) {
        let user_id = -1;
        if (req.session !== undefined && req.session.user !== undefined) user_id = req.session.user.id;

        if (user_id < 0) {
            res.redirect('/users/login');
            return;
        }

        const article = {
            title: req.body.title, subtitle: req.body.subtitle, content: req.body.content, author_id: user_id
        }
        articleRepository.insert(article, (err, lastId) => {
            if (err) {
                next(err)
            } else {
                res.redirect(`/articles/dashboard`);
            }
        })

    }

    static show(req, res, next) {
        const id = req.params.id;
        articleRepository.get(id, (err, row) => {
            if (err) {
                next(err)
            } else {
                res.render('user/article', {article: row, title: 'MicroVerse'})
            }
        })

    }

    static edit(req, res, next) {
        let user_id = -1;
        if (req.session !== undefined && req.session.user !== undefined) user_id = req.session.user.id;

        if (user_id < 0) {
            res.redirect('/users/login');
            return;
        }


        const article_id = req.params.id;
        articleRepository.get(article_id, (err, row) => {
            if (err) {
                next(err)
            } else {
                res.render('author/edit', {article: row, title: 'MicroVerse'})
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
            modified_at: new Date().toISOString().split('T')[0]
        }
        articleRepository.update(article, (err) => {
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
        articleRepository.publish_article(id, (err) => {
            if (err) {
                next(err)
            } else {
                res.redirect('/articles')
            }
        })
    }
}

module.exports = ArticleController;
