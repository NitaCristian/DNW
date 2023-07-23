const express = require("express");
const router = express.Router();
const commentsController = require('../controllers/commentsController')
const requireLogin = require('../middleware/authMiddleware')

// Route to handle the form submission for deleting a comment
router.post("/:id/delete", requireLogin, commentsController.delete);

// Route to handle the form submission for editing a comment
router.post("/:id/edit", requireLogin, commentsController.edit);

module.exports = router;
