const articleRepository = require('../repositories/articlesRepository')

class ArticleController {
    static userIndex(req, res, next) {
        articleRepository.allPublished((err, rows) => {
            if (err) {
                next(err)
            } else {
                res.render('user/articles', {articles: rows, title: global.title})
            }
        });
    }

    static authorIndex(req, res, next) {
        const userId = req.session.user.id;

        let draft_articles = []
        articleRepository.allDraftsByAuthor(userId, (err, rows) => {
            if (err) {
                next(err)
            } else {
                draft_articles = rows
            }
        });

        let published_articles = []
        articleRepository.allPublishedByAuthor(userId, (err, rows) => {
            if (err) {
                next(err)
            } else {
                published_articles = rows
            }
        })

        res.render('author/articles', {
            published_articles: published_articles, draft_articles: draft_articles, title: global.title
        })
    }

    static create(req, res, next) {
        res.render('author/create', {title: global.title});
    }

    static store(req, res, next) {
        const article = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            content: req.body.content,
            author_id: req.session.user.id
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
                res.render('user/article', {article: row, title: global.title})
            }
        })

    }

    static edit(req, res, next) {
        const article_id = req.params.id;
        articleRepository.get(article_id, (err, row) => {
            if (err) {
                next(err)
            } else {
                res.render('author/edit', {article: row, title: global.title})
            }
        })
    }

    static update(req, res, next) {
        const article = {
            id: req.params.id,
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
        articleRepository.delete(req.params.id, (err) => {
            if (err) {
                next(err)
            } else {
                res.redirect('/articles/')
            }
        })
    }

    static publish(req, res, next) {
        articleRepository.publish_article(req.params.id, (err) => {
            if (err) {
                next(err)
            } else {
                res.redirect('/articles')
            }
        })
    }

    static like(req, res, next) {
        const id = req.params.id
        articleRepository.add_like(id, (err) => {
            if (err) {
                next(err)
            } else {
                res.redirect(`/articles/${id}`)
            }
        })

    }

    static dislike(req, res, next) {
        const id = req.params.id;
        articleRepository.remove_like(id, (err) => {
            if (err) {
                next(err)
            } else {
                res.redirect(`/articles/${id}`)
            }
        })
    }
}

module.exports = ArticleController;
