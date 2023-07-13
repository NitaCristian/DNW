const express = require("express");
const router = express.Router();
const commentsController = require('../controllers/commentsController')
const requireLogin = require('../middleware/authMiddleware')

router.post("/:id/delete", requireLogin, commentsController.delete);

router.post("/:id/edit", requireLogin, commentsController.edit);

module.exports = router;
