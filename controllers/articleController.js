// Import the article and comments repositories
const articleRepository = require('../repositories/articlesRepository');
const commentsRepository = require('../repositories/commentsRepository');

/**
 * Controller class for managing articles and comments.
 */
class ArticleController {
    /**
     * Get all published articles for the user.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    static async userIndex(req, res, next) {
        try {
            const rows = await articleRepository.allPublished();
            res.render('user/articles', { articles: rows, title: global.title });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Get all draft and published articles for the author.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    static async authorIndex(req, res, next) {
        const userId = req.session.user.id;

        try {
            const draft_articles = await articleRepository.allDraftsByAuthor(userId);
            const published_articles = await articleRepository.allPublishedByAuthor(userId);
            res.render('author/articles', {
                published_articles: published_articles,
                draft_articles: draft_articles,
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Render the article creation page for the author.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    static create(req, res) {
        res.render('author/create');
    }

    /**
     * Store a new article in the database.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    static async store(req, res, next) {
        const article = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            content: req.body.content,
            author_id: req.session.user.id,
        };

        try {
            await articleRepository.insert(article);
            res.redirect(`/articles/dashboard`);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Show a single article and its comments.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    static async show(req, res, next) {
        const article_id = req.params.id;

        try {
            const article = await articleRepository.get(article_id);
            const comments = await commentsRepository.allByArticle(article_id);
            res.render('user/article', { article: article, comments: comments });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Add a new comment to an article.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    static async comment(req, res, next) {
        const comment = {
            user_id: req.session.user.id,
            article_id: req.params.id,
            message: req.body.message,
        };
        try {
            await commentsRepository.insert(comment);
            res.redirect(`/articles/${req.params.id}/`);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Render the article editing page for the author.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    static async edit(req, res, next) {
        const article_id = req.params.id;

        try {
            const row = await articleRepository.get(article_id);
            res.render('author/edit', { article: row });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Update an existing article in the database.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    static async update(req, res, next) {
        const article = {
            id: req.params.id,
            title: req.body.title,
            subtitle: req.body.subtitle,
            content: req.body.content,
        };

        try {
            await articleRepository.update(article);
            res.redirect('/articles/dashboard');
        } catch (err) {
            next(err);
        }
    }

    /**
     * Delete an article from the database.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    static async destroy(req, res, next) {
        try {
            await articleRepository.delete(req.params.id);
            res.redirect('/articles/dashboard');
        } catch (err) {
            next(err);
        }
    }

    /**
     * Publish an article by updating its status in the database.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    static async publish(req, res, next) {
        try {
            await articleRepository.publish_article(req.params.id);
            res.redirect('/articles/dashboard');
        } catch (err) {
            next(err);
        }
    }

    /**
     * Add a like to an article.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    static async like(req, res, next) {
        const id = req.params.id;

        try {
            await articleRepository.add_like(id);
            res.redirect(`/articles/${id}`);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Add a dislike to an article.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
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
