const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const requireLogin = require('../middleware/authMiddleware')

router.get('/login', userController.login);

router.post('/login', userController.authenticate)

router.get('/register', userController.create);

router.post('/register', userController.store)

router.get('/edit', requireLogin, userController.edit)

router.post('/update', requireLogin, userController.update)

module.exports = router;
