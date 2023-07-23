const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const requireLogin = require('../middleware/authMiddleware');

// Route to display the home page
router.get("/", homeController.index);

// Route to display the form for editing blog settings
router.get('/edit', requireLogin, homeController.edit);

// Route to handle the form submission for updating blog settings
router.post('/update', requireLogin, homeController.update);

module.exports = router;
