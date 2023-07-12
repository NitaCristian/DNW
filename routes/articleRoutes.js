const express = require("express");
const router = express.Router();
const articleController = require('../controllers/articleController')
const requireLogin = require('../middleware/authMiddleware')

router.get('/dashboard', requireLogin, articleController.authorIndex)

router.get("/create", requireLogin, articleController.create);

router.post("/create", requireLogin, articleController.store);

router.post('/:id/like', requireLogin, articleController.like);

router.post('/:id/dislike', requireLogin, articleController.dislike);

router.post('/:id/publish', requireLogin, articleController.publish)

router.get("/:id/edit", requireLogin, articleController.edit);

router.post("/:id/update", requireLogin, articleController.update);

router.post("/:id/delete", requireLogin, articleController.destroy);

router.get("/:id", articleController.show);

router.get("/", articleController.userIndex);

module.exports = router;
