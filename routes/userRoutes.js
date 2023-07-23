const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const requireLogin = require('../middleware/authMiddleware');

// Route to display the login page
router.get('/login', userController.login);

// Route to handle the form submission for user authentication (login)
router.post('/login', userController.authenticate);

// Route to display the registration page
router.get('/register', userController.create);

// Route to handle the form submission for user registration
router.post('/register', userController.store);

// Route to display the user profile edit page
router.get('/edit', requireLogin, userController.edit);

// Route to handle the form submission for updating the user profile
router.post('/update', requireLogin, userController.update);

// Route to handle user logout
router.get('/logout', requireLogin, userController.logout);

module.exports = router;
