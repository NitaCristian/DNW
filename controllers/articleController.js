const articleRepository = require('../repositories/articlesRepository');

class ArticleController {
    static async userIndex(req, res, next) {
        try {
            const rows = await articleRepository.allPublished();
            res.render('user/articles', {articles: rows, title: global.title});
        } catch (err) {
            next(err);
        }
    }

    static async authorIndex(req, res, next) {
        const userId = req.session.user.id;

        try {
            const draft_articles = await articleRepository.allDraftsByAuthor(userId);
            const published_articles = await articleRepository.allPublishedByAuthor(userId);
            res.render('author/articles', {
                published_articles: published_articles, draft_articles: draft_articles
            });
        } catch (err) {
            next(err);
        }
    }

    static create(req, res, next) {
        res.render('author/create');
    }

    static async store(req, res, next) {
        const article = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            content: req.body.content,
            author_id: req.session.user.id
        };

        try {
            await articleRepository.insert(article);
            res.redirect(`/articles/dashboard`);
        } catch (err) {
            next(err);
        }
    }

    static async show(req, res, next) {
        const id = req.params.id;

        try {
            const row = await articleRepository.get(id);
            res.render('user/article', {article: row});
        } catch (err) {
            next(err);
        }
    }

    static async edit(req, res, next) {
        const article_id = req.params.id;

        try {
            const row = await articleRepository.get(article_id);
            res.render('author/edit', {article: row});
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        const article = {
            id: req.params.id, title: req.body.title, subtitle: req.body.subtitle, content: req.body.content,
        };

        try {
            await articleRepository.update(article);
            res.redirect('/articles/dashboard');
        } catch (err) {
            next(err);
        }
    }

    static async destroy(req, res, next) {
        try {
            await articleRepository.delete(req.params.id);
            res.redirect('/articles/');
        } catch (err) {
            next(err);
        }
    }

    static async publish(req, res, next) {
        try {
            await articleRepository.publish_article(req.params.id);
            res.redirect('/articles');
        } catch (err) {
            next(err);
        }
    }

    static async like(req, res, next) {
        const id = req.params.id;

        try {
            await articleRepository.add_like(id);
            res.redirect(`/articles/${id}`);
        } catch (err) {
            next(err);
        }
    }

    static async dislike(req, res, next) {
        const id = req.params.id;

        try {
            await articleRepository.add_dislike(id);
            res.redirect(`/articles/${id}`);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ArticleController;
