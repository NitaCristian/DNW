const express = require("express");
const router = express.Router();
const articleController = require('../controllers/articleController')
const requireLogin = require('../middleware/authMiddleware')

// Route to display the author's dashboard
router.get('/dashboard', requireLogin, articleController.authorIndex);

// Route to display the form for creating a new article
router.get("/create", requireLogin, articleController.create);

// Route to handle the form submission for creating a new article
router.post("/create", requireLogin, articleController.store);

// Route to handle the "like" action for an article
router.post('/:id/like', requireLogin, articleController.like);

// Route to handle the "dislike" action for an article
router.post('/:id/dislike', requireLogin, articleController.dislike);

// Route to handle publishing an article
router.post('/:id/publish', requireLogin, articleController.publish);

// Route to handle commenting on an article
router.post('/:id/comment', requireLogin, articleController.comment);

// Route to display the form for editing an article
router.get("/:id/edit", requireLogin, articleController.edit);

// Route to handle the form submission for updating an article
router.post("/:id/update", requireLogin, articleController.update);

// Route to handle the form submission for deleting an article
router.post("/:id/delete", requireLogin, articleController.destroy);

// Route to display an individual article
router.get("/:id", articleController.show);

// Route to display all articles for regular users
router.get("/", articleController.userIndex);

module.exports = router;
