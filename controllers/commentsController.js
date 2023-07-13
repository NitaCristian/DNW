const commentsRepository = require('../repositories/commentsRepository')

class CommentsController {
    static async delete(req, res, next) {
        const comment_id = req.params.id
        try {
            await commentsRepository.delete(comment_id)
            res.redirect('back')
        } catch (err) {
            next(err)
        }
    }

    static async edit(req, res, next) {
        const comment = {id: req.params.id, message: req.body.message}
        try {
            await commentsRepository.update(comment)
            res.redirect('back')
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CommentsController