const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController")
const requireLogin = require('../middleware/authMiddleware')

router.get("/", homeController.index);

router.get('/edit', requireLogin, homeController.edit)

router.post('/update', requireLogin, homeController.update)

module.exports = router;
