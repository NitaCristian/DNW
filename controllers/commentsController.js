// Import the comments repository
const commentsRepository = require('../repositories/commentsRepository');

/**
 * Controller class for managing comments.
 */
class CommentsController {
    /**
     * Delete a comment from the database.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    static async delete(req, res, next) {
        const comment_id = req.params.id;
        try {
            await commentsRepository.delete(comment_id);
            res.redirect('back');
        } catch (err) {
            next(err);
        }
    }

    /**
     * Edit a comment in the database.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Next middleware function.
     */
    static async edit(req, res, next) {
        const comment = {
            id: req.params.id,
            message: req.body.message,
        };
        try {
            await commentsRepository.update(comment);
            res.redirect('back');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = CommentsController;
