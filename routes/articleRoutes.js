const express = require("express");
const router = express.Router();
const articleController = require('../controllers/articleController')

router.get('/dashboard', articleController.authorIndex)

router.get("/create", articleController.create);

router.get('/:id/publish', articleController.publish)

router.get("/:id/edit", articleController.edit);

router.post("/:id/update", articleController.update);

router.post("/:id/delete", articleController.destroy);

router.get("/:id", articleController.show);

router.post("/", articleController.store);

router.get("/", articleController.userIndex);

module.exports = router;
