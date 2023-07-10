const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/login', userController.login);

router.post('/login', userController.authenticate)

router.get('/register', userController.create);

router.post('/register', userController.store)

router.get('/edit', userController.edit)

router.post('/:id/update', userController.update)

module.exports = router;
